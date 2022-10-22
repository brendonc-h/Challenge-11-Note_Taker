const path = require('path');
const router = require('express').Router();


//making notes with the notes html
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// all routes respond with index html
router.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));

});
module.exports = router;