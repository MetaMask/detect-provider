# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.1]
### Uncategorized
- Bump @metamask/auto-changelog from 3.2.0 to 3.3.0 ([#88](https://github.com/MetaMask/detect-provider/pull/88))
- Bump word-wrap from 1.2.3 to 1.2.4 ([#85](https://github.com/MetaMask/detect-provider/pull/85))
- Bump @metamask/auto-changelog from 3.1.0 to 3.2.0 ([#84](https://github.com/MetaMask/detect-provider/pull/84))
- Bump semver from 5.7.1 to 5.7.2 ([#83](https://github.com/MetaMask/detect-provider/pull/83))
- Bump json5 from 1.0.1 to 1.0.2 ([#67](https://github.com/MetaMask/detect-provider/pull/67))
- fix example code in readme ([#65](https://github.com/MetaMask/detect-provider/pull/65))
- Bump minimatch from 3.0.4 to 3.1.2 ([#64](https://github.com/MetaMask/detect-provider/pull/64))
- Bump @metamask/auto-changelog from 3.0.0 to 3.1.0 ([#63](https://github.com/MetaMask/detect-provider/pull/63))
- Bump @metamask/auto-changelog from 2.6.1 to 3.0.0 ([#62](https://github.com/MetaMask/detect-provider/pull/62))
- Add `prepublishOnly` script ([#61](https://github.com/MetaMask/detect-provider/pull/61))

## [2.0.0]
### Changed
- **BREAKING:** Bump minimum required Node version to 14 ([#137](https://github.com/MetaMask/eth-json-rpc-middleware/pull/137))
- Shore up MetaMaskEthereumProvider type with EventEmitter methods ([#41](https://github.com/MetaMask/detect-provider/pull/41))
- Remove global type augmentation for `window.ethereum` so that it can be assigned its own type outside of `detectEthereumProvider` ([#30](https://github.com/MetaMask/detect-provider/pull/30))

### Fixed
- Include source code in source maps to prevent build errors ([#46](https://github.com/MetaMask/detect-provider/pull/46))

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

[Unreleased]: https://github.com/MetaMask/detect-provider/compare/v2.0.1...HEAD
[2.0.1]: https://github.com/MetaMask/detect-provider/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/MetaMask/detect-provider/compare/v1.2.0...v2.0.0
[1.2.0]: https://github.com/MetaMask/detect-provider/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/MetaMask/detect-provider/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/MetaMask/detect-provider/releases/tag/v1.0.1
