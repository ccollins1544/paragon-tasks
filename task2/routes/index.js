import { Router } from "express";
const router = Router();
import { increment, getCount, resetCount } from "../controllers/count.js";

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

router.get("/count", getCount);
router.post("/increment", increment);
router.post("/reset", resetCount);

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

export default router;
