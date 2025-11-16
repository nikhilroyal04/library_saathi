# VPS Deployment Guide - A Record Configuration

## Overview
Yeh guide VPS par application deploy karne ke liye hai, jahan **A Record** use karna hoga wildcard subdomains ke liye (CNAME nahi chalega).

## Prerequisites
- VPS server (Ubuntu 20.04/22.04 recommended)
- Root/Sudo access
- Domain name (example.com)
- DNS management access (Hostinger/Namecheap/etc.)

---

## Step 1: DNS Configuration (A Records)

### Hostinger/Namecheap DNS Zone Editor mein:

1. **Main Domain A Record** (agar nahi hai):
   ```
   Type: A Record
   Name: @ (ya blank)
   Points to: YOUR_VPS_IP_ADDRESS
   TTL: 3600
   ```

2. **Wildcard Subdomain A Record** (Yeh sabse important hai!):
   ```
   Type: A Record
   Name: * (asterisk - wildcard)
   Points to: YOUR_VPS_IP_ADDRESS
   TTL: 3600
   ```

3. **WWW Record** (optional):
   ```
   Type: A Record
   Name: www
   Points to: YOUR_VPS_IP_ADDRESS
   TTL: 3600
   ```

**Important Notes:**
- Wildcard A record (`*`) se sabhi subdomains automatically aapke VPS par point karenge
- DNS propagation mein 5-60 minutes lag sakte hain
- Aapka VPS IP address pata karo: `curl ifconfig.me`

---

## Step 2: VPS Server Setup

### 2.1 Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 2.2 Install Node.js 18+
```bash
# Node.js 18.x install karo
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v18.x or higher
npm --version
```

### 2.3 Install Nginx
```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 2.4 Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

### 2.5 Install Certbot (SSL certificates ke liye)
```bash
sudo apt install certbot python3-certbot-nginx -y
```

---

## Step 3: Application Deployment

### 3.1 Clone Repository
```bash
# Home directory mein jao
cd ~

# Git repository clone karo
git clone https://github.com/yourusername/library_saathi.git
cd library_saathi

# Dependencies install karo
npm install
```

### 3.2 Environment Variables Setup
```bash
# .env.production file banao
nano .env.production
```

`.env.production` mein yeh add karo:
```env
# Your main domain (without http/https)
NEXT_PUBLIC_ROOT_DOMAIN=yourdomain.com

# Redis/Upstash credentials
KV_REST_API_URL=your_upstash_redis_url
KV_REST_API_TOKEN=your_upstash_redis_token

# Node environment
NODE_ENV=production

# Port (default 3000)
PORT=3000
```

**Save karo**: `Ctrl + X`, phir `Y`, phir `Enter`

### 3.3 Build Application
```bash
# Production build banao
npm run build
```

### 3.4 Start with PM2
```bash
# PM2 se start karo
pm2 start npm --name "library-saathi" -- start

# PM2 startup script add karo (server restart par auto-start)
pm2 startup
pm2 save

# Status check karo
pm2 status
pm2 logs library-saathi
```

---

## Step 4: Nginx Configuration

### 4.1 Nginx Config File Banao
```bash
sudo nano /etc/nginx/sites-available/library-saathi
```

Yeh configuration add karo (replace `yourdomain.com` with your domain):
```nginx
# HTTP Server - Redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com *.yourdomain.com;

    # Let's Encrypt verification ke liye
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    # Baaki sabko HTTPS par redirect karo
    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS Server - Main Configuration
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com *.yourdomain.com;

    # SSL Certificate paths (certbot ke baad automatically add ho jayenge)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # SSL Configuration (Security)
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Logs
    access_log /var/log/nginx/library-saathi-access.log;
    error_log /var/log/nginx/library-saathi-error.log;

    # Max upload size (images/files ke liye)
    client_max_body_size 10M;

    # Next.js app ko proxy karo
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        
        # Headers (Important for subdomain detection)
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        
        # WebSocket support (agar needed ho)
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static files caching
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }
}
```

**Save karo**: `Ctrl + X`, phir `Y`, phir `Enter`

### 4.2 Enable Site
```bash
# Symlink banao
sudo ln -s /etc/nginx/sites-available/library-saathi /etc/nginx/sites-enabled/

# Default nginx config remove karo (agar conflict ho)
sudo rm /etc/nginx/sites-enabled/default

# Nginx config test karo
sudo nginx -t

# Nginx restart karo
sudo systemctl restart nginx
```

---

## Step 5: SSL Certificate Setup (Let's Encrypt)

### 5.1 Wildcard SSL Certificate (DNS Challenge)
Wildcard SSL certificate ke liye DNS challenge use karna hoga:

```bash
# Certbot se wildcard certificate generate karo
sudo certbot certonly --manual --preferred-challenges dns \
  -d yourdomain.com \
  -d *.yourdomain.com \
  --email your-email@example.com \
  --agree-tos \
  --no-eff-email
```

**Important Steps:**
1. Certbot aapko DNS TXT record add karne ko kahega
2. DNS Zone Editor mein TXT record add karo (jaisa certbot ne diya)
3. DNS propagation wait karo (2-5 minutes)
4. Terminal mein `Enter` press karo
5. Certificate generate ho jayega

### 5.2 Auto-Renewal Setup
```bash
# Certbot auto-renewal test karo
sudo certbot renew --dry-run

