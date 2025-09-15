import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema({

  name: { 
     type: String,
     required: true,
     unique: true 
    },

  subscription: { 
     type: String,
     enum: ["Free", "Pro"],
     default: "Free"

    }
},

{ timestamps: true }

);

export default mongoose.model("Tenant", tenantSchema);
