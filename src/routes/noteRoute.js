const express = require("express");
const Note = require("../model/noteModel");
const noteRouter = express.Router();


noteRouter.post("/create",async(req,res)=>{
    const {title,description,userId} = req.body;

    try{
        const note = await Note.create({title,description,userId});
        res.status(201).json({message : "Note created", note});
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server Error!"});
    }
});

noteRouter.put("/update/:id",async(req,res)=>{
    const {title,description} = req.body;
    const noteId = req.params.id;

    // try{
    //     const updatedNote = await Notes.updateNote(note_Id,title,description);
    //     res.json({updatedNote});
    // }catch(err){
    //     console.log(err);
    //     res.status(500).json({error : "Internal Server Error"});
    // }
    try {
        const [updatedRowsCount, updatedNote] = await Note.update(
            { title, description },
            { where: { id: noteId }, returning: true }
        );

        if (updatedRowsCount > 0) {
            res.json({ message: "Note Updated", updatedNote: updatedNote[0] });
        } else {
            res.status(404).json({ error: "Note not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const noteId = req.params.id;

    try {
        const deletedRowsCount = await Note.destroy({ where: { id: noteId } });

        if (deletedRowsCount > 0) {
            res.json({ message: "Note deleted successfully" });
        } else {
            res.status(404).json({ error: "Note not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

noteRouter.get("/get/:userId", async (req, res) => {
    const userId = req.params.userId;

    // try {
    //     const userNotes = await Notes.getNotesByUserId(userId);
    //     res.json(userNotes );
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: "Internal Server Error" });
    // }

    try {
        const userNotes = await Note.findAll({ where: { userId } });
        res.json(userNotes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

noteRouter.get("/get/:userId", async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findByPk(userId);
        if (user) {
            const userNotes = await user.getNotes(); // Assuming you have a getNotes method in the User model
            res.json(userNotes);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = noteRouter;