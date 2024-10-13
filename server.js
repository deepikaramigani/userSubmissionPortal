const express = require('express');
const multer = require('multer');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// Setup SQLite Database
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.log("error")
  }
  console.log('Connected to the users database.');

  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    socialHandle TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    filename TEXT,
    FOREIGN KEY(userId) REFERENCES users(id)
  )`);
});

// Multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fs = require('fs');
    const path = './uploads';
    if (!fs.existsSync(path)){
      fs.mkdirSync(path);
  }
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Hardcoded admin credentials (in a real-world scenario, this should be stored securely, possibly in a database with hashing)


// API Endpoint to handle admin login
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Received login request:', username, password);
  const adminCredentials = {
    username: "admin",
    password: "admin123"  // In production, passwords should be encrypted
  }

  if (username === adminCredentials.username && password === adminCredentials.password) {
    return res.json({ success: true, message: 'Admin login successful' });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});


// API Endpoint to handle form submission
app.post('/submit', upload.array('images', 10), (req, res) => {
  const { name, socialHandle } = req.body;
  const images = req.files;

  db.run(`INSERT INTO users (name, socialHandle) VALUES (?, ?)`, [name, socialHandle], function(err) {
    if (err) {
      console.log("can not insert");
      return res.status(500).json({ error: err.message });
    }
    const userId = this.lastID;

    images.forEach(image => {
      db.run(`INSERT INTO images (userId, filename) VALUES (?, ?)`, [userId, image.filename]);
    });

    res.json({ message: 'User submission successful!' });
  });
});

// API Endpoint to get all user submissions
app.get('/api/users', (req, res) => {
  db.all(`SELECT users.id, users.name, users.socialHandle, GROUP_CONCAT(images.filename) AS images
          FROM users
          LEFT JOIN images ON users.id = images.userId
          GROUP BY users.id`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const result = rows.map(row => ({
      ...row,
      images: row.images ? row.images.split(',') : [],
    }));
    res.json(result);
  });
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
