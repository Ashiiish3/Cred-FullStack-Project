const express = require("express");
const { notesCreate, notesDelete, getSingleNote, getAllNotes, updateNotes, getAllNotesByAdmin, deleteNotesbyAdmin, updateNotebyAdmin, getSingleNotebyAdmin } = require("../controllers/notes.controller");
const isAuth = require("../middleware/Auth");
const upload = require("../config/multer");
const isAdmin = require("../middleware/Admin");

const notesRouter = express.Router()

notesRouter.post("/create", isAuth, upload.single("notesImage"), notesCreate)
notesRouter.delete("/delete/:notesId", isAuth, notesDelete)
notesRouter.get("/getAllNotes/:userId", isAuth, getAllNotes)
notesRouter.get("/getSingleNote/:noteId", isAuth, getSingleNote)
notesRouter.patch("/updateNotes/:noteId", isAuth, upload.single("notesImage"), updateNotes)
// Route for Admin
notesRouter.get("/getAllNotesAdmin", isAuth, isAdmin, getAllNotesByAdmin)
notesRouter.get("/singleNoteAdmin/:noteId", isAuth, isAdmin, getSingleNotebyAdmin)
notesRouter.put("/updateNotAdmin/:noteId", isAuth, isAdmin, upload.single("notesImage"), updateNotebyAdmin)
notesRouter.delete("/deleteNotesAdmin/:noteId", isAuth, isAdmin, deleteNotesbyAdmin)

module.exports = notesRouter;