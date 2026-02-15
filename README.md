# SemayChat

## 1. Introduction

**SemayChat** is a high-performance, robust, real-time communication platform engineered for reliability, privacy, and seamless data synchronization. It is designed to serve as a robust foundation for private messaging, offering a self-hosted alternative to centralized communication tools. The system is built with a focus on architectural integrity, ensuring that the interface remains fluid and the data remains consistent, even under the demands of complex media handling and on urealiable networks.

## 2. Features

The platform provides a comprehensive suite of features designed for a modern messaging experience. These capabilities are implemented with a focus on user autonomy and intuitive interaction.

- **High-end attractive UI/UX:** Modern look & feel and animated UI/UX.

- **Real-Time Messaging:** Instantaneous text messages exchange with integrated message status(sent/read) indicators.

- **Send/receive any kind of file:** supports any file transfer/exchange.

- **Rich Media/Attachments previews:** Built-in support for image, video, and audio previews directly within the interface.

- **Multi Profile Photo:** A sophisticated profile system supporting multiple profile photographs and history of profile photos.

- **Privacy Control:** Granular privacy controls allowing users to manage visibility and interaction permissions.

- **User blocking:** any user can block any user. this prevent unwanted interaction.

- **Relationship Management:** Comprehensive contact management systems. any user can add any user in the system to his/her contacts list.

- **Persistent State:** All conversations and media history are persisted, ensuring a continuous experience across device and browser refreshes.

- **Ablity to clear messaging history:** a user can delete a message, a whole chat and even delete for the reciver side too for privacy resean.

- **Theming:** the app suports dark and light themes properly

## 3. Technologies Used

Technologies stack selection was strategic prioritizing type safety, modularity, and database flexibility. Each technology serves a specific strategic purpose in the lifecycle of the application.

- **TypeScript (98% Codebase):** The application utilizes TypeScript across the entire stack to enforce strict typing and developer confidence. This ensures that the data structures remain consistent from the database layer to the UI components, significantly reducing runtime exceptions in a codebase exceeding 500 files.

- **React(Frontend Freamwork):** The frontend is built on React for component-based UI logic. React also allowed to make repeatable logics(state based) to be stored in custom hook making the app more maintenable and robust.

- **Styled Components:** Styled Components are used exclusively for styling, providing a CSS-in-JS solution that ensures styles are scoped, maintainable, and dynamically responsive to application state.

- **React Query:** React Query manages asynchronous server-state, caching, and background synchronization.

**Zustand:** Zustand handles local, client-side UI state with a minimal memory footprint and less code relative to redux. as redux was used in the first stage development of the app which is now replaced by zustand react query.

**React-Router:** react-router is used as a router library in the app. the app typicaly uses hash router for robustness, since the app is SPA.

- **Node.js:** NodeJS is the backend runtime environment. The server-side architecture leverages the non-blocking I/O of Node.js to handle high-concurrency messaging patterns efficiently.

- **ExpressJS:** Express is choosen as backend freamwork for its minimalist approch and easy usage.

- **Socket.io:** This serves as the real-time transport layer, enabling bi-directional, low-latency communication between the client and the server.

- **Sequelize ORM:** By utilizing Sequelize, the platform remains database-agnostic. It provides full support for PostgreSQL, MySQL, and SQLite, allowing for flexible deployment environments.

- **Zod:** Zod is used as schema validation tool/library.

## 4. Architectural Details

The architecture is designed to manage the complexity inherent in a large-scale messaging application, where state synchronization, performance, scalablity and data integrity are paramount.

- **Queue-Based Message Requests System:** To ensure strict message ordering (FIFO) and UI responsiveness, the app utilizes an asynchronous request system. Actions like sending or editing messages are pushed to a global Zustand store queue. Dedicated background Processors then execute these tasks—using Socket.io for real-time events and HTTP multipart for heavy file uploads. This architecture ensures that pending messages are automatically retried upon network restoration and remain active even if the user navigates between different chats.

- **Viewport-Aware Context Menu System:** The application features a decoupled context menu engine that supports both right-click and anchor-based (triple-dot) triggers. It utilizes a specialized Positioning Engine (useMenuPositionFixer) that dynamically calculates viewport boundaries to prevent screen overflow, automatically flipping menu direction if the trigger occurs near the screen edge.

- **Declarative Lifecycle Animation Engine:** Instead of heavy external libraries, the platform uses a custom-built animation system that synchronizes React’s mount/unmount lifecycle with hardware-accelerated CSS transitions. This allows for complex exit animations (animating elements before they leave the DOM) and implements "Style Sanitation" to remove transition styles after completion, preventing side effects like stacking context breaks.

- **High-Performance Theming Architecture:** The application implements a "Zero-Lag" theming system. Instead of prop-drilling theme objects, the AppThemeProvider dynamically injects CSS variable blocks into the document root based on the user's preference. Components consume these variables directly (e.g., `color: var(--fg-primary)`), meaning theme toggling (Light/Dark) is handled entirely by the browser's CSS engine rather than React's reconciliation process.

- **Custom-Hook-Based Logic Abstraction:** The system utilizes a specialized hook architecture to decouple UI components from complex side effects. This includes Ref-based Cleanup for memory-safe timers and media URLs, Reference Stability via deep-comparison hooks to prevent unnecessary re-renders, and Optimistic UI patterns that ensure the interface responds instantly while background synchronization handles server reconciliation.

- **Modular Scalability:** The project is structured into over 400 frontend modules and 120 server-side modules. This high degree of decoupling allows for independent scaling of features and simplifies the maintenance of complex logic such as media processing and privacy filtering.

- **Persistence Strategy:** The backend utilizes an abstraction layer for data persistence. This allows the application to handle complex relational queries (such as contact blocking and multi-profile management) with optimized performance across different SQL dialects.

- **State Synchronization:** The frontend architecture is designed to handle "optimistic updates," where the UI responds instantly to user actions while the background synchronization layer ensures the server and database are updated in tandem.
