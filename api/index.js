import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../config/db.js";
import authRoutes from "../routes/authRoutes.js";
import noteRoutes from "../routes/noteRoutes.js";
import tenantRoutes from "../routes/tenantRoutes.js";


dotenv.config({ quiet: true });
const app = express();
connectDB();

// Middleware
app.use(cors({  
  origin: "https://multi-tenant-saa-s-notes-app-fronte.vercel.app", 
  credentials: true,
  methods:["GET","POST","PUT","PATCH","DELETE"],
  exposedHeaders:["Authorization"],
}));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);
app.use("/tenants", tenantRoutes);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));


app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
