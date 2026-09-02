import "dotenv/config";
import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    }
  })
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is healthy" });
});

app.use("/api/products", productRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
