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

- **Privacy Control:** A robust, granular privacy management system that allows users to independently control the visibility of their email address, "last seen" status, and profile photos. It also includes permissions to restrict who can initiate messages. These settings are managed through an intuitive modal interface with three distinct levels of visibility: **Everybody**, **My Contacts**, and **Only Me**.

- **User Blocking:** Users can block other users, preventing unwanted interactions.

- **Relationship Management:** Comprehensive contact management systems, allowing users to add others to their contacts list.

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

- **Touch-Optimized Photo Positioning & Cropping System:** The application features a custom-built system specifically for selecting and adjusting profile photos. This system is designed to work perfectly on mobile devices, providing full support for "pinch-to-zoom" and smooth touch-based dragging to reposition the image. It intelligently handles multiple inputs simultaneously—allowing users to zoom with a slider, a mouse wheel, or their fingers—while maintaining the image's center point. Once the user is satisfied with the position, the system uses an off-screen canvas to generate a high-quality, perfectly cropped version of the photo for upload, ensuring the final result looks sharp on all devices.

- **Viewport-Aware Context Menu System:** The app has its own custom low-level highly intelligent context menu UI component. This decoupled context menu system provides a robust and flexible solution for displaying contextual actions. It supports multiple triggering mechanisms, including traditional right-click and anchor-based interactions (such as a triple-dot icon). At its core, the system incorporates a specialized `Positioning Engine` (powered by `useMenuPositionFixer`). This engine intelligently monitors viewport boundaries and dynamically calculates the optimal menu placement. Its primary function is to prevent screen overflow by automatically flipping the menu's display direction when the trigger event occurs near the edge of the screen, ensuring the menu is always fully visible and accessible to the user.

- **Declarative Lifecycle Animation Engine:** Instead of heavy external libraries, the platform uses a custom-built animation system that synchronizes `React`’s mount/unmount lifecycle with hardware-accelerated `CSS` transitions. This allows for complex exit animations (animating elements before they leave the DOM) and implements "Style Sanitation" to remove transition styles after completion, preventing side effects like stacking context breaks.

- **High-Performance Theming Architecture:** The application implements a "**Zero-Lag**" theming system. Instead of prop-drilling theme objects, the `AppThemeProvider` dynamically injects `CSS` variable blocks into the document root based on the user's preference. Components consume these variables directly (e.g., `` `color: var(--fg-primary)` ``), meaning theme toggling (Light/Dark) is handled entirely by the browser's `CSS` engine rather than `React`'s reconciliation process.

- **Custom-Hook-Based Logic Abstraction:** The system utilizes a specialized hook architecture to decouple UI components from complex side effects. This includes `Ref-based Cleanup` for memory-safe timers and media URLs, `Reference Stability` via deep-comparison hooks to prevent unnecessary re-renders, and `Optimistic UI` patterns that ensure the interface responds instantly while background synchronization handles server reconciliation.

- **Modular Scalability:** The project is structured into over 400 frontend modules and 120 server-side modules. This high degree of decoupling allows for independent scaling of features and simplifies the maintenance of complex logic.

- **Persistence Strategy:** The backend utilizes an abstraction layer for data persistence. This allows the application to handle complex relational queries (such as contact blocking and multi-profile management) with optimized performance across different `SQL` dialects.

- **State Synchronization:** The frontend architecture is designed to handle `optimistic updates`, where the UI responds instantly to user actions while the background synchronization layer ensures the server and database are updated in tandem.
