const express = require('express');
const fs = require('fs');
const path = require('path');
const api = require('./routes/apiRoutes/index');


const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.delete("/api/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync(".db/db.json"));
    const deleteNote = notes.filter((removeNote) => removeNote.id !== req.params.id);
    fs.writeFileSync("/db/db.json", JSON.stringify(deleteNote));
    res.json(deleteNote)
});

app.listen(PORT, function () {
    console.log("Listing on port " + PORT);
});
