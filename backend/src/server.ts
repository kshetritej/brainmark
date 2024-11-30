const express = require("express");
import { connectDB } from "./configs/dbconfig";

import cors from "cors";
import { contentRoute } from "./routes/content.route";
import authRoute from "./routes/auth.route";
import typeRoute from "./routes/type.route";
import tagRoute from "./routes/tag.route";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/content", contentRoute);
app.use("/api/auth", authRoute);
app.use("/api/type", typeRoute);
app.use("/api/tag", tagRoute);

app.listen(3000, () => {
  connectDB().then(() => console.log("Server runing on port 3000"));
});
