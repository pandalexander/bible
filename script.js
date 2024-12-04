document.getElementById("load-passages").addEventListener("click", async () => {
  const input = document.getElementById("input-passages").value;
  const passagesContainer = document.getElementById("passages-container");

  passagesContainer.innerHTML = "";

  const passages = input.split(",").map((p) => p.trim());

  for (const passage of passages) {
    try {
      // Call the Netlify function
      const response = await fetch(
        `/.netlify/functions/getPassage?passage=${encodeURIComponent(passage)}`
      );
      if (!response.ok) {
        throw new Error(`Failed to load passage: ${passage}`);
      }
      const data = await response.json();

      // Extract the HTML content
      const passageHTML = document.createElement("div");
      passageHTML.innerHTML = data.passages.join("");

      // Append to the container
      passagesContainer.appendChild(passageHTML);
    } catch (error) {
      console.error(error);
      const errorMessage = document.createElement("p");
      errorMessage.textContent = `Error loading ${passage}: ${error.message}`;
      passagesContainer.appendChild(errorMessage);
    }
  }
});

// JavaScript for Dark/Light Mode Toggle
const themeToggleButton = document.getElementById("theme-toggle");
const body = document.body;

// Check if the user prefers light mode based on system settings
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches
) {
  body.classList.add("light-mode");
  themeToggleButton.textContent = "🌙"; // Set button to moon (dark mode)
} else {
  body.classList.add("dark-mode");
  themeToggleButton.textContent = "🌞"; // Set button to sun (light mode)
}

// Toggle light/dark mode when button is clicked
themeToggleButton.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  body.classList.toggle("dark-mode");

  // Update button text based on the current theme
  if (body.classList.contains("light-mode")) {
    themeToggleButton.textContent = "🌙"; // Switch to moon
  } else {
    themeToggleButton.textContent = "🌞"; // Switch to sun
  }
});
