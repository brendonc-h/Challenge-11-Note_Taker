const router = require('express').Router();
//const store = require('../db/store');
const path = require('path');
const db = path.join(__dirname, '../db/db.json');
const fs = require('fs').promises;
const uuid = require('../helpers/uuid');

async function getNotes() {
    const dataCont = await fs.readFile(db, "utf-8");
    console.log(dataCont);
    let notes = JSON.parse(dataCont)

    return notes;
}


async function addNote(body) {
    const { title, text } = body;
    const dataCont = await fs.readFile(db, "utf-8");
    let notes = JSON.parse(dataCont)
    const newNote = {
        title: title,
        text: text,
        id: uuid()
    }
    notes.push(newNote)
    return await fs.writeFile(db, JSON.stringify(notes))
}

async function removeNote(id) {
    const dataCont = await fs.readFile(db, "utf-8");
    let notes = JSON.parse(dataCont)
    let removeIndex = notes.findIndex(item => item.id == id)
    if( removeIndex != -1 ) {
        notes.splice(removeIndex, 1)
    }
   
    return await fs.writeFile(db, JSON.stringify(notes))
}
//responding all notes with the database

router.get('/notes', (req, res) => {

    getNotes()
        .then((notes) => {
            res.json(notes);
        })
        .catch((err) => res.status(500).json(err));
});
// makes the post for the routes
router.post('/notes', (req, res) => {

    addNote(req.body)
        .then((note) => res.json(note))
        .catch((err) => res.status(500).json(err));
});

//remove notes from the database

router.delete('/notes/:id', (req, res) => {
    
        removeNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch((err) => res.status(500).json(err));
});

module.exports = router;