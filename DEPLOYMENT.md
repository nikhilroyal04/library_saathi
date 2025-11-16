# Production Deployment Guide - Hostinger

## Subdomain Auto-Creation Setup

### Step 1: DNS Configuration on Hostinger

1. **Login to Hostinger Control Panel**
   - Go to your Hostinger account
   - Navigate to **Domains** → **DNS Zone Editor**

2. **Add Wildcard DNS Record (A Record - VPS ke liye zaroori)**
   - **Type**: `A` Record (CNAME nahi - VPS par CNAME wildcard kaam nahi karta)
   - **Name**: `*` (asterisk - this is the wildcard)
   - **Points to**: Your VPS server IP address
   - **TTL**: 3600 (or default)

   **Important**: VPS par wildcard subdomains ke liye **A Record** use karna zaroori hai, CNAME nahi chalega.

   This will make ALL subdomains point to your server:
   - `test1.yourdomain.com` → Your VPS IP
   - `test2.yourdomain.com` → Your VPS IP
   - `any-subdomain.yourdomain.com` → Your VPS IP

3. **Add Main Domain A Record** (if not already present)
   - **Type**: `A` Record
   - **Name**: `@` or leave blank
   - **Points to**: Your server IP address
   - **TTL**: 3600

4. **Add WWW Record** (optional)
   - **Type**: `A` Record (VPS par A record use karo, CNAME bhi chalega but A record better hai)
   - **Name**: `www`
   - **Points to**: Your VPS server IP address
   - **TTL**: 3600

### Step 2: Environment Variables

Create `.env.production` file or set these in your hosting platform:

```env
# Your main domain (without http/https)
NEXT_PUBLIC_ROOT_DOMAIN=yourdomain.com

# Redis/Upstash credentials (for subdomain storage)
KV_REST_API_URL=your_upstash_redis_url
KV_REST_API_TOKEN=your_upstash_redis_token

# Node environment
NODE_ENV=production
```

### Step 3: Server Configuration

#### Option A: VPS/Server (Recommended)

1. **Install Node.js and PM2**
   ```bash
   # Install Node.js 18+
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PM2
   npm install -g pm2
   ```

2. **Setup Nginx Reverse Proxy**
   
   **Important**: Nginx config mein `Host` header properly pass hona zaroori hai middleware ke liye.
   
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com *.yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           
           # Headers (Important for subdomain detection)
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_set_header X-Forwarded-Host $host;
           
           # WebSocket support
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_cache_bypass $http_upgrade;
           
           # Timeouts
           proxy_connect_timeout 60s;
           proxy_send_timeout 60s;
           proxy_read_timeout 60s;
       }
   }
   ```
   
   **Complete VPS setup guide**: See `VPS_DEPLOYMENT.md` for detailed step-by-step instructions.

3. **Setup SSL with Let's Encrypt**
   
   **Wildcard SSL Certificate** ke liye DNS challenge use karna hoga:
   
   ```bash
   sudo apt install certbot python3-certbot-nginx
   
   # Wildcard SSL (DNS challenge required)
   sudo certbot certonly --manual --preferred-challenges dns \
     -d yourdomain.com \
     -d *.yourdomain.com \
     --email your-email@example.com \
     --agree-tos
   ```
   
   Certbot aapko DNS TXT record add karne ko kahega. DNS Zone Editor mein add karo, phir Enter press karo.

#### Option B: Vercel/Netlify (Easier)

1. **Vercel Setup**:
   - Connect your GitHub repo
   - Add environment variables in Vercel dashboard
   - Vercel automatically handles wildcard subdomains!

2. **Netlify Setup**:
   - Connect your GitHub repo
   - Add environment variables
   - In Netlify DNS, add wildcard A record pointing to Netlify

### Step 4: Build and Deploy

```bash
# Build the application
npm run build

# Start with PM2 (if using VPS)
pm2 start npm --name "library-saathi" -- start

# Or deploy to Vercel/Netlify (automatic with git push)
```

### Step 5: Verify Subdomain Creation

1. **Create a subdomain in dashboard**: `test1`
2. **Wait for DNS propagation** (5-60 minutes)
3. **Visit**: `https://test1.yourdomain.com`
4. **Should see**: Subdomain website automatically!

## How It Works

1. **User creates subdomain** in dashboard → Stored in Redis
2. **DNS wildcard** (`*`) routes all subdomains to your server
3. **Next.js middleware** detects subdomain from `Host` header
4. **Middleware rewrites** URL to `/s/[subdomain]` route
5. **Subdomain page** loads with library details

## Troubleshooting

### Subdomains not working?

1. **Check DNS propagation**: Use `dig *.yourdomain.com` or online DNS checker
2. **Verify middleware**: Check server logs for subdomain detection
3. **Check environment variables**: Ensure `NEXT_PUBLIC_ROOT_DOMAIN` is set correctly
4. **Test locally**: Use `test1.localhost:3000` to verify middleware works

### SSL Certificate Issues?

- For wildcard SSL, use Let's Encrypt with DNS challenge
- Or use Cloudflare (free SSL for all subdomains)

## Important Notes

- **DNS Propagation**: Can take 5-60 minutes after adding wildcard record
- **SSL Certificates**: Wildcard SSL needed for `*.yourdomain.com`
- **Server Resources**: Each subdomain uses same server, monitor resources
- **Rate Limiting**: Consider rate limiting for subdomain creation

## Support

For issues, check:
- Next.js middleware logs
- Server error logs
- DNS propagation status
- Redis connection status

