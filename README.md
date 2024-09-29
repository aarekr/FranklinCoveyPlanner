# Franklin Covey Planner

Time management application

| Function             | Tool          |
|----------------------|---------------|
| Frontend             | React         |
| Backend              | Node.js       |
| Database             | MongoDB       |
| UI-framework         | Bootstrap     |
| Frontend testing     | Vitest        |
| Backend testing      | SuperTest     |
| End-to-end testing   | Playwright    |


## Testing
#### Frontend:
* Vitest:
```bash
npm test
```
* Vitest UI (recommended):
```bash
npm run test:ui
```
* Coverage:
```bash
npm run coverage
```

#### Backend:
* SuperTest:
```bash
npm test
```

#### End-to-end: Playwright
* Run tests in playwright directory with:
```bash
npm test -- --project chromium
```
* Create report with:
```bash
npx playwright show-report
```

## Lint
* Run ESLint with:
```bash
npm run lint
```
