import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
const app = express();
await connectDB();
//middleware
app.use(express.json());
app.use(rateLimiter);
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });
app.use("/api/notes", noteRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
