# GitHub issue roadmap

Sixteen meaningful issues are proposed: four per member. Aim for one focused PR per issue, reviewed and merged after its acceptance criteria pass. All sixteen issues have been created in the repository. The four team-lead issues are assigned to Anshu; the other twelve list planned owners but await collaborator access before GitHub assignment. No issues have been completed or merged.

This exceeds the assignment minimum of two meaningful merged PRs per member. The team target is four each (sixteen total). Completing or closing an issue alone does not count as a merged contribution; merging another person's PR does not count as authorship. Review another member's work and keep genuine ownership clear.

## Ownership summary

| Member | Proposed issues | Target |
| --- | --- | --- |
| Anshu Raj Bisoyi (Team Lead) | 1, 14, 15, 16 | Four meaningful merged PRs |
| Harsh Surana | 2, 4, 9, 10 | Four meaningful merged PRs |
| Dhruv Tomar | 3, 6, 8, 12 | Four meaningful merged PRs |
| Kiran Sinha | 5, 7, 11, 13 | Four meaningful merged PRs |

Existing foundation files do not establish member authorship or a merged PR. Anshu should review and understand the foundation before proposing it, and another member must review his PRs. Anshu controls remote issue creation, assignment, review decisions and merges.

## 1. Project foundation and environment configuration

- Type: feature; priority: P0; proposed owner: Anshu Raj Bisoyi.
- Problem: The project needs a reviewed, reproducible starting point.
- Scope and acceptance criteria: Maintain runnable React/Vite and Express foundations; validate environment configuration; provide safe health/error responses and ignored environment examples.
- Exclusions: unrelated features, taking over another member's issue, and remote actions without maintainer authorization.
- Relevant modules: Root manifests, frontend entry/routing, backend configuration and server.
- Dependencies: None.
- Testing requirements: Build frontend; test missing/invalid configuration, unavailable database and malformed JSON.
- Definition of done: acceptance criteria met; evidence recorded; API/setup documentation updated where needed; focused PR linked to its issue; independent review and maintainer merge completed.

## 2. Authentication API and user model

- Type: feature; priority: P0; proposed owner: Harsh Surana.
- Problem: This required capability or its verification is missing.
- Scope and acceptance criteria: Register Users with normalized unique email and hashed passwords; login returns an expiring signed token and safe user details; reject client-supplied roles.
- Exclusions: unrelated features, taking over another member's issue, and remote actions without maintainer authorization.
- Relevant modules: backend User model, auth controllers/routes.
- Dependencies: 1.
- Testing requirements: Registration/login success; invalid input/credentials; duplicate email; role escalation; password hash never returned.
- Definition of done: acceptance criteria met; evidence recorded; API/setup documentation updated where needed; focused PR linked to its issue; independent review and maintainer merge completed.

## 3. Book model and catalog read API

- Type: feature; priority: P0; proposed owner: Dhruv Tomar.
- Problem: This required capability or its verification is missing.
- Scope and acceptance criteria: Define validated Book schema and normalized unique ISBN; implement authenticated GET list and detail endpoints with consistent responses and invalid-ID handling.
- Exclusions: unrelated features, taking over another member's issue, and remote actions without maintainer authorization.
- Relevant modules: backend Book model, book read controllers/routes.
- Dependencies: 1, 2, 4.
- Testing requirements: Schema validation; list/detail; missing book; invalid ID; authenticated and unauthenticated requests.
- Definition of done: acceptance criteria met; evidence recorded; API/setup documentation updated where needed; focused PR linked to its issue; independent review and maintainer merge completed.

## 4. Authentication middleware and administrator bootstrap

- Type: feature; priority: P0; proposed owner: Harsh Surana.
- Problem: This required capability or its verification is missing.
- Scope and acceptance criteria: Verify token expiry/signature; implement authenticateUser and requireAdmin; provide explicit local Admin provisioning without public privilege escalation.
- Exclusions: unrelated features, taking over another member's issue, and remote actions without maintainer authorization.
- Relevant modules: backend middleware, local Admin bootstrap script.
- Dependencies: 2.
- Testing requirements: Missing/malformed/expired tokens; User/Admin permissions; safe bootstrap configuration and no password/token logging.
- Definition of done: acceptance criteria met; evidence recorded; API/setup documentation updated where needed; focused PR linked to its issue; independent review and maintainer merge completed.

## 5. Registration, login and session interface

