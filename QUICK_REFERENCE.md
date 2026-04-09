# Quick Reference - Pet Care Hub Live Site

## 🌐 Live URL
https://pet-care-grp3lj.netlify.app

## 🔑 Admin Credentials
- **Email:** admin@123
- **Password:** admin123

## 📍 Important Routes
| Route | Purpose |
|-------|---------|
| `/` | Home page |
| `/community` | Community incident reports |
| `/hotline` | Emergency hotline |
| `/admin/login` | Admin login |
| `/admin/dashboard` | Admin panel |
| `/dashboard` | User dashboard |

## 🔄 How to Update & Redeploy

### Update Code
```bash
cd c:\Users\aarna\Desktop\pet-care
# Make changes to src/ files
```

### Build & Deploy
```bash
npm run build
netlify deploy --dir dist --prod
```

## 🗝️ Netlify Environment Variables
Located in: Netlify Dashboard → Site Settings → Build & Deploy → Environment

```
VITE_SUPABASE_URL=https://echkcevckoakqowtkgrl.supabase.co
VITE_SUPABASE_ANON_KEY=(your anon key)
VITE_EMAILJS_SERVICE_ID=service_p5ppsxf
VITE_EMAILJS_TEMPLATE_ID=template_ue9bk58
VITE_EMAILJS_PUBLIC_KEY=IaYS6zfUJvYO0YzJD
VITE_GOOGLE_CLIENT_ID=538016085765-2c0970fkoomogs3j04giijb2mfc5569b.apps.googleusercontent.com
VITE_USE_MOCK_BACKEND=false
VITE_ADMIN_EMAIL=admin@123
VITE_ADMIN_PASSWORD=admin123
```

## 📊 Key Features Live
✅ User authentication (OTP via email)
✅ Admin dashboard with data management
✅ Community incident reporting
✅ Emergency hotline page
✅ Appointment booking
✅ Pet shop & services
✅ Veterinary clinics directory

## 🔗 Important Links
- **Production Site:** https://pet-care-grp3lj.netlify.app
- **Netlify Dashboard:** https://app.netlify.com/sites/pet-care-grp3lj
- **Supabase Project:** https://app.supabase.com (use your account)
- **GitHub Repo:** (if connected for auto-deploy)

## 🐛 Troubleshooting
- **Admin login fails?** → Clear browser cache (Ctrl+Shift+Delete), hard refresh (Ctrl+F5)
- **Data not loading?** → Check Netlify env vars are set correctly
- **Email not sending?** → Verify EmailJS config in Supabase
- **Console errors?** → Open DevTools (F12) → Console tab → share errors here

## 📞 Support
For issues, check:
1. Browser console (F12 → Console)
2. Network tab (F12 → Network) for failed requests
3. Netlify deploy logs: https://app.netlify.com/projects/pet-care-grp3lj/deploys
4. This `DEPLOYMENT_SUMMARY.md` file for detailed troubleshooting
