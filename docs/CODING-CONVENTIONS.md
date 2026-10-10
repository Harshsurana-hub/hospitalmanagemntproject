# Coding conventions

## Reference examples

Reference: [understand-crud-/crud.html](https://github.com/anshurajbisoyi98-ctrl/understand-crud-/blob/main/crud.html), inspected on 10 October 2026. The repository has one HTML study guide and a README; the guide contains 17 code blocks. These are evidence of the demonstrated style, not a complete original application or proof of authorship. No React examples are supplied, so frontend conventions below are adaptations.

- Guide section 5: CommonJS imports, explicit Express setup and route mounting.
- Guide section 7: config/db.js and async database operations.
- Guide sections 9–12: named operations grouped in a controller object.
- Guide section 13: arrow middleware using req, res and next.
- Local exemplars: backend/src/routes/healthRoutes.js, controllers/healthController.js, config/db.js, frontend/src/pages/Home.jsx.

## Naming and control flow

Use double quotes, semicolons, four-space indentation and explicit blocks. Put imports first, logic next and exports last. Backend uses require/module.exports; frontend and Vite retain ES imports/exports. Prefer arrow functions and async/await with readable try/catch blocks. Keep components' JSX expanded across lines.

Routes select named controller functions; controllers decide responses; models define data; config/db.js connects to MongoDB; middleware enforces permissions and handles errors. Use Book/User/Borrowing model names and bookRoutes/bookController-style modules when features are implemented. Preserve the agreed API response format and route names.

React uses controlled inputs, useState and useEffect for API synchronization. Abort abandoned effect requests. Keep state names descriptive; share request behavior through services/api.js. Keep server startup separate from app construction so tests can use an ephemeral port without connecting to Atlas.

## Patterns to avoid

Do not port EJS rendering into the required React client. Do not delete through GET requests, save unfiltered request bodies, hardcode database credentials, leave authentication as a pass-through stub, disable error middleware or log secrets/raw database errors. Those are limitations identified in the reference guide, not conventions to reproduce.

Keep validation, proper HTTP methods, backend authorization, environment settings and transactional borrowing requirements. Do not add unused placeholder modules or extra abstractions. No feature ownership or issue acceptance criteria change through this style update.

## Second reference: MERN application patterns

Reviewed [understandcrudprojects2/index.html](https://github.com/anshurajbisoyi98-ctrl/understandcrudprojects2/blob/736c09a9455dd55a7aecc41f9d73485c77661afe/index.html) at revision 736c09a9455dd55a7aecc41f9d73485c77661afe. This is a study guide about HuXn-WebDev/MERN-E-Commerce-Store, not the original application's source tree. It uses ES modules; the library backend retains the already established CommonJS convention to keep this project consistent.

Apply its shared patterns within the existing library scope:

- Modules 1 and 6: register JSON parsing before routes, authentication before administrator authorization, and error middleware last. Keep routes small and let controllers perform operations.
- Modules 2 and 5: explicit required/type/trim/default validation, timestamps, unique indexes and references between models. Handle duplicate-key races even after an existence check. Borrowing references User and Book; model implementation remains assigned feature work.
- Modules 3 and 4: separate identity and permission checks, hash/compare passwords, verify token expiry, exclude password hashes, and always return a response for invalid credentials or missing users. Existing proposed bearer-token contract remains in place; cookie authentication would require coordinated API, CORS and deployment changes before adoption.
- Modules 8 and 9: separate pages, reusable components and shared API access; keep server data distinct from session/UI state and refresh affected records after mutations. Use the assignment's useState/useEffect and Fetch approach.
- Module 7: route errors through centralized handling with safe public messages. Express 5 automatically forwards rejected promises from returned async handlers; no asyncHandler wrapper is needed. For callback errors use next(err). If headers were already sent, delegate to the next error handler rather than attempting a second response. See [Express error handling](https://expressjs.com/en/guide/error-handling/).

Redux Toolkit, RTK Query, Tailwind, uploads and payment processing are outside the library's agreed stack/scope. Do not copy the guide's raw-error response wrapper or incomplete failed-login path. These references inform coding structure; they do not change feature ownership or create new features.
