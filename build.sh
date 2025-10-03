#!/bin/bash
# Clean build script for Vercel
cd frontend
rm -rf node_modules dist .vite
npm install
npm run build