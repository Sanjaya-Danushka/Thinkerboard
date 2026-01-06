import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import connectDB from "./config/db.js";

const app = express();
await connectDB();
app.use("/api/notes", noteRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
