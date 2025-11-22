# TUP CMS Backend – plan.md

## Context
- **Organization:** True United Party (TUP) – Political party in Liberia.
- **Goal:** Develop a CMS backend for the TUP website.
- **Objective:** Environment of fraternal love, understanding, mutual respect, rule of law, democratic society.
- **Phase:** Backend development first.

## Tech Stack & Setup
- **Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** `express-session` + `connect-mongo` for sessions; `crypto` (pbkdf2) for password hashing.
- **Image Handling:** `multer` (memory storage) -> Base64 strings stored in MongoDB.
- **Architecture:** MVC-ish (Routes, Controllers, Models, Middleware).

## Architecture
- **Folder Structure:**
  - `server.js`: Main entry point.
  - `config.js`: Database connection.
  - `models/`: Mongoose schemas.
  - `controllers/`: Request logic.
  - `routes/`: Endpoint definitions.
  - `middleware/`: Auth (requireAuth, requireRole), Error handling.
  - `utils/`: Encryption, etc.

## Authentication & Users
- **Super Admin:** Can create other admin accounts.
- **Admin:** Can manage content but cannot create users.
- **User Model:** `username`, `password` (hashed), `role` ('superAdmin', 'admin'), `isActive`.
- **Endpoints:** Login, Logout, Me, Create User (Super Admin), List/Manage Users.

## Page Requirements & Models

### 1. Home Page
- **Sections:**
  - **Header:** Global site header settings.
  - **Hero:** Text content + Slideshow (up to 4 images).
  - **Snippets:** About Us, News Feed, Manifesto, Gallery.
  - **Contact Info:** Address, Phone, etc.
  - **Footer:** Contact info, links.
- **CMS:** Fully editable sections and images.

### 2. About Us
- **Standard Sections:** Organization Bio, Mission, Vision, Goals.
- **Custom Sections:** Generic sections with Title, Content, Image.
- **CMS:** CRUD sections + images.

### 3. Constitution
- **Structure:** Indexed content uploaded in sections.
- **Model:** Sections list (Title, Content/Body).
- **CMS:** Add/Edit/Reorder sections.

### 4. Manifesto
- **Structure:** Indexed content uploaded in sections (similar to Constitution).
- **Model:** Sections list (Title, Content/Body), Snippet for Home Page.
- **CMS:** Add/Edit/Reorder sections.

### 5. News & Media
- **Page Header:** Description, Header Image.
- **Posts:** Title, Description, Image(s), Date.
- **CMS:** Create/Edit/Delete posts; Edit header.

### 6. Team
- **Page Header:** Description, Image.
- **Members:** Name, Picture, Role, Description.
- **CMS:** CRUD members; Edit header.

### 7. Gallery
- **Content:** Images with optional captions/categories.
- **CMS:** Upload/Delete images.

### 8. Contact Us
- **Content:** Title, Description, Image.
- **Contact Details:** Address, Email, Phone Number.
- **Form:** (Frontend handled, or basic backend endpoint if needed later. Current scope: Content only).

## Tasks List

### Phase 1: Setup & Foundation
- [x] **Server Setup:** Initialize `server.js` with Express, CORS, Session, MongoDB connection.
- [x] **Configuration:** Setup `dotenv`, `config.js` (DB connect).
- [x] **Middleware:** Create `errorMiddleware.js` (NotFound, ErrorHandler) and `authMiddleware.js` (protect, admin/superAdmin).
- [x] **Utils:** Implement `encryption.js` (pbkdf2).

### Phase 2: Authentication
- [x] **User Model:** Create `User` schema (username, password, role).
- [x] **User Controller:** Login, Logout, GetMe, CreateUser (SuperAdmin), ManageUsers.
- [x] **User Routes:** Define `/api/users` endpoints.
- [x] **Seed:** Create `seedData.js` for initial Super Admin.

### Phase 3: Content Models & Routes
- [x] **Home:** Create Model (Hero, Snippets, Footer), Controller, Routes.
- [x] **About:** Create Model (Bio, Mission, Vision, Sections), Controller, Routes.
- [x] **Constitution:** Create Model (Sections), Controller, Routes.
- [x] **Manifesto:** Create Model (Sections), Controller, Routes.
- [x] **News:** Create Models (Header, Post), Controllers, Routes.
- [x] **Team:** Create Models (Header, Member), Controllers, Routes.
- [x] **Gallery:** Create Model (Item), Controller, Routes.
- [x] **Partnership:** Create Models (Header, Partner), Controllers, Routes.
- [x] **Contact:** Create Model (Page Info), Controller, Routes.

### Phase 4: Integration & Testing
- [x] **Image Handling:** Ensure 50mb limit for Base64 uploads in Express/Multer.
- [ ] **Testing:** Verify all endpoints with Postman/Insomnia.

# TUP CMS Frontend – plan.md

## Context
- **Goal:** Build a React frontend for the True United Party (TUP) website, connecting to the existing backend.
- **Design Philosophy:** "Environment of fraternal love". Detailed, tasteful design with icons, background images, color overlays, and diverse layouts.
- **Performance:** 
  - **Lazy Loading:** Images load separately from text (`react-lazy-load-image-component`).
  - **Caching:** Use `localforage` to cache page data (stale-while-revalidate) so text loads instantly while fetching updates.

