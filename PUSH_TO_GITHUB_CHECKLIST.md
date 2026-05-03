# ✅ GitHub Push Checklist

Use this checklist before pushing to GitHub to ensure everything is safe and ready.

---

## 🔒 Security Check

### Step 1: Verify .gitignore is Working
```bash
git status
```

**✅ Should NOT see:**
- ❌ `.env.local`
- ❌ `node_modules/`
- ❌ `.next/`
- ❌ `*.log` files

**✅ Should see:**
- ✅ Source files (`app/`, `components/`, `lib/`, `models/`)
- ✅ Config files (`package.json`, `next.config.mjs`)
- ✅ Documentation (`*.md` files)
- ✅ `.env.example`

---

### Step 2: Check for Secrets
```bash
# Search for potential secrets in tracked files
git grep -i "password\|secret\|api_key\|token" -- ':!*.md' ':!.env.example'
```

**✅ Should only find:**
- Configuration examples in `.env.example`
- Documentation references
- Variable names (not actual values)

**❌ Should NOT find:**
- Actual passwords
- Real API keys
- Database credentials
- Secret tokens

---

### Step 3: Verify .env.local is Ignored
```bash
git check-ignore .env.local
```

**✅ Should output:** `.env.local` (means it's ignored)

---

## 📦 Files to Keep

### ✅ Source Code
- [ ] `app/` folder
- [ ] `components/` folder
- [ ] `lib/` folder
- [ ] `models/` folder
- [ ] `public/` folder

### ✅ Configuration
- [ ] `package.json`
- [ ] `package-lock.json`
- [ ] `next.config.mjs`
- [ ] `tailwind.config.ts` or `tailwind.config.js`
- [ ] `postcss.config.mjs`
- [ ] `jsconfig.json` or `tsconfig.json`
- [ ] `eslint.config.mjs`
- [ ] `.gitignore`
- [ ] `.env.example` (template only!)

### ✅ Documentation
- [ ] `README.md`
- [ ] `GETTING_STARTED.md`
- [ ] `MONGODB_SETUP.md`
- [ ] `CURRENT_STATUS.md`
- [ ] `FEATURES_WORKING.md`
- [ ] `GITHUB_PUSH_GUIDE.md`
- [ ] Other `.md` files

---

## 🗑️ Files to Delete/Ignore

### ❌ Already Ignored (Don't Need to Delete)
- [ ] `node_modules/` - Dependencies
- [ ] `.next/` - Build files
- [ ] `.env.local` - Your secrets
- [ ] `*.log` - Log files
- [ ] `.DS_Store` - Mac files

### ❌ Optional: Delete to Save Space
```bash
# These will be regenerated
rm -rf node_modules
rm -rf .next
rm -f *.log
```

---

## 🚀 Push Commands

### First Time Push

```bash
# 1. Initialize Git (if not done)
git init

# 2. Check what will be committed
git status

# 3. Add all files
git add .

# 4. Commit
git commit -m "Initial commit: E-commerce platform with Next.js"

# 5. Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### Subsequent Pushes

```bash
# 1. Check changes
git status

# 2. Add changes
git add .

# 3. Commit with message
git commit -m "Your descriptive message"

# 4. Push
git push
```

---

## ✅ Final Verification

Before pushing, verify:

### 1. No Secrets in Git
```bash
git ls-files | xargs grep -l "mongodb://.*@" || echo "✅ No MongoDB URIs found"
git ls-files | xargs grep -l "sk_live_\|pk_live_" || echo "✅ No Stripe keys found"
```

### 2. .env.example is Safe
```bash
cat .env.example
```
**✅ Should contain:**
- Placeholder values
- Example configurations
- No real secrets

### 3. README is Updated
```bash
cat README.md
```
**✅ Should contain:**
- Project description
- Installation instructions
- Your GitHub username (updated)
- Contact information (updated)

### 4. Size Check
```bash
du -sh .
```
**✅ Should be:**
- Without `node_modules/`: ~5-10 MB
- With `node_modules/`: ~200-300 MB

---

## 📋 Pre-Push Checklist

Copy this checklist and check off each item:

### Security
- [ ] `.env.local` is in `.gitignore`
- [ ] No secrets in tracked files
- [ ] `.env.example` has placeholder values only
- [ ] No API keys in code
- [ ] No passwords in code

### Files
- [ ] All source code is included
- [ ] `node_modules/` is ignored
- [ ] `.next/` is ignored
- [ ] Documentation is complete
- [ ] README.md is updated

### Configuration
- [ ] `.gitignore` is present
- [ ] `.env.example` is present
- [ ] `package.json` is present
- [ ] All config files are included

### Documentation
- [ ] README.md has installation instructions
- [ ] README.md has your GitHub username
- [ ] MONGODB_SETUP.md is included
- [ ] All documentation is up to date

### Testing
- [ ] Project builds successfully (`npm run build`)
- [ ] No console errors
- [ ] All pages load correctly

---

## 🎯 Quick Commands Reference

```bash
# Check what will be committed
git status

# Check what's ignored
git check-ignore -v node_modules .next .env.local

# See all tracked files
git ls-files

# Search for secrets
git grep -i "password\|secret\|api"

# Check repository size
du -sh .git

# Remove file from Git (if accidentally added)
git rm --cached filename
git commit -m "Remove sensitive file"
```

---

## ⚠️ If You Accidentally Committed Secrets

### Option 1: Remove from Last Commit
```bash
# If you just committed
git reset HEAD~1
# Remove the secret from the file
# Then commit again
```

### Option 2: Remove from History (Dangerous!)
```bash
# This rewrites history - use with caution
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env.local" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (overwrites remote)
git push origin --force --all
```

### Option 3: Use BFG Repo-Cleaner
```bash
# Download BFG from https://rtyley.github.io/bfg-repo-cleaner/
java -jar bfg.jar --delete-files .env.local
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push origin --force --all
```

**⚠️ After removing secrets:**
1. Rotate all exposed credentials
2. Change all passwords
3. Regenerate all API keys
4. Update all tokens

---

## ✅ You're Ready When:

- [ ] No secrets in tracked files
- [ ] `.gitignore` is working
- [ ] `.env.example` is safe
- [ ] Documentation is complete
- [ ] README is updated
- [ ] Project builds successfully
- [ ] All tests pass

---

## 🎉 Ready to Push!

If all checks pass, you're ready to push to GitHub safely!

```bash
git push origin main
```

**Happy Coding! 🚀**
