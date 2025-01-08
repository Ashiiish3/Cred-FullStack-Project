const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
    {
        name: String,
        title: String,
        content: String,
        notesImage : {
            type: String,
            default: "https://st3.depositphotos.com/18630962/31856/i/450/depositphotos_318568256-stock-photo-huai-mae-kamin-waterfall-srinakarin.jpg"
        },
        userId: {
            type: String,
            require: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const notesModel = mongoose.model("notes", notesSchema)

module.exports = notesModel;