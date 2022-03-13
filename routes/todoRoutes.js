const express = require("express");
const {addNote, getNote, editNote, deleteNote, getAllNotes, deleteAllNotes} = require("../controllers/todoController");

const todoRouter = express.Router();

todoRouter.post('/addnote', addNote)
.patch('/editnote/:id', editNote)
.get('/getnote/:id', getNote)
.get('/getnote', getAllNotes)
.delete('/deletenote/:id',deleteNote)
.delete('/deletenote', deleteAllNotes);

module.exports = todoRouter;