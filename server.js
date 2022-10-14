const express = require('express');
const path = require('path');
const fs = require('fs');

const uuid = require('./helpers/uuid.js')

const PORT = process.env.PORT || 3001;

//get express middleware 
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));
app.use(require(".routes"));
app.listen(PORT, () =>
console.log('App listening at local host')
);

// get routes for the homepage
app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))
);
// route for api notes for notes.html
app.get('/api/notes', (req,res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// get route for db.json file
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'))
});
// searched route

app.get('/api/notes/:id', (req, res) => {
    const choiceNote = req.params.id;
    res.json(choiceNote)
});

// post creating notes
app.post('/api/notes', (req,res) => {
    const makeNote = req.body;
    makeNote.id = uuid();

    let 
})