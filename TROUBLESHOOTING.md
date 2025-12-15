# Troubleshooting Guide

## ✅ Current Status Check

### Server Status
- ✅ **Build**: Successful (no errors)
- ✅ **Port 3000**: Server is running
- ✅ **API**: Responding correctly
- ✅ **CSV File**: Readable (10,002 lines)
- ✅ **TypeScript**: No errors
- ✅ **Linter**: No errors

## 🔧 Common Issues & Solutions

### Issue 1: "This site can't be reached" or "Connection refused"

**Solution:**
```bash
# 1. Kill any processes on port 3000
lsof -ti:3000 | xargs kill -9

# 2. Start fresh
npm run dev
```

**Or use a different port:**
```bash
PORT=3001 npm run dev
# Then visit: http://localhost:3001
```

---

### Issue 2: Server starts but page shows errors

**Check:**
1. **Browser Console** (F12 → Console tab)
   - Look for JavaScript errors
   - Check for network errors

2. **Terminal/Server Logs**
   - Look for error messages
   - Check for build warnings

**Solution:**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
npm run dev
```

---

### Issue 3: CSV data not loading

**Check CSV file:**
```bash
# Verify file exists
ls -lh cde_ipaas_dataset.csv

# Check file permissions
chmod 644 cde_ipaas_dataset.csv
```

**Solution:**
- Ensure CSV file is in project root (not in a subfolder)
- File should be named exactly: `cde_ipaas_dataset.csv`
- Check file has read permissions

---

### Issue 4: Port already in use

**Solution:**
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

---

### Issue 5: Build errors

**Solution:**
```bash
# Clean install
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

---

### Issue 6: Styles not loading

**Solution:**
```bash
# Rebuild Tailwind
npm run build

# Check tailwind.config.ts exists
# Check postcss.config.js exists
```

---

## 🧪 Quick Health Check

Run these commands to verify everything:

```bash
# 1. Check if server is running
curl http://localhost:3000

# 2. Check API endpoint
curl http://localhost:3000/api/devices

# 3. Check build
npm run build

# 4. Check TypeScript
npm run type-check

# 5. Check linting
npm run lint
```

---

## 🚀 Fresh Start (If Nothing Works)

```bash
# 1. Stop all processes
pkill -f "next dev"

# 2. Clean everything
rm -rf .next node_modules package-lock.json

# 3. Reinstall
npm install

# 4. Build
npm run build

# 5. Start server
npm run dev
```

---

## 📊 Server Status Commands

```bash
# Check if port 3000 is in use
lsof -ti:3000

# Check server response
curl http://localhost:3000

# Check API response
curl http://localhost:3000/api/devices | head -c 500

# View server logs (if running in terminal)
# Look for errors or warnings
```

---

## 🌐 Browser Troubleshooting

### Clear Browser Cache
1. **Chrome/Edge**: Ctrl+Shift+Delete (Cmd+Shift+Delete on Mac)
2. **Firefox**: Ctrl+Shift+Delete
3. Select "Cached images and files"
4. Clear data

### Hard Refresh
- **Windows/Linux**: Ctrl+Shift+R or Ctrl+F5
- **Mac**: Cmd+Shift+R

### Check Browser Console
1. Press F12 (or Cmd+Option+I on Mac)
2. Go to Console tab
3. Look for red errors
4. Go to Network tab
5. Check for failed requests

---

## 🔍 Debug Mode

Enable verbose logging:

```bash
# Run with debug output
DEBUG=* npm run dev

# Or check Next.js logs
npm run dev 2>&1 | tee server.log
```

---

## ✅ Verification Checklist

- [ ] Server is running (`npm run dev`)
- [ ] Port 3000 is accessible
- [ ] Browser can reach `http://localhost:3000`
- [ ] No errors in browser console
- [ ] No errors in terminal
- [ ] CSV file exists and is readable
- [ ] Build completes successfully
- [ ] API endpoint responds

---

## 🆘 Still Not Working?

1. **Check terminal output** for specific error messages
2. **Check browser console** (F12) for JavaScript errors
3. **Check network tab** (F12 → Network) for failed requests
4. **Share error messages** for specific help

---

## 📝 Current Configuration

- **Port**: 3000 (default)
- **Framework**: Next.js 14.2.0
- **Node Version**: Check with `node --version`
- **Data Source**: CSV file (cde_ipaas_dataset.csv)
- **API Routes**: `/api/devices`, `/api/devices/[id]`

---

**If you see specific error messages, share them and I can help fix them!**