# Cron job already setup hota hai, verify karo
sudo systemctl status certbot.timer
```

### 5.3 Nginx Config Update
SSL certificate generate hone ke baad, Nginx config automatically update ho jayega. Agar nahi hua, to manually update karo:

```bash
sudo nano /etc/nginx/sites-available/library-saathi
# SSL paths verify karo
sudo nginx -t
sudo systemctl reload nginx
```

---

## Step 6: Firewall Configuration

### 6.1 UFW (Uncomplicated Firewall) Setup
```bash
# UFW enable karo
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Status check karo
sudo ufw status
```

---

## Step 7: Verification & Testing

### 7.1 DNS Propagation Check
```bash
# Terminal se check karo
dig yourdomain.com
dig *.yourdomain.com
dig test1.yourdomain.com

# Ya online check karo: https://dnschecker.org
```

### 7.2 Application Status
```bash
# PM2 status
pm2 status
pm2 logs library-saathi

# Nginx status
sudo systemctl status nginx

# Port check
sudo netstat -tlnp | grep :3000
```

### 7.3 Test URLs
1. **Main domain**: `https://yourdomain.com`
2. **Subdomain**: `https://test1.yourdomain.com` (dashboard se create karo pehle)
3. **Dashboard**: `https://yourdomain.com/dashboard`

---

## Step 8: Monitoring & Maintenance

### 8.1 PM2 Monitoring
```bash
# Real-time monitoring
pm2 monit

# Logs dekho
pm2 logs library-saathi

# Restart application
pm2 restart library-saathi

# Stop application
pm2 stop library-saathi
```

### 8.2 Nginx Logs
```bash
# Access logs
sudo tail -f /var/log/nginx/library-saathi-access.log

# Error logs
sudo tail -f /var/log/nginx/library-saathi-error.log
```

### 8.3 Application Updates
```bash
cd ~/library_saathi

# Latest code pull karo
git pull origin main

# Dependencies update (agar needed)
npm install

# Rebuild
npm run build

# PM2 restart
pm2 restart library-saathi
```

---

## Troubleshooting

### Issue 1: Subdomain "Not Found" Error
**Solution:**
1. DNS propagation check karo: `dig test1.yourdomain.com`
2. Nginx logs check karo: `sudo tail -f /var/log/nginx/library-saathi-error.log`
3. PM2 logs check karo: `pm2 logs library-saathi`
4. Middleware logs check karo (PM2 logs mein dikhenge)
5. Environment variable check karo: `NEXT_PUBLIC_ROOT_DOMAIN`

### Issue 2: SSL Certificate Error
**Solution:**
1. Certificate expiry check: `sudo certbot certificates`
2. Manual renewal: `sudo certbot renew`
3. Nginx reload: `sudo systemctl reload nginx`

### Issue 3: Application Not Starting
**Solution:**
1. PM2 logs: `pm2 logs library-saathi --lines 50`
2. Port check: `sudo netstat -tlnp | grep :3000`
3. Environment variables verify: `cat .env.production`
4. Build check: `npm run build`

### Issue 4: Nginx 502 Bad Gateway
**Solution:**
1. Application running hai ya nahi: `pm2 status`
2. Port 3000 accessible hai: `curl http://localhost:3000`
3. Nginx config test: `sudo nginx -t`
4. Nginx restart: `sudo systemctl restart nginx`

### Issue 5: DNS Not Resolving
**Solution:**
1. DNS propagation wait karo (5-60 minutes)
2. DNS checker use karo: https://dnschecker.org
3. A record verify karo: `dig *.yourdomain.com`
4. VPS IP correct hai ya nahi check karo

---

## Quick Reference Commands

```bash
# Application
pm2 start npm --name "library-saathi" -- start
pm2 restart library-saathi
pm2 stop library-saathi
pm2 logs library-saathi
pm2 status

# Nginx
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl reload nginx
sudo systemctl status nginx

# SSL
sudo certbot renew
sudo certbot certificates

# Logs
pm2 logs library-saathi
sudo tail -f /var/log/nginx/library-saathi-error.log
sudo tail -f /var/log/nginx/library-saathi-access.log

# DNS
dig yourdomain.com
dig *.yourdomain.com
dig test1.yourdomain.com
```

---

## Important Notes

1. **A Record Configuration**: Wildcard A record (`*`) zaroori hai - bina iske subdomains kaam nahi karenge
2. **SSL Certificate**: Wildcard SSL certificate ke liye DNS challenge use karna hoga
3. **Environment Variables**: `.env.production` file correctly set honi chahiye
4. **Nginx Headers**: `Host` header properly pass hona chahiye middleware ke liye
5. **DNS Propagation**: Changes ke baad 5-60 minutes wait karo
6. **PM2**: Application auto-start ke liye `pm2 startup` aur `pm2 save` zaroori hai
7. **Firewall**: Port 80, 443, aur 22 (SSH) open hona chahiye

---

## Support

Agar koi issue ho:
1. PM2 logs check karo
2. Nginx logs check karo
3. DNS propagation verify karo
4. Environment variables verify karo
5. Middleware logs check karo (PM2 logs mein)

---

## Next Steps

1. ✅ DNS A records configure karo
2. ✅ VPS setup karo
3. ✅ Application deploy karo
4. ✅ Nginx configure karo
5. ✅ SSL certificate setup karo
6. ✅ Test karo
7. ✅ Monitoring setup karo

**Deployment complete! 🎉**

