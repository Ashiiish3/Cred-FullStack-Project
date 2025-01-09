const notesModel = require("../models/notes.model")
// Creating notes
const notesCreate = async (req, res) => {
    const { title, content } = req.body
    if (!title || !content) {
        return res.status(400).send({ message: "Please fill in all fields." })
    }
    try {
        if (req.file) {
            await notesModel.create({ title, content, notesImage: req?.file?.filename, userId: req.user._id, name: req.user.name })
            res.status(200).json({ message: "Note has been created successfully." })
        } else {
            await notesModel.create({ title, content, userId: req.user._id, name: req.user.name })
            res.status(200).json({ message: "Note has been created successfully." })
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}
// Deleting notes
const notesDelete = async (req, res) => {
    const { notesId } = req.params
    try {
        const isNoteExist = await notesModel.findById(notesId)
        if (!isNoteExist) {
            return res.status(400).json({ message: "Notes not Exist." })
        }
        if (isNoteExist.userId != req.user._id) {
            return res.status(400).json({ message: "You don't have permission to detete this Note." })
        }
        await notesModel.findByIdAndDelete(notesId)
        res.status(200).json({ message: "Note has been deleted." })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}
// Gets all notes of user
const getAllNotes = async (req, res) => {
    const { userId } = req.params
    try {
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }
        if (userId != req.user._id) {
            return res.status(403).json({ message: "You don't have permission to view this note." })
        }
        const allUserNotes = await notesModel.find({ userId })
        if (allUserNotes.length == 0) {
            return res.status(400).json({ message: "No notes found." })
        }
        res.status(200).json({ allUserNotes })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}
// Gets notes by id of user
const getSingleNote = async (req, res) => {
    const { noteId } = req.params
    try {
        const isNoteExist = await notesModel.findById(noteId)
        if (!isNoteExist) {
            return res.status(400).json({ message: "Notes not Exist." })
        }
        if (isNoteExist.userId != req.user._id) {
            return res.status(400).json({ message: "You don't have permission to get this Note." })
        }
        res.status(200).json({ isNoteExist })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}
// update notes
const updateNotes = async (req, res) => {
    const { title, content, notesImage } = req.body
    const { noteId } = req.params
    try {
        const updatedNoteData = {
            title,
            content,
            notesImage: req?.file?.filename
        }
        const isNoteExist = await notesModel.findById(noteId)
        if (!isNoteExist) {
            return res.status(400).json({ message: "Notes not Exist." })
        }
        if (isNoteExist.userId != req.user._id) {
            return res.status(400).json({ message: "You don't have permission to get this Note." })
        }
        if (req.file) {
            const updatedNote = await notesModel.findByIdAndUpdate(noteId, updatedNoteData, { new: true })
            res.status(200).json({ message: "Note has been updated.", Note: updatedNote })
        } else {
            const updatedNote = await notesModel.findByIdAndUpdate(noteId, { ...req.body }, { new: true })
            res.status(200).json({ message: "Note has been updated.", Note: updatedNote })
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}
// Admin
// getting all notes by Admin
const getAllNotesByAdmin = async (req, res) => {
    try {
        const AllNotes = await notesModel.find()
        if (!AllNotes.length > 0) {
            return res.status(400).json({ message: "Notes not exist." })
        }
        res.status(200).json({ message: "Notes get Successfully.", AllNotes })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}
// get single note by Admin
const getSingleNotebyAdmin = async (req, res) => {
    const { noteId } = req.params
    try {
        const Note = await notesModel.findById(noteId)
        if (!Note) {
            return res.status(400).json({ message: "Notes not Exist." })
        }
        res.status(200).json({ Note })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}
// update note by Admin
const updateNotebyAdmin = async (req, res) => {
    const { title, content, notesImage } = req.body
    const { noteId } = req.params
    try {
        const updatedNoteData = {
            title,
            content,
            notesImage: req?.file?.filename
        }
        const Note = await notesModel.findById(noteId)
        if (!Note) {
            return res.status(400).json({ message: "Notes not Exist." })
        }
        if (req.file) {
            const updatedNote = await notesModel.findByIdAndUpdate(noteId, updatedNoteData, { new: true })
            res.status(200).json({ message: "Note has been updated.", Note: updatedNote })
        } else {
            const updatedNote = await notesModel.findByIdAndUpdate(noteId, { ...req.body }, { new: true })
            res.status(200).json({ message: "Note has been updated.", Note: updatedNote })
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}
// delete notes by Admin
const deleteNotesbyAdmin = async (req, res) => {
    const { noteId } = req.params
    try {
        await notesModel.findByIdAndDelete(noteId)
        res.status(200).json({ message: "Note has been Deleted." })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}
module.exports = { notesCreate, notesDelete, getAllNotes, getSingleNote, updateNotes, getAllNotesByAdmin, deleteNotesbyAdmin, updateNotebyAdmin, getSingleNotebyAdmin }