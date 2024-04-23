
const fs = require('fs')
const express = require('express')
const { v4: uuid } = require ("uuid");
const database = require("./db/db.json");


const path = require ("path");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.static('public'))

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    
    fs.readFile('./db/db.json' , "utf-8", (err, data) => {
        res.json(JSON.parse(data))
    })
});
app.post('/api/notes', (req, res) => {
    const note = JSON.parse(fs.readFileSync('./db/db.json'))
    const newNote = req.body;
    newNote.id = uuid()
    note.push(newNote)
    fs.writeFileSync('./db/db.json', JSON.stringify(note))
    res.json(note)
})
app.delete('/api/notes/:id', (req, res)=> {
    const note = JSON.parse(fs.readFileSync('./db/db.json'))
    const newNote = note.filter(note => note.id !== req.params.id)
    fs.writeFileSync('./db/db.json', JSON.stringify(newNote))
    res.json(newNote)
})




app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => 
console.log(`App listening at http://localhost:${PORT}`))