## Tech Stack & Setup
- **Framework:** React (CRA)
- **Language:** JavaScript (No TypeScript)
- **Styling:** `styled-components` (Separate styles file for each page).
- **Routing:** `react-router-dom`
- **Icons:** `react-icons`
- **Loaders:** `react-loader-spinner`
- **Form Handling:** `@emailjs/browser` (for Contact form).
- **State/Cache:** Context API + `localforage`.
- **Colors:**
  - **Primary:** White
  - **Secondary:** Green
  - **Tertiary:** Gold
  - **Fourth:** Bronze

## Architecture
- **Folder Structure:**
  - `src/components/`: Reusable UI (Header, Footer, Cards, Loaders).
  - `src/contexts/`: Global state (AuthContext, API cache/fetch helpers).
  - `src/pages/`: Page components.
  - `src/pages/Admin/`: Admin CMS pages.
  - `src/styles/`: Global styles/theme.
  - `src/utils/`: Helpers (API client, image processing).

## Page Requirements (Public & Admin)

### 1. Home Page
- **Public:**
  - **Header:** Global nav.
  - **Hero:** Text + Full-width/height Slideshow (up to 4 images).
  - **Snippets:** About Us, News Feed, Constitution, Manifesto, Gallery.
  - **Footer:** Contact info, links.
- **CMS:**
  - Manage Hero images (upload/delete).
  - Edit snippet text/links.
  - Edit Contact/Footer info.

### 2. About Us
- **Public:**
  - Sections: Organization Bio, Mission, Vision, Goals, Custom Sections.
  - Detailed styling (icons, overlays).
- **CMS:**
  - CRUD sections (Title, Content, Image).

### 3. Constitution
- **Public:**
  - Index of sections.
  - Content display (Title + Body) per section.
- **CMS:**
  - Add/Edit/Reorder sections.

### 4. Manifesto
- **Public:**
  - Index of sections.
  - Content display.
- **CMS:**
  - Add/Edit/Reorder sections.

### 5. News & Media
- **Public:**
  - Page Header (Title, Desc, Image).
  - Post List (Title, Desc, Images, Date).
- **CMS:**
  - Create/Edit/Delete posts.
  - Upload post images.
  - Edit Page Header.

### 6. Team
- **Public:**
  - Page Header (Desc, Image).
  - Team Cards (Name, Picture, Role, Description).
- **CMS:**
  - CRUD Team Members.
  - Edit Page Header.

### 7. Gallery
- **Public:**
  - Image Grid (Lazy loaded).
- **CMS:**
  - Upload/Delete images.

### 8. Partnerships
- **Public:**
  - Page Header.
  - Partner Cards (Image, Name).
- **CMS:**
  - CRUD Partners.

### 9. Contact Us
- **Public:**
  - Title, Description, Image.
  - Info Section: Address, Email, Phone.
  - Form: Name, Email, Message (via EmailJS).
- **CMS:**
  - Edit Content (Title, Desc, Info).

### 10. User Management (Super Admin Only)
- **CMS:**
  - Create Admin users.
  - List/Manage users.

## Frontend Tasks List

### Phase 5: Foundation & Architecture
- [x] **Setup:** Review `tuplib/frontend` structure. Ensure folders (components, contexts, pages, styles, utils) exist.
- [x] **Styles:** Setup GlobalStyles (reset, fonts) and Theme (colors).
- [x] **API Client:** Create `api.js` using `axios` or `fetch` with `localforage` caching wrapper.
  - Implement `fetchWithCache(url)` strategy: Return cached data first (if exists), then fetch network data and update UI + cache.
- [x] **Auth Context:** Implement Login/Logout logic, session persistence, and Protected Routes (Admin vs SuperAdmin).
- [x] **Layouts:** Create `MainLayout` (Public) and `AdminLayout` (CMS sidebar/nav).

### Phase 6: Public Pages (with Caching & Styling)
- [x] **Home:** Implement Header, Hero Slideshow, Snippets, Footer.
- [x] **About:** Implement Sections loop with alternating/diverse layouts.
- [x] **Constitution & Manifesto:** Implement Index + Section rendering.
- [x] **News:** Implement List view and Post details (if needed).
- [x] **Team:** Implement Team Grid/Cards.
- [x] **Gallery:** Implement Lazy-load Grid.
- [x] **Partnerships:** Implement Partner List.
- [x] **Contact:** Implement Info + EmailJS Form.

### Phase 7: Admin CMS
- [x] **Dashboard:** Overview page.
- [x] **Editors:** Create reusable `SectionEditor`, `ImageUploader` (Base64), `TextEditor`.
- [x] **CMS Pages:** Implement Edit views for:
  - [x] Home (Hero, Snippets)
  - [x] About (Sections)
  - [x] Constitution/Manifesto (Sections)
  - [x] News (Posts, Header)
  - [x] Team (Members, Header)
  - [x] Gallery (Uploads)
  - [x] Partnerships (Partners)
  - [x] Contact (Info)
- [x] **User Management:** Create User (Super Admin only), List Users.

### Phase 8: Polish
- [x] **Lazy Loading:** Verify `react-lazy-load-image-component` usage on all images.
- [x] **Loading States:** Ensure `react-loader-spinner` appears during network fetches (if no cache).
- [x] **Responsive:** Check mobile views.