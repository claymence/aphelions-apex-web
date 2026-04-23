#!/bin/bash
set -e

echo "→ Updating repository..."
git fetch origin

# Check if anything actually changed
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" = "$REMOTE" ]; then
    echo "Already up to date."
    exit 0
fi

CHANGED=$(git diff --name-only HEAD origin/main)
git reset --hard origin/main

echo "→ Checking dependencies..."
if echo "$CHANGED" | grep -q "package-lock.json"; then
    echo "→ package-lock.json changed, running npm ci..."
    npm ci
else
    echo "→ No dependency changes, skipping npm ci."
fi

echo "→ Building project..."
NODE_OPTIONS="--max-old-space-size=512" npm run build

echo "→ Restarting PM2 app..."
pm2 restart clay-sveltekit || pm2 start ecosystem.config.cjs

echo "→ Saving PM2 state..."
pm2 save

echo "✅ Deployment complete."
