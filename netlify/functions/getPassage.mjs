import fetch from "node-fetch";

export const handler = async (event) => {
  const { passage } = event.queryStringParameters || {};
  const apiKey = process.env.ESV_API_KEY;

  if (!passage) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Passage query parameter is required." }),
    };
  }

  try {
    const response = await fetch(
      `https://api.esv.org/v3/passage/html/?q=${encodeURIComponent(
        passage
      )}&include-footnotes=false&include-footnote-body=false&include-headings=true&include-copyright=false&include-verse-numbers=true`,
      {
        headers: { Authorization: `Token ${apiKey}` },
      }
    );

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: `Error from API: ${response.statusText}`,
        }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
