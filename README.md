# Banking Dashboard – Frontend Technical Assessment

This project is a frontend-focused banking dashboard built as part of a technical assessment.
It demonstrates a scalable React architecture, solid state management, accessibility, testing, and real-world UX considerations.


## 🚀 Tech Stack

<b>Core</b>
* Vite – fast development & build tooling
* React 18
* TypeScript
* ESLint
* Prettier

<b>UI & Styling</b>
* HeroUI – accessible component library
* TailwindCSS – utility-first styling
* Tabler Icons – consistent iconography
* Dark mode support

<b>State Management</b>
* Redux Toolkit
* Selectors for derived data
* Undo / Redo support
* LocalStorage persistence

<b>Internationalization</b>
* i18next
* Language switcher (ES / EN / FR)
* Persisted language preference

<b>Testing</b>
* Vitest
* @testing-library/react
* Unit tests (reducers, selectors)
* Integration tests (user flows)

## 🖥️ System Requirements

To run this project locally, you need the following tools installed on your system:

<b>Required</b>
* Node.js >= 18
    * Download: https://nodejs.org/
    * Used to run the development server, build the project and execute tests
* npm >= 9
    * Comes bundled with Node.js
    * Used as the package manager

<b>Recommended</b>
* Git
    * Download: https://git-scm.com/
    * Used for version control
* Modern browser
    * Chrome, Edge, Firefox or Safari
    * Required for proper support of modern JavaScript and CSS features

## 🔗 Main Libraries & Tools
* Vite
https://vitejs.dev/
* React
https://react.dev/
* Redux Toolkit
https://redux-toolkit.js.org/
* HeroUI
https://www.heroui.com/
* TailwindCSS
https://tailwindcss.com/
* i18next
https://www.i18next.com/
* Vitest
https://vitest.dev/
* Testing Library
https://testing-library.com/


## 📦 Features

<b>Transactions</b>
* Create, edit, clone and delete transactions
* Deposit / Withdrawal handling
* Balance, income and expenses calculation
* Validation rules
* Insufficient balance protection
* Undo / Redo (keyboard + UI)

<b>Filters & Search</b>
* Search by description
* Filter by:
    * Type (Deposit / Withdrawal)
    * Date range
    * Amount range
* Pagination
* Visual indicator when filters are active
* User feedback when new transactions are hidden by filters

<b>Import / Export</b>
* CSV export
* CSV import with:
    * Date normalization
    * Case-insensitive type parsing
    * Deduplication (date + description)
    * Error handling
    * Loading state for large imports

<b>UI / UX</b>
* Mobile-first, responsive layout
* Keyboard shortcuts
* Accessible components
* Toast notifications
* Clear error and validation feedback

## 🧠 Architecture Highlights
* Redux selectors used for:
    * Balance summary
    * Pagination
    * Filters
    * Derived state
* No business logic inside components
* Side-effects isolated
* Predictable state flow
* Scalable folder structure

## 🧪 Testing Strategy
* Unit tests
* Redux reducers
* Selectors
* Integration tests
* Creating transactions
* Rendering filtered results
* Tests run with a simulated DOM (jsdom)
* No backend required

Run tests:
```bash
npm run test
```

## 🗂️ Persistence
* Transactions stored in LocalStorage
* Theme & language preferences persisted
* State restored on reload


## 🌗 Theme Handling
* Three modes:
    * System
    * Light
    * Dark
* Manual mode overrides system preference
* Clean listener management for prefers-color-scheme


## 🛠️ Project Setup

Install dependencies
```bash
npm i
```
Start development server
```bash
npm run dev
```
Run tests
```bash
npm run test
```
Build for production
```bash
npm run build
```

## ♿ Accessibility
* Keyboard navigable UI
* Proper labels and ARIA usage via HeroUI
* Clear focus states
* Color contrast respected
* Feedback not relying only on color

## 📌 Notes
* This is a frontend-only project by design
* No backend is required
* All data handling is client-side
* Emphasis is placed on:
    * Code quality
    * UX
    * Maintainability
    * Real-world edge cases

## ✅ What This Project Demonstrates
* Senior-level React & TypeScript usage
* Realistic product decisions
* Clean separation of concerns
* Strong UX and accessibility awareness
* Production-minded frontend architecture