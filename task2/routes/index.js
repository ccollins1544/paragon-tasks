import { Router } from "express";
const router = Router();
import { increment, decrement, getCount, resetCount, setCount, multiply } from "../controllers/count.js";

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

router.get("/count", getCount);
router.post("/increment", increment);
router.post("/decrement", decrement);
router.post("/multiply", multiply);
router.post("/reset", resetCount);
router.post("/set", setCount);

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

export default router;
