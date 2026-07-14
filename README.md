# ⚙️ Notes Application API (Backend)

A production-grade, robust RESTful CRUD API built with **Express**, **TypeScript**, and **Node.js** to manage notes.

This backend is architected strictly around **SOLID design principles** and the **Repository-Service Pattern**, ensuring the codebase is modular, statically typed, and trivially simple to unit-test or scale to a real database (like MongoDB or PostgreSQL).

---

## 🏛️ Architectural Design & SOLID Compliance

Instead of writing tightly coupled, mixed-responsibility handlers, the backend is partitioned into three distinct layers:

### 1. The Layers (Separation of Concerns)
*   **Controller Layer (`src/controllers/`):** The HTTP boundary. Its sole responsibility is to parse incoming requests (`req.params`, `req.body`), trigger the corresponding service, and map outcomes/errors to clear HTTP status codes.
*   **Service Layer (`src/services/`):** The business brain of the application. It handles validation and coordination. It has **no awareness** of HTTP, Express, or database implementation details.
*   **Repository Layer (`src/repositories/`):** The data access gateway. Implements memory-isolated CRUD methods to interact with the data store.

### 2. SOLID Principles Applied
*   **Single Responsibility (SRP):** Each class and file has exactly one reason to change.
*   **Open/Closed (OCP) & Dependency Inversion (DIP):** High-level services do not depend on low-level database classes; they depend on abstract contracts (**Interfaces**). The Router acts as our dependency injection (DI) container, instantiating the concrete repository and injecting it through class constructors.
*   **Interface Segregation (ISP):** The repository is split into distinct interfaces (`IReadNoteRepository` and `IWriteNoteRepository`) so that read-only or write-only modules in the future are not forced to depend on methods they do not use.

---

## 🔒 Robust Handling of Edge Cases
*   **Global JSON Syntax Protection:** A custom global middleware intercepts malformed raw JSON payloads sent by the client, returning a clean, standardized `400 Bad Request` instead of letting Express crash or leak structural folder traces in an HTML stack error.
*   **No Property Overwrite:** Updates are performed defensively. Omitting optional fields (or passing `undefined` fields) in a partial update will not wipe existing properties in memory.
*   **Memory Isolation:** Data queries clone array references to prevent caller layers from accidentally mutating the database array directly.

---

## 🛣️ API Endpoints

All requests should be sent with the header `Content-Type: application/json`.

| Method | Endpoint | Description | Sample Payload | Success Response |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/notes` | Create a new note | `{ "title": "Buy groceries", "content": "Need milk" }` | `201 Created` |
| **GET** | `/api/notes` | Retrieve all notes | *None* | `200 OK` (Array) |
| **GET** | `/api/notes/:id` | Retrieve note by ID | *None* | `200 OK` (Object) |
| **PUT** | `/api/notes/:id` | Update existing note | `{ "title": "Updated Title" }` | `200 OK` (Object) |
| **DELETE** | `/api/notes/:id` | Delete a note | *None* | `200 OK` |

---

## ⚙️ Setup & Run Instructions

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### 1. Install Dependencies
Run this command in your terminal within this directory:
```bash
npm install
```
### 2. 2. Run the Development Server (Dev Command)
Launch the server in local development mode using a hot-reload process compiler (ts-node-dev). Any modifications you save to your files will automatically trigger a server restart:
```bash
npm run dev
```
### 3. Build for Production (Build Command)
Compiles the static TypeScript codebase into highly optimized, production-ready vanilla JavaScript. The build files are output to a dedicated distribution folder:
```bash
npm run build
```
### 4. Start the Production Build (Start Command)
Once the code is compiled, you can run the final production distribution files locally using this command:
```bash
npm start
```