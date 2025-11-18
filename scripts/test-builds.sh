#!/bin/bash
# Quick build test for all variants

echo "🏗️  Testing Build Process for All Variants"
echo "=========================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

BUILD_ERRORS=0

# Function to test build for a variant
test_variant_build() {
    local variant=$1
    local variant_name=$2

    echo -e "${BLUE}📦 Testing: $variant_name${NC}"
    echo "---"

    if [ ! -d "$variant" ]; then
        echo -e "${RED}✗${NC} Directory not found: $variant"
        ((BUILD_ERRORS++))
        echo ""
        return 1
    fi

    cd "$variant" || exit 1

    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        echo "  Installing dependencies..."
        if npm install --silent > /dev/null 2>&1; then
            echo -e "  ${GREEN}✓${NC} Dependencies installed"
        else
            echo -e "  ${RED}✗${NC} Dependency installation failed"
            ((BUILD_ERRORS++))
            cd ..
            echo ""
            return 1
        fi
    else
        echo -e "  ${GREEN}✓${NC} Dependencies already installed"
    fi

    # Clean previous build
    if [ -d "dist" ]; then
        rm -rf dist
        echo "  🧹 Cleaned previous build"
    fi

    # Run build
    echo "  🔨 Building..."
    if npm run build > /tmp/build-${variant}.log 2>&1; then
        echo -e "  ${GREEN}✓${NC} Build successful"

        # Check dist directory
        if [ -d "dist" ]; then
            DIST_SIZE=$(du -sh dist | cut -f1)
            echo -e "  ${GREEN}✓${NC} Output directory created (Size: $DIST_SIZE)"

            # Check for index.html
            if [ -f "dist/index.html" ]; then
                echo -e "  ${GREEN}✓${NC} index.html exists"
            else
                echo -e "  ${RED}✗${NC} index.html missing"
                ((BUILD_ERRORS++))
            fi

            # Count assets
            JS_COUNT=$(find dist -name "*.js" | wc -l)
            CSS_COUNT=$(find dist -name "*.css" | wc -l)
            echo "  📊 Assets: $JS_COUNT JS files, $CSS_COUNT CSS files"
        else
            echo -e "  ${RED}✗${NC} dist directory not created"
            ((BUILD_ERRORS++))
        fi
    else
        echo -e "  ${RED}✗${NC} Build failed"
        echo "  📋 Build log: /tmp/build-${variant}.log"
        echo "  Last 10 lines of error:"
        tail -10 /tmp/build-${variant}.log | sed 's/^/    /'
        ((BUILD_ERRORS++))
    fi

    cd ..
    echo ""
}

# Test all variants
test_variant_build "variant-a-medieval" "Medieval Scholar 🏰"
test_variant_build "variant-b-gamer" "Neon Gamer 🎮"
test_variant_build "variant-c-museum" "Museum Guide 🏛️"

# Summary
echo "=========================================="
echo "📊 Build Test Summary"
echo "=========================================="

if [ $BUILD_ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ Success!${NC} All variants built successfully! 🎉"
    echo ""
    echo "Next steps:"
    echo "  1. Test locally: npm run dev:medieval (or :gamer/:museum)"
    echo "  2. Run validation: bash scripts/validate-setup.sh"
    echo "  3. Deploy: vercel (or netlify deploy)"
    echo ""
    exit 0
else
    echo -e "${RED}✗ Failed!${NC} $BUILD_ERRORS error(s) found."
    echo ""
    echo "Check the build logs in /tmp/ for details."
    echo "Common fixes:"
    echo "  - Run: npm run clean && npm run install:all"
    echo "  - Check Node.js version: node --version (need >= 18)"
    echo "  - Check for TypeScript errors"
    echo ""
    exit 1
fi
