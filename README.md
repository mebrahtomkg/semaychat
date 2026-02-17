# SemayChat

## 1. Introduction

**SemayChat** is a high-performance, resilient, real-time communication platform engineered for reliability, privacy, and seamless data synchronization. It is designed to serve as a strong foundation for private messaging, offering a self-hosted alternative to centralized communication tools. The system is built with a focus on architectural integrity, ensuring that the interface remains fluid and the data remains consistent, even under the demands of complex media handling and on unreliable networks.

## 2. Features

The platform provides a comprehensive suite of features designed for a modern messaging experience. These capabilities are implemented with a focus on user autonomy and intuitive interaction.

- **High-end, Attractive UI/UX:** Modern aesthetics and animated user interfaces.

- **Real-Time Messaging:** Instantaneous exchange of text messages with integrated message status indicators (**sent/read**).

- **File Transfer:** Supports the transfer and exchange of any file type.

- **Rich Media/Attachments Previews:** Built-in support for image, video, and audio previews directly within the interface.

- **Multiple Profile Photos:** A sophisticated profile system supporting multiple profile pictures and a history of past profile images.

- **Profile Photo Upload & Cropping:** A dedicated tool for personalizing profile pictures. It allows users to upload, zoom, and drag photos within a circular mask to get the perfect crop before saving.

- **Dual-Option Media Storage:** The system supports two distinct storage mechanisms for handling profile photos and message attachments. It is possible to choose between local disk storage (optimized for self-hosting and private servers) or Supabase cloud storage (optimized for global scalability).

- **Privacy Control:** A robust, granular privacy management system that allows users to independently control the visibility of their email address, "last seen" status, and profile photos. It also includes permissions to restrict who can initiate messages. These settings are managed through an intuitive modal interface with three distinct levels of visibility: **Everybody**, **My Contacts**, and **Only Me**.

- **User Blocking:** Users can block other users, preventing unwanted interactions.

- **Relationship Management:** Comprehensive contact management systems, allowing users to add others to their contacts list.

- **Secure JWT Authentication:** Industry-standard authentication using JSON Web Tokens (JWT) stored in `httpOnly` and `Secure` cookies to prevent XSS and ensure session integrity.

- **Persistent State:** All conversations and media history are persisted, ensuring a continuous experience across devices and browser refreshes.

- **Ability to Clear Messaging History:** Users can delete individual messages, entire chats, and even delete messages on the receiver's side for privacy reasons.

- **Theming:** The application supports both dark and light themes seamlessly.

## 3. Technologies Used

The technology stack selection was strategic, prioritizing type safety, modularity, and database flexibility. Each technology serves a specific, well-defined purpose in the application's lifecycle.

- **`TypeScript` (98% Codebase):** The application utilizes `TypeScript` across the entire stack to enforce strict typing and developer confidence. This ensures that data structures remain consistent from the database layer to the UI components, significantly reducing runtime exceptions in a codebase exceeding 500 files.

- **`React` (Frontend Framework):** The frontend is built on `React` for component-based UI logic. `React` facilitates the creation of repeatable, state-based logic stored in custom hooks, making the application more maintainable and resilient.

- **`Styled Components`:** `Styled Components` are used exclusively for styling, providing a CSS-in-JS solution that ensures styles are scoped, maintainable, and dynamically responsive to application state.

- **`React Query`:** `React Query` manages asynchronous server-state, caching, and background synchronization.

- **`Zustand`:** `Zustand` handles local, client-side UI state with a minimal memory footprint and less code relative to `Redux`. `Redux` was used in the initial development stage of the application but has since been replaced by `Zustand` and `React Query`.

- **`React Router`:** `React Router` is used as the routing library in the application. It typically uses a hash router for enhanced reliability, given that the application is a Single Page Application (`SPA`).

- **`Node.js`:** `Node.js` is the backend runtime environment. The server-side architecture leverages the non-blocking I/O of `Node.js` to handle high-concurrency messaging patterns efficiently.

- **`ExpressJS`:** `Express` was chosen as the backend framework for its minimalist approach and ease of use.

- **`Socket.io`:** This serves as the real-time transport layer, enabling bi-directional, low-latency communication between the client and the server.

- **`Sequelize ORM`:** By utilizing `Sequelize`, the platform remains database-agnostic. It provides full support for `PostgreSQL`, `MySQL`, and `SQLite`, allowing for flexible deployment environments.

- **`Zod`:** `Zod` is used as a schema validation tool and library.

## 4. Architectural Details

The architecture is designed to manage the complexity inherent in a large-scale messaging application, where state synchronization, performance, scalability, and data integrity are paramount.

