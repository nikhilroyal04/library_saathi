# Custom Domain Setup Guide

## Overview
Agar koi apna custom domain connect karna chahta hai (jaise `library.example.com`), to wo easily kar sakta hai.

## How It Works

1. **User creates subdomain** in dashboard (e.g., `test1`)
2. **User adds custom domain** in library details form (e.g., `library.example.com`)
3. **User configures DNS** - CNAME record pointing to `test1.yourdomain.com`
4. **Middleware detects** custom domain and routes to correct subdomain

## Step-by-Step Setup

### Step 1: Add Custom Domain in Dashboard

1. Go to **Dashboard → Subdomains**
2. Click **"Edit Details"** on your subdomain
3. Scroll to **"Custom Domain"** section
4. Enter your custom domain (e.g., `library.example.com`)
5. Click **"Save Details"**

### Step 2: Configure DNS

User ko apne DNS provider (Hostinger, GoDaddy, etc.) mein CNAME record add karna hoga:

```
Type: CNAME
Name: library (or subdomain part)
Value: test1.yourdomain.com
TTL: 3600 (or default)
```

**Example:**
- Custom Domain: `library.example.com`
- Subdomain: `test1`
- CNAME Record:
  - Name: `library`
  - Value: `test1.yourdomain.com`

### Step 3: Add Domain in Vercel (If Using Vercel)

1. Go to **Vercel Dashboard → Your Project → Settings → Domains**
2. Click **"Add Domain"**
3. Enter custom domain: `library.example.com`
4. Vercel will show DNS instructions (but CNAME already configured)
5. Wait for DNS verification (usually automatic)

### Step 4: Wait for DNS Propagation

- DNS changes can take **5-60 minutes** to propagate
- Check DNS propagation: https://dnschecker.org
- Once propagated, custom domain will work!

## Technical Details

### How Middleware Detects Custom Domain

1. Middleware checks if hostname matches root domain
2. If not, checks Redis for custom domain mapping
3. If found, routes to corresponding subdomain
4. Otherwise, uses normal subdomain detection

### Data Storage

- Custom domain stored in `LibraryDetails.customDomain`
- Mapping stored in Redis: `customdomain:library.example.com` → `test1`
- Old mappings automatically cleaned up when changed

## Example Flow

```
User visits: library.example.com
    ↓
Middleware checks: Is this a custom domain?
    ↓
Redis lookup: customdomain:library.example.com → test1
    ↓
Rewrite URL: /s/test1
    ↓
Subdomain page loads with library details
```

## Troubleshooting

### Issue 1: Custom Domain Not Detected

**Check:**
- Custom domain saved in dashboard?
- DNS CNAME record configured?
- DNS propagated? (check with dnschecker.org)
- Domain added in Vercel? (if using Vercel)

**Solution:**
- Verify custom domain in Redis: Check `customdomain:yourdomain.com`
- Check middleware logs for custom domain detection
- Ensure DNS points to correct subdomain

### Issue 2: DNS Not Working

**Check:**
- CNAME record correctly configured?
- TTL expired? (wait for propagation)
- DNS provider cache cleared?

**Solution:**
- Verify CNAME record: `dig library.example.com`
- Wait 5-60 minutes for propagation
- Clear browser cache

### Issue 3: Vercel Shows "Invalid Configuration"

**Check:**
- Domain added in Vercel?
- DNS CNAME pointing to correct subdomain?
- SSL certificate provisioning?

**Solution:**
- Add domain in Vercel Dashboard
- Ensure CNAME points to `subdomain.yourdomain.com`
- Wait for SSL certificate (automatic, usually 1-5 minutes)

## Important Notes

1. **Custom domain must be unique** - one custom domain per subdomain
2. **DNS must point to subdomain** - CNAME to `subdomain.yourdomain.com`
3. **Vercel requires domain addition** - if using Vercel, add domain in dashboard
4. **SSL is automatic** - Vercel provides SSL certificates automatically
5. **Old mappings cleaned up** - when custom domain changes, old mapping removed

## Testing Locally

For local testing, you can use `/etc/hosts`:

```bash
# Add to /etc/hosts
127.0.0.1 library.example.com
```

Then visit: `http://library.example.com:3000`

## API Reference

### Functions

- `getSubdomainFromCustomDomain(customDomain: string)`: Get subdomain from custom domain
- `saveLibraryDetails(subdomain: string, details: LibraryDetails)`: Save library details including custom domain

### Redis Keys

- `customdomain:{domain}`: Maps custom domain to subdomain
- `library:{subdomain}`: Stores library details including custom domain

