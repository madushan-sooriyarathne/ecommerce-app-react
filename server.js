/* eslint-disable no-process-env */
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const stripeLoader = require("stripe");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express(),
  stripe = new stripeLoader(process.env.STRIPE_SECRET_KEY),
  port = process.env.PORT || 5000;

// middleware configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// create a stripe card and attach it to given customer id
const createCard = async (customerId, token) => {
  try {
    const card = await stripe.customers.createSource(customerId, {
      source: token.id,
    });

    return card;
  } catch (error) {
    console.error(`Error occurred while creating the card : ${error.message}`);
  }
};

// crete a stripe user if user not already exists
createCustomer = async (customerDetails) => {
  try {
    const customer = await stripe.customers.create({
      address: customerDetails.billing_address,
      email: customerDetails.email,
      name: customerDetails.name,
      phone: customerDetails.phone,
      shipping: {
        address: customerDetails.shipping_address,
        name: customerDetails.name,
        phone: customerDetails.phone,
      },
    });

    return customer;
  } catch (error) {
    console.log(
      `Error occurred while creating the customer : ${error.message}`
    );
  }
};

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/", "index.html"));
});

// Stripe payment route
app.post("/payment", async (req, res) => {
  let customerId = "";

  // if customer already in stripe db, use that ref to make the charge
  if (req.body.customerDetails.stripeCustomerId) {
    customerId = req.body.customerDetails.stripeCustomerId;
    // otherwise create a customer in stipe db and attach the card
  } else {
    // creating the customer
    const customer = await createCustomer(req.body.customerDetails);

    customerId = customer.id;
  }

  const card = await createCard(customerId, req.body.token);

  try {
    const data = await stripe.charges.create({
      amount: parseInt(req.body.amount),
      currency: "usd",
      source: card.id,
      customer: customerId,
      receipt_email: req.body.customerDetails.email,
      metadata: {
        phone: req.body.customerDetails.phone,
      },
    });

    // tODO : on a successful payment store the order in db

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Listen to incoming requests
app.listen(port, (error) => {
  if (error) {
    console.log(error.message);
  }
  console.log(`Server running on port ${port}`);
});
