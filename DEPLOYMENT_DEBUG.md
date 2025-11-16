# Deployment Debugging Guide

## Custom Domain Not Working in Deployment?

Agar custom domain deployment mein kaam nahi kar raha, to yeh steps follow karein:

### Step 1: Verify Custom Domain in Redis

1. **Dashboard se check karo**:
   - `/dashboard/subdomains` → Subdomain select karo
   - Edit Details → Custom Domain field check karo
   - Save kiya hai ya nahi verify karo

2. **Debug API se check karo**:
   ```
   https://yourdomain.com/api/debug/custom-domain?domain=tenant.vikrantrathi.com
   ```
   
   Yeh response dikhayega:
   - Custom domain Redis mein hai ya nahi
   - Sabhi custom domain mappings
   - Current hostname check

### Step 2: Check Vercel Logs

1. **Vercel Dashboard** → Your Project → **Deployments**
2. Latest deployment click karo
3. **Functions** tab mein jao
4. **Middleware logs** check karo:
   - `[Middleware] Custom domain detected:` - Agar yeh dikhe, to middleware detect kar raha hai
   - `[Middleware] Error checking custom domain:` - Agar yeh dikhe, to error hai

### Step 3: Verify Environment Variables

Vercel Dashboard → Settings → Environment Variables mein yeh zaroor hona chahiye:

```
NEXT_PUBLIC_ROOT_DOMAIN=jyotilok.com
KV_REST_API_URL=your_upstash_url
KV_REST_API_TOKEN=your_upstash_token
```

**Important**: 
- `NEXT_PUBLIC_ROOT_DOMAIN` mein sirf domain name (without http/https)
- Environment variables set karne ke baad **redeploy** karna zaroori hai

### Step 4: Check DNS Configuration

1. **DNS Checker** use karo: https://dnschecker.org
2. Enter karo: `tenant.vikrantrathi.com`
3. Verify karo ki CNAME record properly set hai:
   ```
   tenant.vikrantrathi.com → CNAME → rathi.jyotilok.com
   ```

### Step 5: Verify Vercel Domain Configuration

1. **Vercel Dashboard** → Settings → **Domains**
2. Check karo ki `tenant.vikrantrathi.com` add hua hai
3. Status "Valid Configuration" dikhna chahiye
4. Agar nahi hai, to add karo

### Step 6: Test Middleware Directly

Browser console ya curl se test karo:

```bash
# Test custom domain
curl -H "Host: tenant.vikrantrathi.com" https://jyotilok.com/

# Check debug endpoint
curl https://jyotilok.com/api/debug/custom-domain?domain=tenant.vikrantrathi.com
```

### Common Issues & Solutions

#### Issue 1: Custom Domain Not Detected

**Symptoms**:
- Custom domain par "Not Found" aata hai
- Debug API mein `found: false` dikhata hai

**Solutions**:
1. Dashboard se verify karo ki custom domain save hua
2. Redis connection check karo (Upstash dashboard)
3. Environment variables verify karo
4. Redeploy karo after changes

#### Issue 2: Redis Connection Error

**Symptoms**:
- Vercel logs mein Redis error dikhata hai
- Debug API mein `redisConnected: false`

**Solutions**:
1. Upstash Redis dashboard check karo
2. `KV_REST_API_URL` aur `KV_REST_API_TOKEN` verify karo
3. Vercel mein environment variables correctly set hain ya nahi check karo
4. Redeploy karo

#### Issue 3: Middleware Not Running

**Symptoms**:
- Vercel logs mein middleware logs nahi dikhte
- Custom domain par main website dikhata hai

**Solutions**:
1. `middleware.ts` file correctly deployed hai ya nahi check karo
2. Vercel build logs check karo
3. `vercel.json` configuration verify karo
4. Redeploy karo

#### Issue 4: DNS Not Propagated

**Symptoms**:
- Custom domain resolve nahi hota
- Browser mein "DNS_PROBE_FINISHED_NXDOMAIN" error

**Solutions**:
1. DNS propagation wait karo (5-60 minutes)
2. DNS checker se verify karo
3. CNAME record correctly set hai ya nahi check karo
4. DNS provider cache clear karo

### Debug Checklist

- [ ] Custom domain dashboard mein save hua
- [ ] Debug API se verify kiya (`/api/debug/custom-domain`)
- [ ] Vercel logs check kiye
- [ ] Environment variables correctly set hain
- [ ] DNS properly configured hai
- [ ] Vercel mein domain add hua
- [ ] DNS propagation complete hua
- [ ] Redeploy kiya after changes

### Quick Test Commands

```bash
# 1. Check custom domain in Redis
curl https://yourdomain.com/api/debug/custom-domain?domain=tenant.vikrantrathi.com

# 2. Check all custom domains
curl https://yourdomain.com/api/debug/custom-domain

# 3. Test custom domain (replace with your domain)
curl -I -H "Host: tenant.vikrantrathi.com" https://jyotilok.com/

# 4. Check DNS
dig tenant.vikrantrathi.com
```

### Still Not Working?

1. **Vercel Function Logs** check karo:
   - Vercel Dashboard → Deployments → Latest → Functions
   - Middleware execution logs dekho
   - Errors check karo

2. **Upstash Redis** check karo:
   - Upstash Dashboard → Your Database
   - Keys check karo: `customdomain:tenant.vikrantrathi.com`
   - Value check karo: should be `rathi`

3. **Contact Support**:
   - Vercel logs share karo
   - Debug API response share karo
   - DNS configuration share karo

