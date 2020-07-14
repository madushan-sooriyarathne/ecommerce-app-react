# Winter Fashion - Just another e-commerce site made using React & Redux

Winter Fashion is an e-commerce website made using react with redux, Firebase as authentication platform, database, and storage & stripe as payment engine. It also has a small node backend to handle stripe payments.

Check the live demo [here](https://winter-fashion.herokuapp.com/)

### What this has

1. View products, add products to cart, checkout, inspect previous orders.

1. Search products.

1. Basic user management with Firebase Authentication

   - Users can signup using email & password / Google / Facebook
   - Users can delete their account
   - User can update their account details (including email & password if they signed in using email & password)
   - Reset password
   - Save favorite products

1. Handle payments using stripe with the help of small node backend

### Tech stack

**React** - Front-end
**Redux** - App wide state management
**Firebase** - User Authentication, Database & Storage
**Stripe** - Handle Payments
**Node JS** - Backend (handle stipe payments)

### Yet to do

This project is not yet complete as it still lacks some of the basic and mandatory functionality a normal e-commerce website has. Such as responsiveness in all devices. Every contribution to fix the below parts is more than welcome.

- Implement responsive design to support mobile & tablet devices.
- Create an admin panel to do basic admin works (Add, delete, update products, Manage users, Get Insights)
- Code documentation / Comments.
- Some series code refactoring.

###Run this in your local machine

1. clone the repo

```
git https://github.com/madushan-sooriyarathne/ecommerce-app-react
```

2. Install required npm libraries

```
npm install
```

3. Start the live server

```
npm run dev
```
