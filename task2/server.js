import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
const { json } = bodyParser;
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import allRoutes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(json());
app.use(allRoutes);

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.post("/increment", (req, res) => {
//   const { count } = req.body;
//   res.send(`Hello, ${count}! Form submitted successfully.`);
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: err.message });
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
