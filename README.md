# 🚀 Modern Angular To-Do App (v21)

A high-performance task management application demonstrating advanced mastery of the **Angular 21** ecosystem, asynchronous data streams, and reactive state management.

## 🌟 Live Demo

🔗 [View Project on GitHub Pages](https://MarinaKramarchuk.github.io/angular-todo-app/)

---

## 🛠 Tech Stack

- **Framework:** **Angular 21** (Standalone Architecture)
- **State Management:** **Angular Signals** (Writable, Computed, linked dependencies)
- **Asynchronous Logic:** **RxJS** (Observables, `forkJoin` for bulk operations)
- **API Integration:** REST API (JSONPlaceholder) with full CRUD & Error Handling
- **Styling:** **Bulma CSS** (Modern, Responsive, Mobile-first)
- **Change Detection:** **Hybrid/Zoneless-ready** architecture

## ✨ Advanced Technical Features

- **Signal-based Reactivity:** Optimized data flow where the UI reacts instantly to state changes without unnecessary re-renders.
- **Bulk API Operations:** Implementation of **RxJS `forkJoin`** to handle multiple concurrent HTTP requests (e.g., "Select All" or "Clear Completed" functionality).
- **Data Transformation:** Client-side data enrichment and smart sorting (Active tasks prioritized over Completed).
- **Robust Error Handling:** A centralized notification system that manages API failures gracefully using RxJS error intercepting patterns.
- **Optimistic UI Updates:** Immediate local state updates combined with background server synchronization for a seamless user experience.
- **Modern Control Flow:** Full use of `@if`, `@for`, and `@empty` block syntax for clean and readable templates.

## ⚙️ Key Logic Highlights

- **Smart Filtering:** Real-time task filtering (All / Active / Completed) using `computed()` signals.
- **Toggle All:** A bi-directional "Select/Unselect All" logic that syncs with the server state.
- **Clean Architecture:** Strict separation between Service layer (data), Smart Components (logic), and UI Components.

## 🚀 Local Development

1. **Clone:** ```bash
   git clone [https://github.com/MarinaKramarchuk/angular-todo-app.git]
2. Install: `npm install`
3. Launch: `npm start`

---

**Developed with ❤️ by [MarinaKramarchuk](https://github.com/MarinaKramarchuk)**
