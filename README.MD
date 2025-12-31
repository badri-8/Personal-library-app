📚 Personal Library API (FreeCodeCamp)

This is a Full Stack JavaScript API project built for the FreeCodeCamp Back End Development and APIs Certification.

The application allows users to manage a personal library by adding books, viewing books, adding comments, and deleting books.

🔗 Project Links

Live Demo:
http://localhost:3000/

Source Code:
https://github.com/your-username/personal-library

(Replace with your actual links before submission)

🚀 Features

Add a new book

View all books

View a single book by ID

Add comments to a book

Delete a single book

Delete all books

RESTful API structure

🛠 Technologies Used

Node.js

Express.js

Body-Parser

CORS

📁 Project Structure
personal-library/
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
│
├── routes/
│   └── api.js
│
├── public/
│   └── index.html
│
└── README.md

⚙️ Installation & Usage
1️⃣ Install dependencies
npm install

2️⃣ Start the server
node server.js


The server will run on:

http://localhost:3000

🔗 API Endpoints
➕ Add a Book
POST /api/books


Body: title

📄 Get All Books
GET /api/books

📘 Get Book by ID
GET /api/books/:id

💬 Add Comment to Book
POST /api/books/:id


Body: comment

❌ Delete Book by ID
DELETE /api/books/:id

❌ Delete All Books
DELETE /api/books

🧪 Testing

No automated tests included in this version

API tested manually using:

Browser

Postman

Built-in frontend (public/index.html)

⚠️ Notes

Data is stored in memory

Restarting the server will reset all data

This project is functionally equivalent to the FreeCodeCamp example

👤 Author

Badri K

📜 License

This project is open source and free to use.

✅ FCC TIP (IMPORTANT)

Before submitting:

Replace Live Demo link

Replace Source Code GitHub URL

Ensure server runs without errors
