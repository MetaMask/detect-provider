# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- **BREAKING:** Removed support for Node v12 in favor of v14 ([#137](https://github.com/MetaMask/eth-json-rpc-middleware/pull/137))

## [2.0.0]
### Fixed
- Include source code in source maps to prevent build errors ([#46](https://github.com/MetaMask/detect-provider/pull/46))

### Changed
- Shore up MetaMaskEthereumProvider type with EventEmitter methods ([#41](https://github.com/MetaMask/detect-provider/pull/41))
- Remove global type augmentation for `window.ethereum` so that it can be assigned its own type outside of `detectEthereumProvider` ([#30](https://github.com/MetaMask/detect-provider/pull/30))
- **BREAKING:** Update minimum required Node version to 12.x ([#25](https://github.com/MetaMask/detect-provider/pull/25))

## [1.2.0] - 2020-10-26
### Added
- TypeScript types
  - Internally, the project was converted to TypeScript.

## [1.1.0] - 2020-06-30
### Added
- Silent mode to suppress `console.error` calls

## [1.0.1] - 2020-06-24
### Added
- Initial stable release.

[Unreleased]: https://github.com/MetaMask/detect-provider/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/MetaMask/detect-provider/compare/v1.2.0...v2.0.0
[1.2.0]: https://github.com/MetaMask/detect-provider/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/MetaMask/detect-provider/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/MetaMask/detect-provider/releases/tag/v1.0.1
