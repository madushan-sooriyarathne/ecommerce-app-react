import firebase from "firebase/app";

// Other firebase product modules
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initializing the firebase object
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

// Google Auth Provider
let googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "consent" });

// Facebook Auth Provider
let facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.setCustomParameters({ display: "popup" });

// Database Operations
const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocumentSnap = await firestore.collection("users").doc(uid).get();
    return {
      uid,
      ...userDocumentSnap.data(),
    };
  } catch (error) {
    console.error(error.message);
  }
};

// Store signed-up user in firestore database
const persistUser = async (userAuth, additionalData) => {
  if (!userAuth) return null;
  const {
    displayName,
    email,
    emailVerified,
    phoneNumber,
    photoURL,
    uid,
  } = userAuth;
  const currentUserRef = firestore.collection("users").doc(uid);
  const userSnap = await currentUserRef.get();
  // IF user snap not exists (we don't need to override if there is any data)
  if (!userSnap.exists) {
    // Set data
    currentUserRef
      .set({
        displayName,
        email,
        emailVerified,
        phoneNumber,
        photoURL,
        providerId: userAuth.providerData[0].providerId,
        cart: [],
        stripeCustomerId: null,
        ...additionalData,
      })
      .then(() => {
        console.log("Successfully stored the user in db");
      })
      .catch((error) => {
        console.error("error storing user in db", error.message);
      });
  }

  return getUserDocument(userAuth.uid);
};

// update current users properties
const updateCurrentUser = async (userId, updatedFields) => {
  const userRef = firestore.collection("users").doc(userId);

  try {
    const userSnap = await userRef.get();

    if (userSnap.exists) {
      userRef.update(updatedFields);
    } else {
      console.error("User does not exists in the database");
    }
  } catch (error) {
    console.error("Error occurred while retrieving the customer");
  }
};

// Save the order in firestore database
const saveOrder = async (orderDetails, order_id) => {
  const orderRef = firestore.collection("orders").doc(order_id);

  try {
    const orderSnap = await orderRef.get();
    // if order record already exists, skip. Otherwise save the order in DB
    if (!orderSnap.exists) {
      await orderRef.set(orderDetails);
      return { status: true, message: `Successfully stored the order in DB` };
    } else {
      return { status: false, message: "order already exists!" };
    }
  } catch (error) {
    return {
      status: false,
      message: `Error occurred while saving order in DB : ${error.message}`,
    };
  }
};

// Authentication Operations

// Signup / Sign in using Google
const signupWithGoogle = () => {
  return auth.signInWithPopup(googleProvider);
};

// Signup / Sign in using Facebook
const signupWithFacebook = () => {
  return auth.signInWithPopup(facebookProvider);
};

// Signup using Email & Password
const signupWithEmailAndPassword = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

// Sign in with Email & Password
const signInWithEmailAndPassword = async (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

//Sign out a user
const signOutUser = () => {
  return auth.signOut();
};

export default firebase;
export {
  auth,
  firestore,
  signupWithGoogle,
  signupWithFacebook,
  signInWithEmailAndPassword,
  signupWithEmailAndPassword,
  signOutUser,
  persistUser,
  saveOrder,
  updateCurrentUser,
};
