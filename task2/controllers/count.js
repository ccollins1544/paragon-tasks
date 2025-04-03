import { Count } from "../models/count.js";

const initialCount = process.env.INITIAL_COUNT || 0;
const count = new Count(initialCount);

export const increment = (req, res) => {
  let { increment_by } = req.body || {};
  increment_by = Number(increment_by);

  try {
    count.increment(increment_by);
    return res.json({ count: count.value });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getCount = (req, res) => {
  try {
    return res.json({ count: count.value });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const resetCount = (req, res) => {
  try {
    count.reset();
    return res.json({ count: count.value });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/* 
export const decrement = (req, res) => {
  let { decrement_by } = req.body || {};
  decrement_by = Number(decrement_by);

  try {
    count.decrement(decrement_by);
    return res.json({ count: count.value });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const multiply = (req, res) => {
  let { multiplier } = req.body || {};
  multiplier = Number(multiplier);

  try {
    count.multiply(multiplier);
    return res.json({ count: count.value });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const setCount = (req, res) => {
  const { value } = req.body;

  try {
    count.value = value;
    return res.json({ count: count.value });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
*/