- Type: feature; priority: P0; proposed owner: Kiran Sinha.
- Problem: This required capability or its verification is missing.
- Scope and acceptance criteria: Build controlled login/registration forms; attach tokens to API requests; implement logout and protected routing; handle expired sessions and useful errors.
- Exclusions: unrelated features, taking over another member's issue, and remote actions without maintainer authorization.
- Relevant modules: frontend auth pages, session state, API service.
- Dependencies: 2, 4.
- Testing requirements: Real registration/login; validation; refresh/logout behavior; expired-session handling; responsive forms.
- Definition of done: acceptance criteria met; evidence recorded; API/setup documentation updated where needed; focused PR linked to its issue; independent review and maintainer merge completed.

## 6. Protected book creation, editing and deletion API

- Type: feature; priority: P0; proposed owner: Dhruv Tomar.
- Problem: This required capability or its verification is missing.
- Scope and acceptance criteria: Implement Admin POST/PUT/DELETE with validated fields and server-managed availableCopies; preserve active-loan count when totalCopies changes; reject unsafe deletion. Coordinate inventory rules with borrowing owner.
- Exclusions: unrelated features, taking over another member's issue, and remote actions without maintainer authorization.
- Relevant modules: backend book mutation controllers/routes.
- Dependencies: 3, 4.
- Testing requirements: CRUD success/failure; 401/403; duplicate ISBN; invalid counts; deletion and inventory edits with active loans; race checks once borrowing is integrated.
- Definition of done: acceptance criteria met; evidence recorded; API/setup documentation updated where needed; focused PR linked to its issue; independent review and maintainer merge completed.

## 7. Book catalog and detail pages

- Type: feature; priority: P0; proposed owner: Kiran Sinha.
- Problem: This required capability or its verification is missing.
- Scope and acceptance criteria: Show authenticated book list and details including inventory; add navigation and loading/error/empty states; keep search controls for issue 12.
- Exclusions: unrelated features, taking over another member's issue, and remote actions without maintainer authorization.
- Relevant modules: frontend catalog/detail pages and reusable components.
- Dependencies: 3, 5.
- Testing requirements: Real API listing/details; missing book; failed requests; narrow-screen layout; direct route access.
- Definition of done: acceptance criteria met; evidence recorded; API/setup documentation updated where needed; focused PR linked to its issue; independent review and maintainer merge completed.

## 8. Book search and category filtering API

- Type: feature; priority: P0; proposed owner: Dhruv Tomar.
- Problem: This required capability or its verification is missing.
- Scope and acceptance criteria: Search by title, author, ISBN or category and support category filter; validate query types/length; treat search input as literal text; document combined-filter behavior.
- Exclusions: unrelated features, taking over another member's issue, and remote actions without maintainer authorization.
- Relevant modules: backend catalog query handling.
- Dependencies: 3.
- Testing requirements: Each search field; combined filters; empty results; invalid queries; special-character input and case handling.
- Definition of done: acceptance criteria met; evidence recorded; API/setup documentation updated where needed; focused PR linked to its issue; independent review and maintainer merge completed.

## 9. Transactional book issue API

- Type: feature; priority: P0; proposed owner: Harsh Surana.
- Problem: This required capability or its verification is missing.
- Scope and acceptance criteria: Allow Admin to select an existing User/book and due date; create borrowing and decrement stock in one transaction; reject unavailable books, invalid dates and duplicate active loans; expose minimal Admin-only borrower selection data.
- Exclusions: unrelated features, taking over another member's issue, and remote actions without maintainer authorization.
- Relevant modules: backend Borrowing model and issue controller/routes; borrower lookup.
- Dependencies: 3, 4, 6.
- Testing requirements: Atlas/replica-set tests: last-copy concurrency, duplicate active loan, invalid user/book/date, rollback and User denial.
- Definition of done: acceptance criteria met; evidence recorded; API/setup documentation updated where needed; focused PR linked to its issue; independent review and maintainer merge completed.

## 10. Transactional return and borrowing-record access API

- Type: feature; priority: P0; proposed owner: Harsh Surana.
- Problem: This required capability or its verification is missing.
- Scope and acceptance criteria: Allow Admin to return an issued loan once and restore stock transactionally; Admin sees all records, User sees own records; track issue/due/return dates and status.
- Exclusions: unrelated features, taking over another member's issue, and remote actions without maintainer authorization.
- Relevant modules: backend borrowing return/read controllers/routes.
- Dependencies: 9.
- Testing requirements: Concurrent and duplicate returns; rollback; missing/invalid loan ID; role and ownership isolation; correct stock after return.
- Definition of done: acceptance criteria met; evidence recorded; API/setup documentation updated where needed; focused PR linked to its issue; independent review and maintainer merge completed.

## 11. Librarian book-management forms

