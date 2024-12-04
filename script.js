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
