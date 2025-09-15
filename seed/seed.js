import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Tenant from "../models/Tenant.js";
import User from "../models/User.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// JSON file read karo
const dataPath = path.join(__dirname, "seedData.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();
    await Tenant.deleteMany();
    await User.deleteMany();

    for (let t of data.tenants) {
      const tenant = await Tenant.create({ name: t.name, subscription: t.subscription });
      for (let u of t.users) {
        await User.create({
          tenantId: tenant._id,
          name: u.name,
          email: u.email,
          password: u.password, // ye model ke andar save hone se pehle bcrypt hash ho jayega
          role: u.role
        });
      }
    }

    console.log("✅ Seed data inserted");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
