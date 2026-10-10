# Proposed API contract

Review and agree on this contract before dependent feature work. Only GET /api/health exists today.

Success: `{ "data": ... }`. Error: `{ "error": { "message": "..." } }`.
Use 201 for creation, 200 for reads/updates, 204 for deletion, 400 for invalid inputs, 401 for missing/invalid authentication, 403 for forbidden roles, 404 for missing records, and 409 for conflicts.

Authentication will use signed, expiring bearer tokens. Registration always creates a User and rejects client-supplied roles. Create the first Admin using an explicit local administrative script; never a public role-selection field. Hash passwords with bcrypt. Do not log passwords or tokens. Backend middleware verifies tokens and role permissions on every protected route.

| Method | Endpoint | Access / behavior |
| --- | --- | --- |
| POST | /api/auth/register | Public; name, email, password; User only |
| POST | /api/auth/login | Public; email, password; return token and safe user details |
| GET | /api/books?q=&category= | Admin/User; search title, author, ISBN, category |
| GET | /api/books/:id | Admin/User; book details |
| POST | /api/books | Admin; create book |
| PUT | /api/books/:id | Admin; edit metadata and totalCopies |
| DELETE | /api/books/:id | Admin; reject while active loans exist |
| GET | /api/users | Admin; minimal borrower selection data |
| POST | /api/borrowings | Admin; userId, bookId, dueDate |
| GET | /api/borrowings | Admin: all; User: own only |
| PATCH | /api/borrowings/:id/return | Admin; return once |

Book: title, author, ISBN, category, publisher, publicationYear, totalCopies, availableCopies, timestamps. Required title/author/ISBN/category; integer copies >= 0; available <= total; normalized ISBN unique. ISBN checksum/format validation should be agreed before implementation. availableCopies is server-managed; on creation it equals totalCopies, and total-copy edits retain the active-loan count.

User: name, normalized unique email, passwordHash, role (Admin/User), timestamps. Never return passwordHash.
Borrowing: bookId, userId, issueDate, dueDate, returnDate, status (issued/returned), timestamps. Admin controls issue and return, matching the assignment. Students browse/search and may view their own borrowing records.

Use a MongoDB transaction for issue, return, book deletion, and inventory edits that race with borrowing. Transactions must run on Atlas (or another replica set for tests). Conditional updates enforce availableCopies > 0 and issued status. Protect against concurrent deletion/inventory changes by updating the same Book within those transactions. A failed operation must roll back both stock and borrowing records. Reject unavailable books, nonexistent users/books, repeated returns, and invalid due dates. Define whether repeated active loans of the same book/user are prohibited before implementation; recommended: prohibit them.