- Type: feature; priority: P0; proposed owner: Kiran Sinha.
- Problem: This required capability or its verification is missing.
- Scope and acceptance criteria: Implement controlled add/edit forms and confirmed deletion; validate fields; show backend conflicts; update catalog after successful actions; hide Admin controls for Users.
- Exclusions: unrelated features, taking over another member's issue, and remote actions without maintainer authorization.
- Relevant modules: frontend Admin book forms and mutation integration.
- Dependencies: 5, 6, 7.
- Testing requirements: Browser CRUD; invalid fields; ISBN conflict; active-loan deletion conflict; failed requests and User restrictions.
- Definition of done: acceptance criteria met; evidence recorded; API/setup documentation updated where needed; focused PR linked to its issue; independent review and maintainer merge completed.

## 12. Catalog search and filtering interface

- Type: feature; priority: P0; proposed owner: Dhruv Tomar.
- Problem: This required capability or its verification is missing.
- Scope and acceptance criteria: Connect title/author/ISBN/category search and category filtering to read API; retain accessible controlled inputs; show query-specific loading/error/empty states and avoid stale responses. Coordinate catalog file changes with Kiran.
- Exclusions: unrelated features, taking over another member's issue, and remote actions without maintainer authorization.
- Relevant modules: frontend catalog search/filter controls.
- Dependencies: 7, 8.
- Testing requirements: Each search field; combined/cleared filters; no results; rapid query changes; API failure; keyboard use.
- Definition of done: acceptance criteria met; evidence recorded; API/setup documentation updated where needed; focused PR linked to its issue; independent review and maintainer merge completed.

## 13. Borrowing and return interface

- Type: feature; priority: P0; proposed owner: Kiran Sinha.
- Problem: This required capability or its verification is missing.
- Scope and acceptance criteria: Admin selects borrower/book/due date, lists loans and returns them; Users view own loans; refresh inventory after success and show duplicate-return/unavailable-book errors.
- Exclusions: unrelated features, taking over another member's issue, and remote actions without maintainer authorization.
- Relevant modules: frontend borrowing pages/forms and services.
- Dependencies: 5, 9, 10.
- Testing requirements: Real issue/return; User isolation; last-copy behavior; repeated action; errors/loading states and mobile layout.
- Definition of done: acceptance criteria met; evidence recorded; API/setup documentation updated where needed; focused PR linked to its issue; independent review and maintainer merge completed.

## 14. Integrated API regression and inventory consistency tests

- Type: testing / integration; priority: P0; proposed owner: Anshu Raj Bisoyi.
- Problem: This required capability or its verification is missing.
- Scope and acceptance criteria: Add reproducible integration tests covering auth/roles, CRUD/search and borrowing invariants; run on Atlas or replica set; fix integration defects in coordination with feature owners and record evidence.
- Exclusions: unrelated features, taking over another member's issue, and remote actions without maintainer authorization.
- Relevant modules: backend integration tests and verification documentation.
- Dependencies: 2–4, 6, 8–10.
- Testing requirements: Full API flows; concurrent issue/return; rollback; inventory edit/deletion races; role/ownership isolation; explain any unrun checks.
- Definition of done: acceptance criteria met; evidence recorded; API/setup documentation updated where needed; focused PR linked to its issue; independent review and maintainer merge completed.

## 15. Frontend integration and release verification

- Type: testing / integration; priority: P0; proposed owner: Anshu Raj Bisoyi.
- Problem: This required capability or its verification is missing.
- Scope and acceptance criteria: Verify complete Admin/User browser workflows against real API; resolve routing/session/state integration defects; record responsive and error-state checks with actual screenshots.
- Exclusions: unrelated features, taking over another member's issue, and remote actions without maintainer authorization.
- Relevant modules: frontend integration points, release verification checklist/results.
- Dependencies: 5, 7, 11–14.
- Testing requirements: Register/login/logout, CRUD/search, issue/return, deep links, loading/error/empty states, narrow-screen checks; frontend production build.
- Definition of done: acceptance criteria met; evidence recorded; API/setup documentation updated where needed; focused PR linked to its issue; independent review and maintainer merge completed.

## 16. Deployment configuration and submission documentation

- Type: deployment / documentation; priority: P0; proposed owner: Anshu Raj Bisoyi.
- Problem: This required capability or its verification is missing.
- Scope and acceptance criteria: Prepare Vercel frontend and Node backend configuration; verify Atlas, production API URL/CORS and deployed flows; document team details, real screenshots and verified URLs; audit four meaningful merged PRs per member. Remote deployment remains subject to explicit authorization.
- Exclusions: unrelated features, taking over another member's issue, and remote actions without maintainer authorization.
- Relevant modules: README, frontend/backend deployment configuration and submission evidence.
- Dependencies: 14, 15.
- Testing requirements: Deployed health and feature smoke checks; route reloads; secrets absent; accurate setup/URLs; actual contribution history reviewed.
- Definition of done: acceptance criteria met; evidence recorded; API/setup documentation updated where needed; focused PR linked to its issue; independent review and maintainer merge completed.

