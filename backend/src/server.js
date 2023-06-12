import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

configDotenv();

async function bootstrap() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("💽 Database connected successfully!");

    app.listen(process.env.PORT, () => {
      console.log(`Example app listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Failed to connect database", error);
  }
}

bootstrap();
