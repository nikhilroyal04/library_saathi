# Vercel Wildcard Subdomain Setup - Step by Step

## Problem
Agar aap manually subdomain add karte ho Vercel mein, to kaam karta hai. Lekin auto subdomain ke liye **WILDCARD DOMAIN** add karna zaroori hai.

## Solution: Wildcard Domain Add Karein

### Step 1: Vercel Dashboard Mein Wildcard Domain Add Karein

1. **Vercel Dashboard** kholo
2. **Your Project** select karo
3. **Settings** tab par jao
4. **Domains** section mein jao
5. **Add Domain** button click karo
6. **Wildcard domain add karo**: `*.yourdomain.com`
   - Example: Agar domain `example.com` hai, to add karo: `*.example.com`
   - **Important**: Asterisk (`*`) zaroori hai - yeh wildcard hai

### Step 2: DNS Configuration (Agar DNS Vercel ke pass hai)

Agar aapka domain Vercel ke through manage ho raha hai:

1. Vercel automatically wildcard DNS setup kar deta hai
2. Kuch bhi manually karne ki zaroorat nahi
3. Bas wait karo 5-10 minutes

### Step 3: DNS Configuration (Agar DNS Hostinger/External hai)

Agar aapka DNS Hostinger ya kisi aur provider ke pass hai:

1. **Hostinger DNS Zone Editor** mein jao
2. **CNAME Record** add karo:
   ```
   Type: CNAME
   Name: *
   Points to: cname.vercel-dns.com
   TTL: 3600
   ```

   **Ya phir** agar CNAME kaam nahi kare:
   ```
   Type: A Record
   Name: *
   Points to: 76.76.21.21 (Vercel's IP - check latest)
   ```

### Step 4: Environment Variables Check Karein

Vercel Dashboard → Settings → Environment Variables mein yeh zaroor hona chahiye:

```
NEXT_PUBLIC_ROOT_DOMAIN=yourdomain.com
KV_REST_API_URL=your_upstash_url
KV_REST_API_TOKEN=your_upstash_token
```

**Important**: `NEXT_PUBLIC_ROOT_DOMAIN` mein sirf domain name hona chahiye, `http://` ya `https://` nahi.

### Step 5: Redeploy

1. **Redeploy** karo (ya automatic ho jayega)
2. **Wait** karo 5-60 minutes (DNS propagation)
3. **Test** karo: `https://test1.yourdomain.com`

## Kaise Kaam Karega

1. **Wildcard Domain** (`*.yourdomain.com`) add karne se:
   - Vercel automatically **sabhi subdomains** ko aapke app par route karega
   - Example: `test1.yourdomain.com`, `test2.yourdomain.com`, `anything.yourdomain.com` - sab kaam karenge

2. **Middleware** automatically:
   - Subdomain detect karega
   - URL ko `/s/[subdomain]` route par rewrite karega
   - Subdomain page load karega

3. **Aapko manually kuch add karne ki zaroorat nahi**:
   - Bas wildcard domain add karo
   - Baaki sab automatic!

## Verification Steps

### Check 1: Vercel Domain Settings
- [ ] `yourdomain.com` added
- [ ] `*.yourdomain.com` added (wildcard - yeh zaroori hai!)
- [ ] Both showing "Valid Configuration"

### Check 2: DNS Propagation
```bash
# Terminal mein run karo:
dig *.yourdomain.com

# Ya online check karo:
# https://dnschecker.org
```

### Check 3: Test Subdomain
1. Dashboard se subdomain create karo: `test1`
2. Wait karo 5-10 minutes
3. Visit: `https://test1.yourdomain.com`
4. Should work!

## Common Issues

### Issue 1: "Not Found" Error
**Reason**: Wildcard domain add nahi hua
**Solution**: 
- Vercel Dashboard → Settings → Domains
- Add: `*.yourdomain.com`
- Redeploy

### Issue 2: DNS Not Working
**Reason**: DNS propagation nahi hua
**Solution**:
- Wait 5-60 minutes
- Check DNS propagation: https://dnschecker.org
- Clear browser cache

### Issue 3: Subdomain Detected But 404
**Reason**: Subdomain Redis mein nahi hai
**Solution**:
- Dashboard se subdomain create karo
- Redis connection check karo
- Vercel logs check karo

### Issue 4: Manual Add Karna Pad Raha Hai
**Reason**: Wildcard domain add nahi hua
**Solution**: 
- **Wildcard domain add karo** - yeh sabse important step hai!
- `*.yourdomain.com` add karo Vercel mein
- Phir manually add karne ki zaroorat nahi

## Quick Checklist

- [ ] Vercel Dashboard mein `*.yourdomain.com` add kiya (wildcard)
- [ ] Main domain `yourdomain.com` add kiya
- [ ] Environment variables set kiye
- [ ] DNS configured (CNAME ya A record for wildcard)
- [ ] Redeployed
- [ ] Waited for DNS propagation (5-60 min)
- [ ] Tested with a subdomain

## Important Notes

1. **Wildcard domain (`*.yourdomain.com`) add karna zaroori hai** - bina iske auto subdomain kaam nahi karega
2. **Manual subdomain add karne ki zaroorat nahi** - wildcard se sab automatic ho jayega
3. **DNS propagation** time lagta hai - patience rakho
4. **Environment variable** `NEXT_PUBLIC_ROOT_DOMAIN` correctly set hona chahiye

## Still Not Working?

1. **Vercel Logs** check karo:
   - Vercel Dashboard → Your Project → Deployments → Click on latest → Functions tab
   - Middleware logs dekho

2. **Test locally first**:
   ```bash
   npm run dev
   # Visit: http://test1.localhost:3000
   ```

3. **Check middleware**:
   - Vercel function logs mein subdomain detection check karo
   - Console logs dekho (development mode mein)

4. **Verify Redis**:
   - Subdomain Redis mein hai ya nahi check karo
   - Upstash dashboard check karo

