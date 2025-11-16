# Vercel Deployment Setup for Subdomains

## Step 1: Vercel Project Setup

1. **Connect your GitHub repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository

2. **Configure Environment Variables**
   In Vercel Dashboard → Settings → Environment Variables, add:
   ```
   NEXT_PUBLIC_ROOT_DOMAIN=yourdomain.com
   KV_REST_API_URL=your_upstash_redis_url
   KV_REST_API_TOKEN=your_upstash_redis_token
   NODE_ENV=production
   ```

## Step 2: Add Custom Domain

1. **Add Main Domain**
   - Go to Vercel Dashboard → Your Project → Settings → Domains
   - Add your main domain: `yourdomain.com`
   - Add `www.yourdomain.com` (optional)

2. **Configure DNS on Hostinger**
   Go to Hostinger DNS Zone Editor and add:
   ```
   Type: A Record
   Name: @
   Points to: 76.76.21.21 (Vercel's IP - check latest in Vercel docs)
   
   Type: CNAME Record
   Name: www
   Points to: cname.vercel-dns.com
   ```

## Step 3: Enable Wildcard Subdomains

1. **In Vercel Dashboard**:
   - Go to Settings → Domains
   - Add wildcard domain: `*.yourdomain.com`
   - Vercel will automatically handle all subdomains!

2. **DNS Configuration on Hostinger**:
   ```
   Type: CNAME Record
   Name: *
   Points to: cname.vercel-dns.com
   ```
   
   **OR** if CNAME doesn't work for wildcard:
   ```
   Type: A Record
   Name: *
   Points to: 76.76.21.21 (Vercel's IP)
   ```

## Step 4: Deploy

1. **Push to GitHub** - Vercel will auto-deploy
2. **Wait for DNS propagation** (5-60 minutes)
3. **Test subdomain**: `https://test1.yourdomain.com`

## Troubleshooting "Not Found" Error

### Issue 1: Subdomain not detected
**Solution**: Check middleware is working:
- Visit: `https://yourdomain.com/api/test` (should work)
- Check Vercel function logs for middleware execution

### Issue 2: DNS not propagated
**Solution**: 
- Use `dig *.yourdomain.com` to check DNS
- Wait 5-60 minutes after DNS changes
- Clear browser cache

### Issue 3: Subdomain exists but shows 404
**Solution**:
- Verify subdomain exists in Redis/Upstash
- Check Vercel logs for errors
- Ensure `NEXT_PUBLIC_ROOT_DOMAIN` is set correctly

### Issue 4: Vercel preview URLs
**For testing on Vercel preview**:
- Use format: `test1-yourproject.vercel.app`
- Middleware will extract `test1` as subdomain

## Testing Locally Before Deploy

1. **Test middleware**:
   ```bash
   npm run dev
   # Visit: http://test1.localhost:3000
   ```

2. **Test production build**:
   ```bash
   npm run build
   npm start
   ```

## Important Notes

- **Vercel automatically handles wildcard subdomains** - no extra config needed!
- **SSL certificates** are automatically provided by Vercel
- **Environment variables** must be set in Vercel dashboard
- **DNS propagation** can take time - be patient!

## Quick Checklist

- [ ] Repository connected to Vercel
- [ ] Environment variables set in Vercel
- [ ] Main domain added in Vercel
- [ ] Wildcard domain `*.yourdomain.com` added in Vercel
- [ ] DNS configured on Hostinger (CNAME for wildcard)
- [ ] Subdomain created in dashboard
- [ ] Tested subdomain URL

## Support

If still getting "Not Found":
1. Check Vercel deployment logs
2. Verify middleware is running (check function logs)
3. Test with a simple subdomain first
4. Ensure Redis connection is working

