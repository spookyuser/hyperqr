#!/usr/bin/env bash
set -eu

if [ "$VERCEL_ENV" != "production" ]; then
  echo "This script is for installing on vercel 💁‍♀️"
  exit 1
fi

# Exit if wasm-pack is already installed
if [ -x "$(command -v wasm-pack)" ]; then
  echo "wasm-pack is already installed"
  exit 0
fi

pnm install -g wasm-pack