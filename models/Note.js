import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    tenantId: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: "Tenant", 
         required: true 
        },

    userId: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: "User",
          required: true 
        },

    title: { 
        type: String,
         required: true
         },
         
    content: { 
        type: String,
         required: true 
        },
  },

  { timestamps: true }
);


export default mongoose.model("Note", noteSchema);
