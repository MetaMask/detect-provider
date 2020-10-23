#!/usr/bin/env bash

set -u
set -e
set -o pipefail

BROWSERIFY_CMD="browserify -s detectEthereumProvider"

mkdir -p ./dist
rm -rf ./dist/*

$BROWSERIFY_CMD src/index.js > dist/detect-provider.js
$BROWSERIFY_CMD -p tinyify src/index.js > dist/detect-provider.min.js
