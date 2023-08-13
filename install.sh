#!/usr/bin/env bash
set -eu

curl https://sh.rustup.rs -sSf | sh -s -- -y 
source $HOME/.cargo/env 
cargo install wasm-pack 
rustup install stable
rustup target add wasm32-unknown-unknown
pnpm install
