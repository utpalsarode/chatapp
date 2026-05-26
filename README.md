# Let's Chat - Frontend Client

Welcome to the frontend repository for **Let's Chat**, a real-time, premium, and feature-rich instant messaging application. The client application is built on top of **React 18** and communicates seamlessly with the Express/Socket.IO backend server to offer a fluid chatting experience.

---

## 🚀 Key Features

* **Real-time Communication**: Instant messaging powered by persistent WebSockets via **Socket.IO-client**.
* **Flexible Conversations**: Supports both direct 1:1 private chats and dynamic, multi-user Group Chats.
* **Group Management**: Seamlessly add or remove members, rename groups, and identify group administrators.
* **User Lookup & Discovery**: Slide-out offcanvas drawer to search for other registered users by name or email in real-time.
* **Active Status Indicators**: Real-time typing indicators with micro-animations that show when a contact is active.
* **Smart Notifications**: Notification system with badge counts indicating incoming messages in other rooms.
* **Profile Management**: Profile modals displaying avatar images and contact details.
* **Performance Enhancements**: Lazy-loaded user images using a custom `LazyImage` wrapper and debounced API requests to limit network overhead.

---

## 🛠️ Technology Stack

* **Core**: [React 18.2.0](https://react.dev/), [React DOM 18.2.0](https://reactjs.org/)
* **Routing**: [React Router v6](https://reactrouter.com/) (browser-based navigation)
* **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & React Context API
* **Real-time Sync**: [Socket.IO-client 4.8.1](https://socket.io/docs/v4/client-api/)
* **Forms & Validation**: [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup)
* **Styling & Layouts**:
  * [Chakra UI (v3)](https://chakra-ui.com/)
  * [Reactstrap](https://reactstrap.github.io/) / [Bootstrap 5](https://getbootstrap.com/)
  * Custom Vanilla CSS styling (`assets/css/Chat.css`)

---

## 📂 Key Directory Structure

```bash
src/
├── assets/             # Global assets (images, custom CSS)
├── components/         # Reusable presentation and utility components
│   ├── ui/             # Chakra UI tokens (avatars, skeletons, menus)
│   ├── GroupModal.jsx  # Handles group chat creations
│   ├── LazyImage.js    # Optimized image renderer
│   └── Modal.jsx       # Custom profile modal
├── helper/             # Axios API engines & global utility handlers
├── hooks/              # Custom React hooks (e.g., useDebounce)
├── pages/              # Primary route views
│   ├── chat/           # Chat-specific layout structures and sub-components
│   │   ├── chat_components/ # ChatSidebar, ChatWindow, ContactsList, ScrollableChat
│   │   └── Chat.js     # Main Chat page coordinator
│   └── ChatProvider.js # Central React Context API state provider
├── redux/              # Slice structures and Redux configurations
└── routes/             # App routing maps (userRoutes.js)
```

---

## ⚙️ Development & Set Up

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v16+ recommended) along with standard `npm`.

### 2. Install Dependencies
Run the following command in the project root directory:
```bash
npm install
```

### 3. Run the Development Server
Launch the application locally:
```bash
npm start
```
The server will start on [http://localhost:3000](http://localhost:3000).

### 4. Build for Production
To package the app for optimal production delivery:
```bash
npm run build
```

---

## 🔌 API & Endpoint Configuration

The frontend endpoints are managed within `src/helper/commonApi.js`. It dynamically assigns API endpoints depending on the browser hostname:

* **Localhost Environment**:
  * REST APIs: `http://localhost:5000/api/auth`
  * Sockets/Node Endpoint: `http://localhost:5000`
* **Demo Production Environment**:
  * REST APIs: `https://demo.chatapp.com/api`
  * Sockets/Node Endpoint: `https://demo.chatapp.com/`

Ensure your local backend server is running on port `5000` to correctly receive actions from this client.