# 🌿 Homeopathy Medicine Finder — Setup Guide

A simple web app to manage homeopathy medicines and find them by symptoms. Works on any phone or PC. Data is permanently stored in **Google Sheets** (free, no database needed).

---

## Quick Start (Local Use)

1. Open `index.html` in any browser — the app works immediately
2. 15 sample medicines are pre-loaded
3. Data is stored in your browser's localStorage

---

## Host Online (GitHub Pages) — Recommended

### Step 1: Create a GitHub Repository
1. Go to [github.com](https://github.com) → sign up (free) if you don't have an account
2. Click **"+"** (top right) → **"New repository"**
3. Name it: `homeopathy-app`
4. Set it to **Public**
5. Click **"Create repository"**

### Step 2: Upload Files
1. In the new repo, click **"uploading an existing file"**
2. Drag and drop `index.html`
3. Click **"Commit changes"**

### Step 3: Enable GitHub Pages
1. Go to repo → **Settings** tab
2. Left sidebar → click **Pages**
3. Under **Branch**, select `main` → folder `/root`
4. Click **Save**

### Step 4: Access Your App
After 1–2 minutes, your app is live at:
```
https://YOUR_USERNAME.github.io/homeopathy-app/
```

---

## Cloud Sync Setup (Google Sheets) — Keeps Data Permanently

Without cloud sync, clearing browser cache deletes your data. With cloud sync, your data is permanently saved in a Google Sheet you own.

### Step 1: Create a Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new **blank spreadsheet**
3. Name it anything (e.g., "Homeopathy Medicine Data")

### Step 2: Add the Backend Script
1. In the spreadsheet, click **Extensions → Apps Script**
2. Delete all the default code in the editor
3. Open the file `google-apps-script.js` from this folder
4. Copy the **entire** contents and paste into the Apps Script editor
5. Click the **💾 Save** button (name the project anything)

### Step 3: Deploy as Web App
1. Click **Deploy → New deployment**
2. Click the ⚙️ gear icon next to "Select type" → choose **Web app**
3. Set these options:
   - **Description**: `Homeopathy API`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
4. Click **Deploy**

### Step 4: Authorize Permissions
1. Click **Review permissions**
2. Choose your Google account
3. Click **Advanced** → **"Go to (project name) (unsafe)"**
4. Click **Allow**

> ⚠️ Google shows a scary warning because the script is not "verified" — this is normal for personal scripts. The script only reads/writes to YOUR spreadsheet.

### Step 5: Copy the URL
After deployment, you'll see a **Web app URL** like:
```
https://script.google.com/macros/s/AKfycbx.../exec
```
**Copy this URL** — you'll need it in the next step.

### Step 6: Connect the App
1. Open your Homeopathy Finder app
2. Click **⚙️ Settings**
3. In the **Cloud Sync** section, paste the URL
4. Click **🔗 Connect**
5. Done! Data is now syncing to Google Sheets

---

## How Cloud Sync Works

| Action | What Happens |
|--------|-------------|
| Add/update a medicine | Saved locally + auto-pushed to Google Sheets (3s delay) |
| Clear browser cache | Open app → data auto-restores from Google Sheets |
| New device/browser | Settings → paste same URL → click "Pull from Cloud" |
| Manual backup | Click "⬆️ Push to Cloud" anytime |
| Manual restore | Click "⬇️ Pull from Cloud" anytime |
| View raw data | Open your Google Sheet → "Medicines (Readable)" tab |

---

## App Features

### 4 Tabs

| Tab | What It Does |
|-----|-------------|
| **➕ Add** | Add a new medicine with symptoms. If medicine exists, new symptoms are appended |
| **🔍 Symptom** | Search by symptom → shows medicine numbers (e.g., `1, 3, 7`) |
| **💊 Number** | Enter a medicine number → see its name and all symptoms |
| **📋 View All** | All medicines sorted A–Z, grouped by first letter |

### Key Behaviors
- **Medicine numbers** are assigned sequentially (1, 2, 3…) in order of addition
- **Duplicate handling** — adding an existing medicine name appends new symptoms to it
- **One symptom → many medicines** — searching "fever" might return `No. 2, 5, 9`
- **Partial search** — typing "head" matches "headache", "headache worse on motion", etc.
- **Export/Import** — manual JSON backup via Settings (works without cloud sync too)

---

## Files in This Folder

| File | Purpose |
|------|---------|
| `index.html` | The complete web app (single file, no dependencies) |
| `google-apps-script.js` | Backend code to paste into Google Apps Script |
| `README.md` | This setup guide |

---

## Troubleshooting

### Cloud sync not working?
- Make sure the URL starts with `https://script.google.com/`
- Re-deploy: Apps Script → Deploy → Manage deployments → edit → New version → Deploy
- Check that "Who has access" is set to **Anyone**

### Data lost after clearing cache?
- Open app → Settings → paste your Google Script URL → Click **Connect** → Click **⬇️ Pull from Cloud**

### App not loading on GitHub Pages?
- Ensure the file is named exactly `index.html`
- Wait 2–3 minutes after enabling Pages
- Check Settings → Pages → it should show a green checkmark

### Want to use on phone?
- Open the GitHub Pages URL in Chrome on Android
- Tap the **⋮ menu** → **"Add to Home Screen"**
- On iPhone: Safari → **Share** → **"Add to Home Screen"**
