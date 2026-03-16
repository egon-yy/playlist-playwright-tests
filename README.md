# Playlist Tests (Playwright)

Automated UI tests for the Playlist application using Playwright and the Page Object Model.

## Tech Stack

- Playwright
- TypeScript
- Page Object Model
- Fixtures
- dotenv for environment variables

---

# Project Setup

### 1. Clone repository

git clone <repo-url>

cd playlist-tests

---

### 2. Install dependencies

npm install

---

### 3. Install Playwright browsers

npx playwright install

---

### 4. Create environment variables

Create a `.env` file in the root of the project:

BASE_URL=https://vite-react-alpha-lemon.vercel.app

---

### 5. Run tests

Run all tests:

npx playwright test

Run tests in UI mode:

npx playwright test --ui

Run tests in headed mode:

npx playwright test --headed

---

# Project Structure

tests/  
→ test files

pages/  
→ Page Object classes

fixtures/  
→ custom Playwright fixtures

utils/  
→ helper functions (e.g., duration calculations)

playwright.config.ts  
→ Playwright configuration

---

# Environment Variables

The project uses `.env` to store environment-specific configuration.

Example:

BASE_URL=https://main-page.com

The variable is used in `playwright.config.ts` as the base URL for tests.

---

# Implemented Tests

- Search filtering for tracks
- Adding tracks to playlist
- Moving tracks from general list to playlist
- Playlist duration calculation validation
