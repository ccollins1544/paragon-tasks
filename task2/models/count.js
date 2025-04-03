export class Count {
  constructor(initialValue = 0) {
    this.value = Number(initialValue);
  }

  increment(increment_by) {
    // Ensure increment_by is a number
    if (isNaN(increment_by)) {
      throw new Error("Increment by must be a number");
    }

    // Ensure increment_by is positive
    if (increment_by < 0) {
      throw new Error("Increment by must be positive");
    }

    // Ensure increment_by is an integer
    if (!Number.isInteger(increment_by)) {
      throw new Error("Increment by must be an integer");
    }

    // Ensure increment_by is not too large
    if (increment_by > 1000000) {
      throw new Error("Increment by must be less than 1,000,000");
    }

    // Ensure increment_by is not too small
    if (increment_by < 1) {
      throw new Error("Increment by must be greater than 0");
    }

    // Increment the count by increment_by
    this.value += increment_by;
  }

  decrement(decrement_by) {
    // Ensure decrement_by is a number
    if (isNaN(decrement_by)) {
      throw new Error("Decrement by must be a number");
    }

    // Ensure decrement_by is positive
    if (decrement_by < 0) {
      throw new Error("Decrement by must be positive");
    }

    // Ensure decrement_by is an integer
    if (!Number.isInteger(decrement_by)) {
      throw new Error("Decrement by must be an integer");
    }

    // Ensure decrement_by is not too large
    if (decrement_by > 1000000) {
      throw new Error("Decrement by must be less than 1,000,000");
    }

    // Ensure decrement_by is not too small
    if (decrement_by < 1) {
      throw new Error("Decrement by must be greater than 0");
    }

    // Decrement the count
    this.value -= decrement_by;
  }

  multiply(multiplier) {
    // Ensure multiplier is a number
    if (isNaN(multiplier)) {
      throw new Error("Multiplier must be a number");
    }

    // Ensure multiplier is positive
    if (multiplier < 0) {
      throw new Error("Multiplier must be positive");
    }

    // Ensure multiplier is an integer
    if (!Number.isInteger(multiplier)) {
      throw new Error("Multiplier must be an integer");
    }

    // Ensure multiplier is not too large
    if (multiplier > 1000000) {
      throw new Error("Multiplier must be less than 1,000,000");
    }

    // Ensure multiplier is not too small
    if (multiplier < 1) {
      throw new Error("Multiplier must be greater than 0");
    }

    // Multiply the count
    this.value *= multiplier;
  }

  reset() {
    this.value = 0;
  }

  set(value) {
    // Ensure value is a number
    if (isNaN(value)) {
      throw new Error("Value must be a number");
    }

    // Ensure value is positive
    if (value < 0) {
      throw new Error("Value must be positive");
    }

    // Ensure value is an integer
    if (!Number.isInteger(value)) {
      throw new Error("Value must be an integer");
    }

    this.value = value;
  }
}
