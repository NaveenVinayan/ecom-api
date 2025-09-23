import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import productRouter from "./routes/product.js"; 
import userRouter from "./routes/user.js"; 
import orderRouter from "./routes/order.js"; 
import connectToDatabase from "./db/db.js";


connectToDatabase();
const app = express();
app.use(cors(
  {origin: "http://localhost:5173",
    credentials: true})
);
app.use(express.json());
app.use(express.static("public/uploads"));
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});