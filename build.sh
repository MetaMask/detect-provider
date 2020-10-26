#!/usr/bin/env bash

set -u
set -e
set -o pipefail

BROWSERIFY_CMD="browserify -s detectEthereumProvider"

mkdir -p ./dist
rm -rf ./dist/*

tsc --project .

$BROWSERIFY_CMD dist/index.js > dist/detect-provider.js
$BROWSERIFY_CMD -p tinyify dist/index.js > dist/detect-provider.min.js
