# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [1.0.0] - 2026-02-08

### Added
- Initial release of the Banking Dashboard
- Transaction management (create, edit, clone, delete)
- Deposit and withdrawal support
- Balance, income, expenses and total transactions overview
- Undo / Redo functionality (UI buttons + keyboard shortcuts)
- Search, filters and pagination for transactions
- CSV export and import with validation and deduplication
- Modal-based transaction creation and editing
- Settings modal with:
  - Language selection (Spanish, English, French)
  - Theme selection (System, Light, Dark)
- Dark mode support with system preference handling
- Mobile-first responsive UI
- Toast notifications for user feedback
- LocalStorage persistence for transactions and preferences
- Accessibility improvements (keyboard navigation, focus management, visual indicators)

### Changed
- Centralized business logic using Redux selectors
- Improved balance calculation using derived state
- Improved validation rules for transactions
- Improved UX when filters hide newly created transactions

### Fixed
- Theme override issues when switching system appearance
- Duplicate transactions on CSV import
- Invalid CSV format handling
- Edge cases in amount and date validation

### Tested
- Unit tests for reducers and selectors
- Integration tests for transaction flows
- Testing setup using Vitest and Testing Library

---