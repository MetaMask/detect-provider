#!/usr/bin/env bash

set -u
set -e
set -o pipefail

BROWSERIFY_CMD="browserify -s detectEthereumProvider"

mkdir -p ./dist
rm -rf ./dist/*

$BROWSERIFY_CMD index.js > dist/detect-provider.js
$BROWSERIFY_CMD -g uglifyify index.js > dist/detect-provider.min.js
