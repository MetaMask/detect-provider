#!/usr/bin/env bash

set -u
set -e
set -o pipefail

BROWSERIFY_CMD="browserify -s detectEthereumProvider"

mkdir -p ./dist
rm -rf ./dist/*

tsc --project . --outDir dist

$BROWSERIFY_CMD -p esmify dist/index.js > dist/detect-provider.js
$BROWSERIFY_CMD -p esmify -p tinyify dist/index.js > dist/detect-provider.min.js
