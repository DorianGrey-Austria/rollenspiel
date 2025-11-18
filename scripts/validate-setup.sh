#!/bin/bash
# Validation script to check if the project is ready for deployment

echo "🔍 Rollenspiel.ai - Setup Validation"
echo "===================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Check Node.js version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -ge 18 ]; then
    echo -e "${GREEN}✓${NC} Node.js version: $(node --version)"
else
    echo -e "${RED}✗${NC} Node.js version too old. Need >= 18, got: $(node --version)"
    ((ERRORS++))
fi
echo ""

# Check npm version
echo "📦 Checking npm version..."
NPM_VERSION=$(npm --version | cut -d'.' -f1)
if [ "$NPM_VERSION" -ge 9 ]; then
    echo -e "${GREEN}✓${NC} npm version: $(npm --version)"
else
    echo -e "${RED}✗${NC} npm version too old. Need >= 9, got: $(npm --version)"
    ((ERRORS++))
fi
echo ""

# Check if variants exist
echo "🎨 Checking variants..."
for variant in "variant-a-medieval" "variant-b-gamer" "variant-c-museum"; do
    if [ -d "$variant" ]; then
        echo -e "${GREEN}✓${NC} Found: $variant"

        # Check if package.json exists
        if [ -f "$variant/package.json" ]; then
            echo -e "  ${GREEN}✓${NC} package.json exists"
        else
            echo -e "  ${RED}✗${NC} package.json missing"
            ((ERRORS++))
        fi

        # Check if src exists
        if [ -d "$variant/src" ]; then
            echo -e "  ${GREEN}✓${NC} src directory exists"
        else
            echo -e "  ${RED}✗${NC} src directory missing"
            ((ERRORS++))
        fi

        # Check if vite.config.ts exists
        if [ -f "$variant/vite.config.ts" ]; then
            echo -e "  ${GREEN}✓${NC} vite.config.ts exists"
        else
            echo -e "  ${RED}✗${NC} vite.config.ts missing"
            ((ERRORS++))
        fi
    else
        echo -e "${RED}✗${NC} Missing: $variant"
        ((ERRORS++))
    fi
done
echo ""

# Check API directory
echo "🔌 Checking API endpoints..."
if [ -d "api" ]; then
    echo -e "${GREEN}✓${NC} API directory exists"

    # Check specific endpoints
    for endpoint in "api/story/generate.ts" "api/location/geocode.ts" "api/location/reverse.ts"; do
        if [ -f "$endpoint" ]; then
            echo -e "  ${GREEN}✓${NC} $endpoint"
        else
            echo -e "  ${RED}✗${NC} $endpoint missing"
            ((ERRORS++))
        fi
    done
else
    echo -e "${RED}✗${NC} API directory missing"
    ((ERRORS++))
fi
echo ""

# Check shared directory
echo "📚 Checking shared library..."
if [ -d "shared" ]; then
    echo -e "${GREEN}✓${NC} Shared directory exists"

    # Check subdirectories
    for dir in "shared/components" "shared/hooks" "shared/utils" "shared/constants" "shared/types"; do
        if [ -d "$dir" ]; then
            echo -e "  ${GREEN}✓${NC} $dir"
        else
            echo -e "  ${YELLOW}⚠${NC} $dir missing (optional)"
            ((WARNINGS++))
        fi
    done
else
    echo -e "${YELLOW}⚠${NC} Shared directory missing (optional but recommended)"
    ((WARNINGS++))
fi
echo ""

# Check deployment configs
echo "🚀 Checking deployment configs..."
if [ -f "vercel.json" ]; then
    echo -e "${GREEN}✓${NC} vercel.json exists"
else
    echo -e "${YELLOW}⚠${NC} vercel.json missing"
    ((WARNINGS++))
fi

if [ -f "netlify.toml" ]; then
    echo -e "${GREEN}✓${NC} netlify.toml exists"
else
    echo -e "${YELLOW}⚠${NC} netlify.toml missing"
    ((WARNINGS++))
fi

if [ -f ".env.example" ]; then
    echo -e "${GREEN}✓${NC} .env.example exists"
else
    echo -e "${YELLOW}⚠${NC} .env.example missing"
    ((WARNINGS++))
fi
echo ""

# Check documentation
echo "📖 Checking documentation..."
for doc in "README.md" "ROADMAP.md" "DEPLOYMENT.md" "INSTALLATION.md"; do
    if [ -f "$doc" ]; then
        echo -e "${GREEN}✓${NC} $doc"
    else
        echo -e "${YELLOW}⚠${NC} $doc missing"
        ((WARNINGS++))
    fi
done
echo ""

# Check PWA files
echo "📱 Checking PWA support..."
PWA_COUNT=0
for variant in "variant-a-medieval" "variant-b-gamer" "variant-c-museum"; do
    if [ -f "$variant/public/manifest.json" ]; then
        ((PWA_COUNT++))
    fi
done

if [ "$PWA_COUNT" -eq 3 ]; then
    echo -e "${GREEN}✓${NC} All variants have PWA manifests"
elif [ "$PWA_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}⚠${NC} Only $PWA_COUNT/3 variants have PWA manifests"
    ((WARNINGS++))
else
    echo -e "${YELLOW}⚠${NC} No PWA manifests found"
    ((WARNINGS++))
fi

if [ -f "shared/sw.js" ]; then
    echo -e "${GREEN}✓${NC} Service Worker exists"
else
    echo -e "${YELLOW}⚠${NC} Service Worker missing"
    ((WARNINGS++))
fi
echo ""

# Check git status
echo "📝 Checking git status..."
if git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Git repository initialized"

    # Check for uncommitted changes
    if [ -z "$(git status --porcelain)" ]; then
        echo -e "${GREEN}✓${NC} No uncommitted changes"
    else
        echo -e "${YELLOW}⚠${NC} Uncommitted changes detected"
        ((WARNINGS++))
    fi

    # Check commits
    COMMIT_COUNT=$(git rev-list --count HEAD)
    echo -e "${GREEN}✓${NC} Total commits: $COMMIT_COUNT"
else
    echo -e "${RED}✗${NC} Not a git repository"
    ((ERRORS++))
fi
echo ""

# Summary
echo "===================================="
echo "📊 Validation Summary"
echo "===================================="
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✓ Perfect!${NC} No errors or warnings."
    echo "  Your project is ready for deployment! 🚀"
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠ ${WARNINGS} warning(s)${NC} found, but no critical errors."
    echo "  Your project should work, but consider addressing warnings."
else
    echo -e "${RED}✗ ${ERRORS} error(s)${NC} and ${YELLOW}${WARNINGS} warning(s)${NC} found."
    echo "  Please fix errors before deploying."
fi
echo ""

exit $ERRORS