- **Queue-Based Message Request System:** When a user types a message and hits send, the API request isn't triggered directly—that approach is left to toy chat applications. Instead, to achieve true UI responsiveness and robust message delivery, the application decouples user actions from immediate API calls. This allows users to navigate to different chats without worrying if their message has been sent. Actions like sending, editing, or deleting messages are transformed into "request" objects and pushed into a global `Zustand` store queue. Dedicated, independent background processors then sequentially pick up these requests, execute the necessary network operations (e.g., `Socket.io` for real-time events, `HTTP multipart` for file uploads), and update the local cache upon success. This architecture ensures strict message ordering (`FIFO`), maintains UI fluidity, automatically retries pending messages upon network restoration, and keeps requests active even if the user navigates between different chats.

- **ACID-Compliant Transaction Management & Concurrency Control:** To guarantee absolute data integrity, the backend employs a strict transactional architecture for all state-mutating operations. Whether creating a new user, sending a message with attachments, or performing complex chat deletions, every action is wrapped in a `Sequelize` managed transaction. This ensures an "all-or-nothing" execution model—if any part of a complex operation fails, the entire sequence is rolled back. The system also implements a **Two-Phase Resource Cleanup** strategy; physical file deletion (for attachments/photos) is deferred until _after_ the database transaction successfully commits. This prevents data inconsistency where files might be deleted despite a database rollback. Furthermore, critical paths utilize **Row-Level Locking** (`transaction.LOCK.UPDATE`) to prevent race conditions during high-concurrency events (like simultaneous message deletions), ensuring that derived state—such as "last message" pointers—remains mathematically accurate at all times.

- **Custom Rspack Build Pipeline & Service Worker Orchestration:** The application utilizes a bespoke Rspack plugin (`AppRspackPlugin`) to manage the compilation and injection lifecycle of the Service Worker. To avoid registration failures, the plugin treats the Service Worker as a specialized asset rather than a standard entry point, ensuring that HMR (Hot Module Replacement) runtime code—which is incompatible with the Service Worker global scope—is never injected. During the build process, the plugin leverages the `SWC` engine to transform TypeScript while dynamically injecting environment-specific variables (such as `API_URL` and `IS_PRODUCTION`). It also handles content-based hashing for robust cache busting, automatically updating the `index.html` template with the correct hashed filename to maintain synchronization between the application and its background caching layer.

- **Touch-Optimized Photo Positioning & Cropping System:** The application features a custom-built system specifically for selecting and adjusting profile photos. This system is designed to work perfectly on mobile devices, providing full support for "pinch-to-zoom" and smooth touch-based dragging to reposition the image. It intelligently handles multiple inputs simultaneously—allowing users to zoom with a slider, a mouse wheel, or their fingers—while maintaining the image's center point. Once the user is satisfied with the position, the system uses an off-screen canvas to generate a high-quality, perfectly cropped version of the photo for upload, ensuring the final result looks sharp on all devices.

- **Viewport-Aware Context Menu System:** The app has its own custom low-level highly intelligent context menu UI component. This decoupled context menu system provides a robust and flexible solution for displaying contextual actions. It supports multiple triggering mechanisms, including traditional right-click and anchor-based interactions (such as a triple-dot icon). At its core, the system incorporates a specialized `Positioning Engine` (powered by `useMenuPositionFixer`). This engine intelligently monitors viewport boundaries and dynamically calculates the optimal menu placement. Its primary function is to prevent screen overflow by automatically flipping the menu's display direction when the trigger event occurs near the edge of the screen, ensuring the menu is always fully visible and accessible to the user.

- **Declarative Lifecycle Animation Engine:** Instead of heavy external libraries, the platform uses a custom-built animation system that synchronizes `React`’s mount/unmount lifecycle with hardware-accelerated `CSS` transitions. This allows for complex exit animations (animating elements before they leave the DOM) and implements "Style Sanitation" to remove transition styles after completion, preventing side effects like stacking context breaks.

- **High-Performance Theming Architecture:** The application implements a "**Zero-Lag**" theming system. Instead of prop-drilling theme objects, the `AppThemeProvider` dynamically injects `CSS` variable blocks into the document root based on the user's preference. Components consume these variables directly (e.g., `` `color: var(--fg-primary)` ``), meaning theme toggling (Light/Dark) is handled entirely by the browser's `CSS` engine rather than `React`'s reconciliation process.

- **Custom-Hook-Based Logic Abstraction:** The system utilizes a specialized hook architecture to decouple UI components from complex side effects. This includes `Ref-based Cleanup` for memory-safe timers and media URLs, `Reference Stability` via deep-comparison hooks to prevent unnecessary re-renders, and `Optimistic UI` patterns that ensure the interface responds instantly while background synchronization handles server reconciliation.