## Coordination and implementation order

Agree on API-CONTRACT.md first. Follow dependency order rather than numerical order: foundation → auth API → middleware → authenticated catalog API. Frontend session work can then run alongside book mutation/search work. Borrowing API follows inventory rules; borrowing UI follows issue/return endpoints. Integration and deployment follow completed feature flows.

Dhruv owns backend Book schema/controllers; Harsh owns User/auth/Borrowing modules; Kiran owns frontend session, catalog/detail and librarian forms; Anshu owns foundation, integration verification and release configuration. Dhruv's frontend search issue touches Kiran's catalog, so merge the catalog PR before search changes and agree on its props/service contract. Coordinate central route mounting and the shared API service in small reviewed changes. Inventory mutations and borrowing must share transaction invariants before either is accepted.

Deadline remains 12 October 2026 at 9:00 AM (Asia/Kolkata). Sixteen PRs add review overhead; keep implementation focused and review completed work promptly. Do not weaken acceptance criteria or create trivial PRs merely to meet the team's higher target. If time becomes tight, reassess the four-PR target while preserving required features and the assignment's two-per-member minimum.

## Published issues

| Roadmap | GitHub issue | Owner | Assignment |
| --- | --- | --- | --- |
| 1 | [Project foundation and environment configuration](https://github.com/anshurajbisoyi98-ctrl/hospitalmanagemntproject/issues/1) | Anshu Raj Bisoyi | Assigned |
| 2 | [Authentication API and user model](https://github.com/anshurajbisoyi98-ctrl/hospitalmanagemntproject/issues/2) | Harsh Surana | Pending collaborator access |
| 3 | [Book model and catalog read API](https://github.com/anshurajbisoyi98-ctrl/hospitalmanagemntproject/issues/3) | Dhruv Tomar | Pending collaborator access |
| 4 | [Authentication middleware and administrator bootstrap](https://github.com/anshurajbisoyi98-ctrl/hospitalmanagemntproject/issues/4) | Harsh Surana | Pending collaborator access |
| 5 | [Registration, login and session interface](https://github.com/anshurajbisoyi98-ctrl/hospitalmanagemntproject/issues/5) | Kiran Sinha | Pending collaborator access |
| 6 | [Protected book creation, editing and deletion API](https://github.com/anshurajbisoyi98-ctrl/hospitalmanagemntproject/issues/6) | Dhruv Tomar | Pending collaborator access |
| 7 | [Book catalog and detail pages](https://github.com/anshurajbisoyi98-ctrl/hospitalmanagemntproject/issues/7) | Kiran Sinha | Pending collaborator access |
| 8 | [Book search and category filtering API](https://github.com/anshurajbisoyi98-ctrl/hospitalmanagemntproject/issues/8) | Dhruv Tomar | Pending collaborator access |
| 9 | [Transactional book issue API](https://github.com/anshurajbisoyi98-ctrl/hospitalmanagemntproject/issues/9) | Harsh Surana | Pending collaborator access |
| 10 | [Transactional return and borrowing-record access API](https://github.com/anshurajbisoyi98-ctrl/hospitalmanagemntproject/issues/10) | Harsh Surana | Pending collaborator access |
| 11 | [Librarian book-management forms](https://github.com/anshurajbisoyi98-ctrl/hospitalmanagemntproject/issues/11) | Kiran Sinha | Pending collaborator access |
| 12 | [Catalog search and filtering interface](https://github.com/anshurajbisoyi98-ctrl/hospitalmanagemntproject/issues/12) | Dhruv Tomar | Pending collaborator access |
| 13 | [Borrowing and return interface](https://github.com/anshurajbisoyi98-ctrl/hospitalmanagemntproject/issues/13) | Kiran Sinha | Pending collaborator access |
| 14 | [Integrated API regression and inventory consistency tests](https://github.com/anshurajbisoyi98-ctrl/hospitalmanagemntproject/issues/14) | Anshu Raj Bisoyi | Assigned |
| 15 | [Frontend integration and release verification](https://github.com/anshurajbisoyi98-ctrl/hospitalmanagemntproject/issues/15) | Anshu Raj Bisoyi | Assigned |
| 16 | [Deployment configuration and submission documentation](https://github.com/anshurajbisoyi98-ctrl/hospitalmanagemntproject/issues/16) | Anshu Raj Bisoyi | Assigned |
