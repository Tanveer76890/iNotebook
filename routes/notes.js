const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const router = express.Router();

//Route 1:  Get all the notes using : get /api/notes/fetchallnotes -> login require
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error");
  }
});

//Route 2:add a new  notes using : post /api/notes/addnote -> login require
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    // description must be at least 5 chars long
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      console.log(req.body);
      const errors = validationResult(req);
      //if there are error then, return Bad request and the errors msg
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // create a new Note from particular person
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      //  console.log( req.user.id);
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  }
);

//Route 3:updating an existing notes using : put /api/notes/updatenote -> login require
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // create newnote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    
    // find the note to the updated and update it .
    let note =await Notes.findById(req.params.id);
    // console.log(note);
    if (!note) {
      res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
    res.json(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error");
  }
});

//Route 4: Deleting an existing notes using : DELETE /api/notes/deletenote -> login require
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    // find the note to the updated and update it .
    let note = await Notes.findById(req.params.id);
    // console.log(note);
    if (!note) {
      res.status(404).send("Not found");
    }
    // Allow deletion only if user owns this note 
    if (note.user.toString() !== req.user.id) {
      res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success": "Note has been Deleted", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error");
  }
});



module.exports = router;