- **Flexible Storage Architecture (Local Disk & Supabase):** The application is built with a provider-based storage abstraction specifically for managing **Profile Photos** and **Message Files**. The system allows switching between local and cloud environments simply by changing the `STORAGE_TYPE` environment variable:

  1.  **Local Disk Storage (`localdisk`):** Files are stored directly on the server's filesystem. While commonly used for local development, this provider is production-ready for cloud deployments using persistent volumes (such as Docker Volumes or AWS EBS), providing a fully self-hosted media solution.
  2.  **Supabase Storage (`supabase`):** Files are streamed to Supabase buckets, providing a managed cloud solution that scales effortlessly without occupying server disk space.

  This is implemented through a common `IStorageProvider` interface and custom `multer` storage engines (`LocalDiskStorageEngine` and `SupabaseStorageEngine`), ensuring that regardless of the storage medium, files are handled as high-performance streams with randomized naming to prevent collisions.

- **Service-Worker-Driven Media Caching:** To achieve near-instantaneous media delivery and minimize redundant network overhead, the platform implements a specialized Service Worker caching layer. This system utilizes a **Cache-First** strategy specifically scoped to high-bandwidth assets, including message attachments and profile photos. By intercepting fetch requests at the network level, the Service Worker serves previously accessed media directly from the browser's `Cache Storage` API. The implementation features a robust lifecycle management engine that handles manual cache versioning, immediate activation via `skipWaiting()` and `clients.claim()`.

- **Environment-Agnostic Configuration Architecture:** The system is engineered with a strict separation between core business logic and infrastructure dependencies. By leveraging a centralized environment configuration layer, the platform can seamlessly toggle between local development setups (e.g., SQLite, local disk storage) and production-grade cloud ecosystems (e.g., PostgreSQL, Supabase) via simple environment variable changes. This abstraction ensures that the application remains portable and resilient, requiring zero code modifications to adapt to different deployment scales or hosting providers.

- **Multi-Layered Authentication Strategy:** The system employs a sophisticated two-stage authentication process that separates identity resolution from access enforcement. A global identification middleware (`performAuth`) runs on every request, gracefully verifying JWTs from secure cookies and attaching user identity to the request object without interrupting the flow. This is followed by a strict enforcement layer (`authGuard`), which is selectively deployed as a gatekeeper for protected API routes, ensuring a seamless yet highly secure user experience.

- **Automated SVG Pipeline & Centralized Consumption:** Every **icon** within the application is custom-designed using **Inkscape** to maintain a unique and cohesive visual identity. These assets are integrated via an automated pipeline using **SVGR**. The configuration (via `.svgrrc.js`) is engineered to strip hardcoded dimensions and inject `currentColor` into both the `fill` and `stroke` attributes. This ensures that icons behave like scalable typography—inheriting the color of their parent container and responding instantly to the "Zero-Lag" theming system without additional overrides. These components are exposed through a unified barrel file (`@/components/icons/index.tsx`), creating a centralized public API that simplifies imports and decouples asset locations from component logic.

- **Modular Scalability:** The project is structured into over 400 frontend modules and 120 server-side modules. This high degree of decoupling allows for independent scaling of features and simplifies the maintenance of complex logic.

- **State Synchronization:** The frontend architecture is designed to handle `optimistic updates`, where the UI responds instantly to user actions while the background synchronization layer ensures the server and database are updated in tandem.

## 5. Getting Started

Follow these steps to run SemayChat locally in development mode.

### Prerequisites

- **Node.js:** Version `20.18.1` or higher.
- **pnpm:** This project uses `pnpm` as the package manager.

### Installation

1. **Clone the repository** and navigate to the project root.
2. **Install root dependencies** In the root project run:
   ```bash
   pnpm install
   ```
3. **Install backend(server) dependencies** Navigate to the `server` directory and run:
   ```bash
   pnpm install
   ```
4. **Install frontend(client) dependencies** Navigate to the `client` directory and run:
   ```bash
   pnpm install
   ```

### Database Initialization

Before running the server for the first time, initialize the database schema. This command creates the necessary tables based on the Sequelize models:

```bash
# Inside the server directory
pnpm run db:reset
```

Note: This will drop existing tables and recreate them. Use with caution.

### Running the Application

You will need to run the backend and frontend simultaneously in separate terminals.

**Start the Backend:** Navigate to the `server` directory and run:

```bash
pnpm run dev
```

**Start the Frontend:** Navigate to the `client` directory and run:

```bash
pnpm run dev
```

The application will be accessible at the address provided by the Rspack dev server (typically `http://localhost:8080`).

### Code Quality

From the **root** directory, you can run the following to maintain code standards:

```bash
# Run Biome linter
pnpm run lint

# Format code with Prettier
pnpm run prettier:format
```

## 6. Configuration
