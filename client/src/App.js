import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import {
  addProduct,
  addListOfProducts,
} from "./redux/reducers/product-list/ProductListActions";

import { auth, persistUser, firestore } from "./utils/FirebaseUtils";
import { setCurrentUser } from "./redux/reducers/user/UserActions";
import { setInitialized } from "./redux/reducers/firebase/FirebaseAction";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import EmailActionHandler from "./pages/EmailActionHandler";
import SendVerificationEmail from "./pages/SendVerificationEmail";
import UpdatePassword from "./pages/UpdatePassword";
import UpdateEmail from "./pages/UpdateEmail";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import Order from "./pages/Order";
import OrderTracking from "./pages/OrderTracking";

import NavBar from "./layouts/NavBar";
import Footer from "./layouts/Footer";

import useStyles from "./styles/AppStyles";
import ProductPage from "./pages/ProductPage";

const App = ({
  currentUser,
  firebaseInitialized,
  setCurrentUser,
  setInitialized,
  addListOfProducts,
  addProduct,
}) => {
  //Styles
  const classes = useStyles();

  useEffect(() => {
    const unsubscribeToFirebase = auth.onAuthStateChanged(async (userAuth) => {
      // On facebook and Google auth below method will store user object in the database
      // on Email and password auth, since user is already stored in database below method will just return that stored entry
      const user = await persistUser(userAuth);
      setCurrentUser(user);

      //Set Firebase state
      setInitialized();
    });

    // Get products data
    const collectionRef = firestore.collection("products");

    const unsubscribeToSnapshot = collectionRef.onSnapshot(
      (collectionSnapshot) => {
        const products = collectionSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        addListOfProducts(products);
      }
    );

    return () => {
      unsubscribeToFirebase();
      unsubscribeToSnapshot();
    };
  }, [setCurrentUser, setInitialized, addProduct, addListOfProducts]);

  return (
    <div className={classes.App}>
      <NavBar />
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/shop" render={() => <Shop />} />

        <Route
          exact
          path="/product/:product_id"
          render={({ match }) =>
            firebaseInitialized ? (
              <ProductPage match={match} />
            ) : (
              <Redirect to="/" />
            )
          }
        />

        {/* Login Route ==> Protected Route */}
        <Route
          exact
          path="/login"
          render={() =>
            firebaseInitialized ? (
              currentUser ? (
                <Redirect to="/account" />
              ) : (
                <Login />
              )
            ) : (
              <Redirect to="/" />
            )
          }
        />

        {/* Signup Route ==> Protected Route */}
        <Route
          exact
          path="/signup"
          render={() =>
            firebaseInitialized ? (
              currentUser ? (
                <Redirect to="/account" />
              ) : (
                <Signup />
              )
            ) : (
              <Redirect to="/" />
            )
          }
        />

        {/* Account Route ==> Protected Route */}
        <Route
          path="/account"
          render={() =>
            firebaseInitialized && currentUser ? (
              <Account />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route exact path="/auth/:code" render={() => <EmailActionHandler />} />
        <Route
          exact
          path="/verifyEmail"
          render={() => <SendVerificationEmail />}
        />

        {/* // TODO: Update password Route ==> Protected Route */}
        <Route exact path="/updatePassword" render={() => <UpdatePassword />} />

        {/* // TODO: Update Email Route ==> Protected Route */}
        <Route exact path="/updateEmail" render={() => <UpdateEmail />} />

        {/* // Checkout Route ==> Protected Route */}
        <Route
          exact
          path="/checkout"
          render={() => (currentUser ? <Checkout /> : <Redirect to="/login" />)}
        />

        {/* //Cart Route */}
        <Route exact path="/cart" render={() => <Cart />} />

        {/* // Collection Route */}
        <Route exact path="/collection/:collectionId" component={Category} />

        {/* // Payment Done Router ==> Protected Route */}
        <Route
          exact
          path="/order/:order_id"
          render={() => (currentUser ? <Order /> : <Redirect to="/" />)}
        />

        {/* // Payment Done Router ==> Protected Route */}
        <Route
          exact
          path="/order_tracking/:order_id"
          render={() => (currentUser ? <OrderTracking /> : <Redirect to="/" />)}
        />
      </Switch>
      <Footer />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setInitialized: () => dispatch(setInitialized()),
  addProduct: (product) => dispatch(addProduct(product)),
  addListOfProducts: (products) => dispatch(addListOfProducts(products)),
});

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  firebaseInitialized: state.firebase.initialized,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
