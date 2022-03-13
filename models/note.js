const mongoose = require("mongoose");

// * id will be mongo _id 
const noteSchema = new mongoose.Schema({
    content: {
        type: String
    }
})

const NoteModel = mongoose.model('Note', noteSchema)
module.exports = NoteModel;