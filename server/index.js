const express = require('express')
const sqlite3 = require('sqlite3')
const app = express()
const port = 4004
app.use(express.json())
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
const db = new sqlite3.Database('server.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run('CREATE TABLE IF NOT EXISTS subjects (id INTEGER PRIMARY KEY, subject TEXT)', (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            } else {
                console.log('Subjects table created successfully.');
            }
        });
    }
});

const createSubjectFolder = (subject) => {
    const tableName = `${subject}_folder`; // Construct the table name dynamically
    db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY, title TEXT UNIQUE, content TEXT)`, (err) => {
        if (err) {
            console.error(`Error creating table ${tableName}:`, err.message);
        } else {
            console.log(`Subject table ${tableName} created successfully.`);
        }
    });
}

function insertSubject(subject) {
    db.run('INSERT OR IGNORE INTO subjects (subject) VALUES (?)', [subject], (err) => {
        if (err) {
            console.error('Error inserting subject:', err.message);
        } else {
            console.log('Subject inserted successfully');
        }
    });
}

app.get('/put', (req,res) => {
    res.send("hello world")
})
app.get('/returnSubjects', (req,res) => {
    db.all('SELECT * FROM subjects', (err, rows) => {
        if (err) {
            console.error('Error querying data:', err.message);
        } else {
            console.log('Rows:', rows);
            res.status(200).send(rows)
        }
    });
})

app.get('/createNewSubject/:subject', (req,res) => {
    const subjectName = req.params.subject;
    createSubjectFolder(subjectName)
    insertSubject(subjectName)
    res.send(200)
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})