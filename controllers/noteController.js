const notes = require("../models/noteModel");

exports.addNotesController = async (req, res) => {
  console.log("inside add notes");

  const { title, content, tags, isPinned } = req.body;
  const userid = req.payload;
  try {
    const newNotes = new notes({
      title,
      content,
      tags,
      isPinned,
      userId: userid,
    });
    await newNotes.save();
    res.status(200).json(newNotes);
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.getNotesController = async (req, res) => {
  console.log("Inside getuserNotes");
  const userId = req.payload;
  try {
    const userNotes = await notes.find({ userId });
    res.status(200).json(userNotes);
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.editNotesController = async (req, res) => {
  console.log("Inside editNotes controller");
  const { pid } = req.params;
  const { title, content, tags, isPinned } = req.body;
  const userid = req.payload;
  try {
    const updatedNotes = await notes.findByIdAndUpdate(
      { _id: pid },
      { title, content, tags, isPinned, userId: userid },
      { new: true }
    );
    await updatedNotes.save();
    res.status(200).json(updatedNotes);
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.removeNotesController = async (req, res) => {
  console.log("Inside removeNotesController");
  const { pid } = req.params;
  try {
    const removedNote = await notes.findByIdAndDelete({_id:pid})
    res.status(200).json(removedNote);
  } catch (err) {
    res.status(401).json(err);
  }
};


exports.searchNotesController = async (req, res) => {
  console.log("Inside searchNotes");
  const searchKey = req.query.search;

  const query = {
    $or: [
      {
        title: {
          $regex: searchKey,
          $options: "i",
        },
      },
      {
        tags: {
          $elemMatch: { $regex: searchKey, $options: "i" },
        },
      },
    ],
  };

  try {
    const allNotes = await notes.find(query);
    res.status(200).json(allNotes);
  } catch (err) {
    res.status(401).json(err);
  }
};