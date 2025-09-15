
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email, password);

  const user = await User.findOne({ email }).populate("tenantId");

   if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const isMatch = await user.matchPassword(password);
  console.log("Password match:", isMatch);

    if (user && isMatch) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      tenant: user.tenantId,
      token: generateToken(user._id),
    });

  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};


// Invite User (Admin only)
 export const inviteUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // fields check
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // duplicate email check
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // naya user create in same tenant
      const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      tenantId: req.user.tenantId, // 👈 admin ke tenant se link hoga
    });

    res.status(201).json({
      message: "User invited successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error inviting user", error: error.message });
  }
};