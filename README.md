# Let's Chat - Backend API Server

Welcome to the backend API server for **Let's Chat**, a real-time, event-driven messaging server built on **Node.js**, **Express**, **Socket.IO**, and **Mongoose/MongoDB**. 

---

## ⚡ Core Features

* **RESTful API Services**: Lightweight and structured endpoints for authentication, profile management, chat routing, and messages retrieval.
* **Persistent WebSockets Layer**: Full-duplex real-time synchronization built on **Socket.IO** to manage user setups, message routing, and typing statuses.
* **Flexible Chat Rooms**: Server-side room joining (`socket.join`) supporting private 1-on-1 dialogs and multi-party Group Chats.
* **Environment Configuration**: Multi-mode configuration loading (`.env_local` and `.env_live`) dynamically determined by environmental variables.
* **Token Authentication**: Secure access token validation middleware for APIs.

---

## 🛠️ Technology Stack

* **Runtime Environment**: [Node.js](https://nodejs.org/) (v16+)
* **Web Framework**: [Express.js (v4.18.2)](https://expressjs.com/)
* **Database (NoSQL)**: [MongoDB Atlas](https://www.mongodb.com/) via [Mongoose ODM (v8.0.1)](https://mongoosejs.com/)
* **Real-time Engine**: [Socket.IO (v4.8.1)](https://socket.io/)
* **Security & Tokens**: [JSON Web Tokens (JWT v8.5.1)](https://github.com/auth0/node-jsonwebtoken)
* **Process Management**: [PM2](https://pm2.keymetrics.io/) & [Nodemon](https://nodemon.io/)
* **Legacy Subsystems (Commented Out)**: MySQL driver connectivity support.

---

## 📂 Key Directory Structure

```bash
src/
├── config/              # Configurations & local/live env files (.env_local)
├── controller/          # Route controller modules (auth, messages, chats)
├── db.js                # Core MongoDB connection establishment
├── handlers/            # Auxiliary error handlers & operations
├── helper/              # Encryption utilities, database drivers, and logging engines
├── middleware/          # JWT verify and authorization middleware
├── models/              # Mongoose DB schema definitions (user, message, chat)
├── utils/               # Common helper packages
├── web/                 # Express route entry points (user, chat, messages)
└── App.js               # Express application wrapper setup
server.js                # Core entry point (attaches Socket.IO engine to http server)
```

---

## 🔌 API Documentation

All routes are mounted under the prefix designated by your `.env` (default is `/api/auth`).

### 1. Authentication & Users (`/api/auth`)
* `POST /register`: Registers a new user with a unique name, email, and password.
* `POST /login`: Logs in a user, returns user details, and issues a base64 encoded JWT.
* `GET /getAllUsers?search=keyword`: Searches the user directory by name or email (excluding the authenticated user).

### 2. Conversations (`/api/auth/chat`)
* `POST /`: Establishes or accesses a 1:1 chat room with another user.
* `GET /`: Retrieves all active chats (both direct and group) for the authenticated user.
* `POST /create-group`: Initializes a new group chat with a group name and a list of user IDs.
* `PUT /rename-group`: Renames an existing group chat.
* `PUT /group-add`: Adds a member to an existing group chat.
* `PUT /group-remove`: Removes a member from a group chat.

### 3. Messages (`/api/auth/messages`)
* `POST /`: Sends a new message in a designated chat room.
* `GET /?chatId=id`: Pulls the scrollable chronological history of messages in a room.

---

## 💬 WebSocket Event Mapping

The server registers listeners for the following key WebSockets events:

| Event Name | Parameter | Description |
| :--- | :--- | :--- |
| **`setup`** | `userData` | Maps the active socket connection to the user's Mongoose ID room. |
| **`Join Chat`** | `room_id` | Enrolls the user socket to a unique chat room session. |
| **`typing`** | `room_id` | Broadcasts a typing state status to all other participants in the room. |
| **`stop typing`** | `room_id` | Emits a stop typing state to other participants. |
| **`new message`** | `messageData` | Parses recipient lists and dynamically forwards the payload to online users. |
| **`disconnect`** | *None* | Flushes the user's socket ID mapping from the online status cache. |

---

## ⚙️ Development & Server Set Up

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) and a **MongoDB** connection string ready.

### 2. Configure Environment Variables
Create or verify your config files inside `src/config/`. The server automatically checks `.env_local` or `.env_live` depending on the running arguments.

Key variables in `src/config/.env_local`:
```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
SITE_PREFIX="/api/auth"
```

### 3. Running Locally
To launch the server with `nodemon` in development mode:
```bash
npm run local
```
This script sets the environment to local and boots up the API on `http://localhost:5000`.

### 4. Running in Production
To spin up instances under `PM2` clustering:
```bash
npm run live
```

---

## 🔒 Important Security Advisory

> [!CAUTION]
> The backend current password encryption engine (`src/helper/db_functions.js`) relies on symmetric `aes-256-cbc` with a static key hardcoded inside the codebase. While passwords are encrypted, they are reversible. 
> 
> **Recommendation**: Standard production deployments must migrate to standard one-way password hashing algorithms (e.g. `bcrypt` or `argon2`) utilizing salt parameters.
