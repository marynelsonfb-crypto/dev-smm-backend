const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// ✅ TEST ROUTE (IMPORTANT)
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// 🔥 PLACE ORDER API (your main logic)
app.post("/order", async (req, res) => {
  try {
    const { api_url, api_key, service, link, quantity } = req.body;

    const response = await axios.post(api_url, {
      key: api_key,
      action: "add",
      service: service,
      link: link,
      quantity: quantity,
    });

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

// 🚀 START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
