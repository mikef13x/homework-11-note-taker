
const express = require('express')
const { readFromFile, readAndAppend } = require ('./helpers/fsUtils')
const { v4: uuid } = require ("uuid");
const database = require("./db/db.json");
const fs = require('fs')

const path = require ("path");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);
app.get('/api/notes', (req, res) => {
    
    readFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
});
app.post('/api/notes', (req, res) => {
    const { title , note } = req.body;
    if(req.body) {
        const newNote = {
            title,
            note,
            note_id: uuid()
        }
    
     
    
    readAndAppend(newNote, database);
    res.json('note added successfully')
    }else {
        res.error('error adding note')
    }
})


app.listen(PORT, () => 
console.log(`App listening at http://localhost:${PORT}`))