
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId,
     ref: "Tenant",
      required: true
     },
  name: { 
     type: String,
     required: true
     },

  email: { 
     type: String,
     unique: true, 
     required: true 
    },

  password: { 
     type: String,
     required: true
     },

  role: { type: String,
     enum: ["Admin", "Member"],
      default: "Member" 
    }

},

 { timestamps: true }

);


// Password hash
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


// Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
