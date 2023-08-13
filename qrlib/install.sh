#! /bin/bash

if [ -n "$VERCEL" ]; then

    if ! command -v rustup &>/dev/null; then
        echo "Rustup is not installed. Installing Rustup..."
        curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -y
        rustup target add wasm32-unknown-unknown
    fi

    if ! command -v wasm-pack &>/dev/null; then
        echo "wasm-pack is not installed. Installing wasm-pack..."
        curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh -s -- -f
    fi

    echo "Updating all installed packages..."
    cargo install-update -a

fi
