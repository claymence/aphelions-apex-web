#!/bin/bash

set -e

echo "→ Updating repository..."
git fetch origin
git reset --hard origin/main

echo "→ Installing dependencies..."
npm ci

echo "→ Building project..."
npm run build

echo "→ Restarting PM2 app..."
pm2 restart aphelions-apex-web || pm2 start ecosystem.config.cjs

echo "→ Saving PM2 state..."
pm2 save

echo "✅ Deployment complete."
