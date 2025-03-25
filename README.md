# Todo List

This is a **Node.js** and **Express** based Todo List application that uses **MongoDB Atlas** as its database.

---

## Features

- Add new todo items
- Edit existing todo items
- Mark todo items as completed
- Delete todo items

---

## Installation and Usage

### 1. Clone the repository

```bash
git clone https://github.com/hongsheng27/express_Todo_list.git
cd express_Todo_list
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a .env file in the root directory of the project and add the following content:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
```

- `<username>`: Replace with your MongoDB username.
- `<password>`: Replace with your MongoDB password.
- `<cluster-url>`: Replace with your MongoDB Atlas cluster address (e.g., cluster0.v5azm.mongodb.net).
- `<database>`: Replace with your database name (e.g., todo-list).

### 4. Start the application

```bash
npm start
```

The application will run at http://localhost:3000.

---

## Tech Stack

- Backend Framework: Node.js, Express
- Database: MongoDB Atlas
- Template Engine: Handlebars
- CSS Framework: Bootstrap

---

### Project Structure

```
express_Todo_list/
├── config/
│   └── mongoose.js       # MongoDB connection configuration
├── models/
│   └── todo.js           # Todo model
├── public/               # Static files
├── routes/
│   ├── index.js          # Route definitions
│   └── todos.js          # Todo-related routes
├── views/
│   ├── layouts/
│   │   └── main.hbs      # Main layout template
│   ├── index.hbs         # Homepage template
│   └── edit.hbs          # Edit page template
├── .env                  # Environment variables
├── app.js                # Application entry point
├── package.json          # Project configuration
└── README.md             # Documentation
```
