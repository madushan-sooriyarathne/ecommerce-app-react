const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const stripeLoader = require("stripe");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = express();
const stripe = new stripeLoader(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5000;

// Middleware configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/", "index.html"));
  });
}

app.post("/payment", async (req, res) => {
  try {
    const data = await stripe.charges.create({
      amount: parseInt(req.body.amount * 100),
      currency: "usd",
      source: req.body.token.id,
    });

    //TODO : on a successful payment store the order in db

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, (error) => {
  if (error) {
    console.log(error.message);
  }
  console.log("Server running on port " + port);
});
