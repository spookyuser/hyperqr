#! /bin/bash

if [ -n "$VERCEL" ]; then

    if ! command -v rustup &>/dev/null; then
        echo "Rustup is not installed. Installing Rustup..."
        curl https://sh.rustup.rs -sSf | sh -s -- -y
        source "$HOME/.cargo/env"
        rustup target add wasm32-unknown-unknown
    fi

    if ! command -v wasm-pack &>/dev/null; then
        echo "wasm-pack is not installed. Installing wasm-pack..."
        curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh -s -- -f
        source "$HOME/.cargo/env"
    fi

    echo "Updating all installed packages..."
    cargo install cargo-update
    cargo install-update -a

fi
