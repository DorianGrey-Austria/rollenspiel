# 🛠️ Scripts Directory

Helper scripts for validation, testing, and deployment.

## Available Scripts

### 1. `validate-setup.sh`
**Purpose:** Validate the project setup before deployment

**Usage:**
```bash
bash scripts/validate-setup.sh
```

**What it checks:**
- ✅ Node.js and npm versions
- ✅ All 3 variants exist and are configured
- ✅ API endpoints present
- ✅ Shared library structure
- ✅ Deployment configs (vercel.json, netlify.toml)
- ✅ Documentation files
- ✅ PWA manifests and Service Worker
- ✅ Git repository status

**Exit codes:**
- `0` - Success (no errors)
- `> 0` - Number of errors found

**Output:**
- Green ✓ - Check passed
- Yellow ⚠ - Warning (non-critical)
- Red ✗ - Error (must fix)

---

### 2. `test-builds.sh`
**Purpose:** Test if all variants build successfully

**Usage:**
```bash
bash scripts/test-builds.sh
```

**What it does:**
1. Installs dependencies for each variant (if needed)
2. Cleans previous builds
3. Runs production builds
4. Validates build outputs
5. Reports bundle sizes

**Exit codes:**
- `0` - All builds successful
- `1` - One or more builds failed

**Build logs:**
- Saved to `/tmp/build-variant-*.log`
- Check these if a build fails

---

### 3. `pre-deploy-checklist.md`
**Purpose:** Complete checklist before deploying to production

**Usage:**
- Open in text editor
- Go through each item step-by-step
- Check off completed items

**Sections:**
1. Local Validation
2. Environment Setup
3. Local Testing
4. Build Verification
5. Git & Version Control
6. Documentation Review
7. Deployment Platform Setup
8. Post-Deployment Testing
9. Monitoring & Analytics
10. Security Check
11. Final Checks

---

## Quick Start Workflow

### Before First Deployment

```bash
# 1. Validate setup
bash scripts/validate-setup.sh

# 2. Fix any errors from validation
# (if errors found)

# 3. Test builds
bash scripts/test-builds.sh

# 4. Follow deployment checklist
# Open scripts/pre-deploy-checklist.md
```

### Expected Output (Success)

**validate-setup.sh:**
```
🔍 Rollenspiel.ai - Setup Validation
====================================
✓ Node.js version: v18.x.x
✓ npm version: 9.x.x
✓ All variants found
✓ API endpoints present
...
📊 Validation Summary
✓ Perfect! No errors or warnings.
  Your project is ready for deployment! 🚀
```

**test-builds.sh:**
```
🏗️  Testing Build Process for All Variants
==========================================
📦 Testing: Medieval Scholar 🏰
  ✓ Dependencies installed
  ✓ Build successful
  ✓ Output directory created (Size: 542K)
...
📊 Build Test Summary
✓ Success! All variants built successfully! 🎉
```

---

## Troubleshooting

### "Permission denied" error
```bash
# Make scripts executable
chmod +x scripts/*.sh
```

### Validation finds errors
- Check error messages carefully
- Most common: missing dependencies
- Fix: `npm run install:all`

### Build fails
- Check Node.js version: `node --version` (need >= 18)
- Clean and reinstall:
  ```bash
  npm run clean
  npm run install:all
  npm run build
  ```

### Git push fails (504 error)
- This is a network/proxy issue, not your code
- All commits are safe locally
- Retry later or check network settings

---

## Adding New Scripts

To add a new script to this directory:

1. **Create the script file:**
   ```bash
   touch scripts/my-script.sh
   ```

2. **Make it executable:**
   ```bash
   chmod +x scripts/my-script.sh
   ```

3. **Add documentation here:**
   - Update this README.md
   - Describe what the script does
   - Add usage examples

4. **Use consistent formatting:**
   - Add colored output (GREEN, RED, YELLOW)
   - Clear error messages
   - Helpful exit codes

---

## Script Development Guidelines

### Colors
```bash
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}✓${NC} Success message"
echo -e "${RED}✗${NC} Error message"
echo -e "${YELLOW}⚠${NC} Warning message"
```

### Exit Codes
- `0` = Success
- `1-255` = Error (number can indicate error count)

### Error Handling
```bash
if command; then
    echo "Success"
else
    echo "Failed"
    exit 1
fi
```

---

## Integration with CI/CD

These scripts can be used in GitHub Actions:

```yaml
# .github/workflows/validate.yml
- name: Validate Setup
  run: bash scripts/validate-setup.sh

- name: Test Builds
  run: bash scripts/test-builds.sh
```

---

**Happy scripting! 🚀**
