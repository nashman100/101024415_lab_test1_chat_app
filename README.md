# COMP3133 Lab Test 1 Chat Application

A real-time chat application with user authentication, group messaging, and private messaging using **Socket.io, MongoDB, Express, and Node.js**.

## 🚀 Features
✅ User Authentication (Signup & Login using JWT)  
✅ Real-time group chat (Predefined rooms: Python, JavaScript, DevOps, Networking)  
✅ Private messaging between users  
✅ Messages are **saved to MongoDB** for persistence  
✅ Typing indicator for active chats  
✅ Clean and modern UI with **Bootstrap & CSS**  
✅ Logout functionality  

---

## Tech Stack
- **Frontend:** HTML5, CSS, Bootstrap, jQuery, JavaScript  
- **Backend:** Node.js, Express.js, Socket.io  
- **Database:** MongoDB with Mongoose  
- **Authentication:** JSON Web Tokens (JWT)  
- **WebSockets:** Socket.io for real-time messaging  

---

## 📂 Project Structure
```
📂 chat-application
 ├── 📂 Backend
 │   ├── server.js          # Main server file (Express + Socket.io)
 │   ├── models/            # Mongoose models (User, GroupMessage, PrivateMessage)
 │   ├── routes/            # Authentication routes
 │   ├── .env               # Environment variables
 ├── 📂 frontend
 │   ├── login.html         # Login page
 │   ├── signup.html        # Signup page
 │   ├── chat.html          # Chat UI
 │   ├── styles.css         # Custom styles
 ├── package.json
 ├── README.md              # Project documentation
 ├── .gitignore
```

---

## 🛠️ Installation & Setup
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/chat-application.git
cd chat-application
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a **`.env`** file in the root directory:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### **4️⃣ Run the Application**
```
cd .\Backend\
node .\server.js
```
📌 **The server will start at:**  
http://localhost:3000  

---

## 🏗️ How to Use
1️⃣ **Sign up** or **log in** to access the chat.  
2️⃣ **Join a predefined chat room** (Python, JavaScript, DevOps, Networking).  
3️⃣ **Send messages in real time** (messages are stored in MongoDB).  
4️⃣ **Use private messaging** to chat directly with another user.  
5️⃣ **See typing indicators** when someone is typing.  
6️⃣ **Click "Logout"** to end the session.  
