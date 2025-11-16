# Custom Domain Setup Guide

## Overview
Agar aap apna custom domain use karna chahte ho (jaise `tenant.vikrantrathi.com`), to yeh guide follow karein.

## Example Setup
- **Main Domain**: `jyotilok.com`
- **Subdomain**: `rathi.jyotilok.com`
- **Custom Domain**: `tenant.vikrantrathi.com` (CNAME pointing to `rathi.jyotilok.com`)

## Step-by-Step Instructions

### Step 1: Dashboard Mein Custom Domain Add Karein

1. **Dashboard** mein jao: `/dashboard/subdomains`
2. **Subdomain** select karo (e.g., `rathi`)
3. **Edit Details** par click karo
4. **Custom Domain** field mein apna domain enter karo: `tenant.vikrantrathi.com`
5. **Save Details** click karo

### Step 2: DNS Configuration

Apne DNS provider (Hostinger, GoDaddy, etc.) mein jao aur **CNAME record** add karo:

```
Type: CNAME
Name: tenant (or full domain: tenant.vikrantrathi.com)
Points to: rathi.jyotilok.com
TTL: 3600 (or Auto)
```

**Important Notes**:
- Agar aapka DNS provider `tenant` accept nahi karta, to full domain `tenant.vikrantrathi.com` use karo
- CNAME record point karna hai `rathi.jyotilok.com` par (apne subdomain par)

### Step 3: Vercel Domain Configuration (Agar Vercel Use Kar Rahe Ho)

Agar aap Vercel par deploy kar rahe ho:

1. **Vercel Dashboard** → Your Project → **Settings** → **Domains**
2. **Add Domain** click karo
3. Custom domain add karo: `tenant.vikrantrathi.com`
4. Vercel automatically DNS verification karega

**Important**: 
- Vercel mein domain add karna zaroori hai agar aap Vercel use kar rahe ho
- Vercel SSL certificate automatically provide karega

### Step 4: Wait for DNS Propagation

- DNS changes propagate hone mein **5-60 minutes** lag sakte hain
- Check karne ke liye: https://dnschecker.org
- Enter karo: `tenant.vikrantrathi.com`
- Verify karo ki CNAME record properly set hai

### Step 5: Test

1. Browser mein visit karo: `https://tenant.vikrantrathi.com`
2. Aapko same content dikhna chahiye jo `rathi.jyotilok.com` par hai
3. Agar "Not Found" aaye, to:
   - DNS propagation wait karo
   - Vercel logs check karo
   - Middleware logs check karo (development mode mein)

## How It Works

1. **User visits** `tenant.vikrantrathi.com`
2. **DNS resolves** to `rathi.jyotilok.com` (via CNAME)
3. **Request reaches** your server/Vercel
4. **Middleware detects** custom domain from `Host` header
5. **Redis lookup** finds mapping: `tenant.vikrantrathi.com` → `rathi`
6. **URL rewrites** to `/s/rathi`
7. **Subdomain page** loads with library details

## Troubleshooting

### Issue 1: "Not Found" Error
**Possible Causes**:
- Custom domain Redis mein save nahi hua
- DNS propagation nahi hua
- Vercel mein domain add nahi hua

**Solutions**:
1. Dashboard se verify karo ki custom domain save hua
2. DNS checker se verify karo: https://dnschecker.org
3. Vercel Dashboard mein domain add karo
4. Wait karo 5-60 minutes

### Issue 2: DNS Not Resolving
**Solutions**:
1. CNAME record correctly set hai ya nahi check karo
2. DNS provider mein TTL check karo
3. DNS propagation wait karo
4. Browser cache clear karo

### Issue 3: SSL Certificate Error
**Solutions**:
1. Vercel mein domain add karo (automatic SSL)
2. Wait karo SSL certificate generation ke liye (5-10 minutes)
3. HTTPS use karo, HTTP nahi

### Issue 4: Custom Domain Not Detected
**Solutions**:
1. Check karo ki custom domain correctly save hua Redis mein
2. Middleware logs check karo (development mode)
3. Verify karo ki `NEXT_PUBLIC_ROOT_DOMAIN` correctly set hai
4. Redis connection check karo

## Verification Checklist

- [ ] Custom domain dashboard mein save hua
- [ ] CNAME record DNS mein add hua
- [ ] CNAME correctly points to subdomain (e.g., `rathi.jyotilok.com`)
- [ ] Vercel mein domain add hua (if using Vercel)
- [ ] DNS propagation complete hua (checked via dnschecker.org)
- [ ] SSL certificate active hai (if using HTTPS)
- [ ] Custom domain URL properly loads content

## Important Notes

1. **Custom domain** aur **subdomain** dono kaam karenge
   - `rathi.jyotilok.com` → Works
   - `tenant.vikrantrathi.com` → Also works (same content)

2. **Multiple custom domains** ek subdomain ke liye add kar sakte ho
   - Bas dashboard mein comma-separated list add karo (future feature)

3. **DNS management**:
   - Agar DNS Vercel ke pass hai → Vercel mein add karo
   - Agar DNS external hai → External provider mein CNAME add karo

4. **SSL certificates**:
   - Vercel automatically SSL provide karta hai
   - Agar self-hosted ho, to Let's Encrypt use karo

## Example DNS Records

### Hostinger DNS Zone Editor:
```
Type: CNAME
Name: tenant
Points to: rathi.jyotilok.com
TTL: 3600
```

### GoDaddy DNS Management:
```
Type: CNAME
Host: tenant
Points to: rathi.jyotilok.com
TTL: 1 Hour
```

### Cloudflare DNS:
```
Type: CNAME
Name: tenant
Target: rathi.jyotilok.com
Proxy: Off (for CNAME to work)
TTL: Auto
```

## Support

Agar still issues ho:
1. Vercel function logs check karo
2. Middleware logs check karo (development mode)
3. Redis data verify karo
4. DNS propagation status check karo
