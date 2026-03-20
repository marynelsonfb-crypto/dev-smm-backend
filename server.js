const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const API_URL = "https://yoyomedia.in/api/v2";

app.post("/order", async (req, res) => {
  const { apiKey, service, link, quantity } = req.body;

  try {
    const params = new URLSearchParams();
    params.append("key", apiKey);
    params.append("action", "add");
    params.append("service", service);
    params.append("link", link);
    params.append("quantity", quantity);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params
    });

    const data = await response.json();

    console.log("API RESPONSE:", data);

    res.json(data);

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: "API failed" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});