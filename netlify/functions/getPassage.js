const fetch = require("node-fetch");

exports.handler = async (event) => {
  const { passage } = event.queryStringParameters;
  const apiKey = process.env.ESV_API_KEY;

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
        body: `Error fetching passage: ${response.statusText}`,
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
      body: `Server Error: ${error.message}`,
    };
  }
};
