// Set the initial count on page load by /count route
fetch("/count")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("count").textContent = data.count;
  });

// Add event listener to the increment button
document.getElementById("increment").addEventListener("click", async () => {
  try {
    const response = await fetch("/increment", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ increment_by: 1 }),
    });
    const contentType = response.headers.get("content-type");

    let data = null;
    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    const { count } = data || {};
    if (count) {
      document.getElementById("count").textContent = count;
    } else {
      document.getElementById("error").textContent = "Error Incrementing";
    }
  } catch (error) {
    document.getElementById("error").textContent = "Error Incrementing";
    console.error(error);
  } finally {
    // Clear the input field
    document.getElementById("error").textContent = "";
  }
});

// Add event listener to the form
document.getElementById("counterForm").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent page reload
  let multiplier = Number(document.getElementById("multiplier").value);

  try {
    const response = await fetch("/multiply", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ multiplier }),
    });
    const contentType = response.headers.get("content-type");

    let data = null;
    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    const { count } = data || {};
    if (count) {
      document.getElementById("count").textContent = count;
    } else {
      document.getElementById("error").textContent = "Error Multiplying";
    }
  } catch (error) {
    document.getElementById("error").textContent = "Error Multiplying";
    console.error(error);
  } finally {
    // Clear the input field
    document.getElementById("multiplier").value = "";
    document.getElementById("error").textContent = "";
  }
});

document.getElementById("reset").addEventListener("click", async () => {
  try {
    const response = await fetch("/reset", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    const contentType = response.headers.get("content-type");

    let data = null;
    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    const { count } = data || {};
    if (count != null) {
      document.getElementById("count").textContent = count;
    } else {
      document.getElementById("error").textContent = "Error Resetting";
    }
  } catch (error) {
    document.getElementById("error").textContent = "Error Resetting";
    console.error(error);
  } finally {
    // Clear the input field
    document.getElementById("error").textContent = "";
  }
});
