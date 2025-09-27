import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import productRouter from "./routes/product.js";
import userRouter from "./routes/user.js";
import orderRouter from "./routes/order.js";
import wishlistRouter from "./routes/wishlist.js";
import connectToDatabase from "./db/db.js";
import path from "path";
import { fileURLToPath } from "url";

connectToDatabase();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Define your allowed origins as an array
const allowedOrigins = [
  "https://ecom-frontend-gules.vercel.app", // Vercel frontend
  "http://localhost:5173", // Port for local development
];

// Configure CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Bypass the origin check if the request has no origin (e.g., Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

// Use the configured CORS middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public/uploads")));

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/wishlist", wishlistRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
