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

// customerDetails expecting a object like below
// const customer = {
//   email: "",
//   phone: "",
//   name: "",
//   billing_address: {
//     city: "",
//     country: "",
//     line1: "",
//     line2: "",
//     postal_code: "",
//     state: "",
//   },
//   shipping_address: {
//     billing_address: {
//       city: "",
//       country: "",
//       line1: "",
//       line2: "",
//       postal_code: "",
//       state: "",
//     },
//   },
// };

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

const createCustomer = async (customerDetails) => {
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

app.post("/payment", async (req, res) => {
  let customerId = "";

  // if customer already in stripe db, use that ref to make the charge
  if (req.body.customerDetails.stripeCustomerId) {
    customerId = req.body.customerDetails.stripeCustomerId;
    // otherwise create a customer in stipe db and attach the card
  } else {
    // Creating the customer
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
