#!/usr/bin/env bash

set -u
set -e
set -o pipefail

BROWSERIFY_PATH="./node_modules/browserify/bin/cmd.js"
BROWSERIFY_CMD="node ${BROWSERIFY_PATH} -s detectEthereumProvider"

mkdir -p ./dist
rm -rf ./dist/*

$BROWSERIFY_CMD index.js > dist/detect-provider.js
$BROWSERIFY_CMD -g uglifyify index.js > dist/detect-provider.min.js
