import Note from "../models/Note.js";


// ======================== Create Notes =====================
export const createNote = async (req, res) => {
  try {
    const note = await Note.create({
      tenantId: req.user.tenantId,
      userId: req.user._id,
      title: req.body.title,
      content: req.body.content

    });

    // if (req.user.role !== "member") {
    //  return res.status(403).json({ message: "Only members can create notes" });
    //  }

    res.status(201).json({ message: "Note Create Successful", note: note });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




// ======================== View Notes ================================
export const getNotes = async (req, res) => {
  const notes = await Note.find({ tenantId: req.user.tenantId });
  res.json(notes);
};




// ======================== Update Notes ================================
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: id, tenantId: req.user.tenantId },
      { title, content },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// =========================== Delete Notes ===============================
export const deleteNote = async (req, res) => {
  const note = await Note.findOneAndDelete({
    _id: req.params.id,
    tenantId: req.user.tenantId
  });
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json({ message: "Note deleted" });
};
