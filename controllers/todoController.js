const NoteModel = require("../models/note");

/*
    @params: {json_body}{content: String}
    @return: noteId
*/
const addNote = (req, res) => {
    const bodyContent = req.body.content;
    if(bodyContent == undefined || bodyContent.length == 0){
        return res.status(400).json({
            "success": true,
            "err": "data empty"
        });
    }
    const newNote = new NoteModel({content: bodyContent})
    newNote.save((err, note) => {
        if(err){
            return res.status(400).json({
                "success": false,
                "err": err
            });
        }
        return res.status(200).json({
            "success": true,
            "id": note._id
        });
    })
}


/*
    @params: {url_id}
    @return: note_document
*/
const getNote = (req, res) => {
    const noteId = req.params.id;
    NoteModel.findById(noteId, (err, note) => {
        if(err){
            console.error(err)
            return res.status(500).json({
                "success": false,
                "err": err
            });
        }
        if(!note){
            return res.status(404).json({
                "success": true,
                "err": "invalid ID"
            });
        }
        return res.status(200).json({
            "success": true,
            "note": note
        });
    })
}

/*
    @params: {url_id}
    @return: note_document
*/ 
const editNote = (req, res) => {
    const noteId = req.params.id;
    const notePatchBody = req.body;
    if(Object.keys(notePatchBody).length === 0){
        res.status(400).json({
            "success": false,
            "err": "Please provide field and values"
        });
    }
    NoteModel.findByIdAndUpdate(noteId, notePatchBody, {new: true}, (err, note) => {
        if(err){
            return res.status(500).send({
                "success": false,
                "err": err
            });
        }
        return res.status(200).json({
            "success": true,
            "note": note
        });
    })
}

/*
    @params: {url_id}
    @return: note_document
*/
const deleteNote = (req, res) => {
    const noteId = req.params.id;
    NoteModel.findByIdAndDelete(noteId, (err, note) => {
        if(err){
            return res.status(500).send({
                "success": false,
                "err": err
            });
        }
        if(!note){
            return res.status(400).send({
                "success": true,
                "err": "invalid ID"
            })
        }
        return res.status(200).json({
            "success": true,
            "note": note
        })
    })
}

/*
    @params: NONE
    @return: all notes
*/ 
const getAllNotes = (_, res) => {
    NoteModel.find({}, (err, notes) => {
        if(err){
            return res.status(500).send({
                "success": false,
                "err": err
            });
        }
        return res.status(200).json({
            "success": true, 
            "note": notes
        });
    })
}

/*
    @params: NONE
    @return: NONE
*/ 
const deleteAllNotes = (_, res) => {
    NoteModel.deleteMany({}, (err) => {
        if(err){
            return res.status(500).send({
                "success": false,
                "err": err
            });
        }
        return res.status(200).json({
            "success": true,
        })
    })
}

module.exports = {addNote, getNote, editNote, deleteNote, getAllNotes, deleteAllNotes}