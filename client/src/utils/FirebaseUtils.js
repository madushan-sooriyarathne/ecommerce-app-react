import firebase from "firebase/app";

// firebase product modules
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmIx3Lv5f84ClT0nyqQ7GNxLqb__TP91Q",
  authDomain: "winter-70a60.firebaseapp.com",
  databaseURL: "https://winter-70a60.firebaseio.com",
  projectId: "winter-70a60",
  storageBucket: "winter-70a60.appspot.com",
  messagingSenderId: "795447695806",
  appId: "1:795447695806:web:4dc4d55e25737e3d6681ef",
  measurementId: "G-X5PYEXXHNN",
};

// Initializing the firebase object
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth(); // firebase auth object
const firestore = firebase.firestore(); // firestore real time database object
const storage = firebase.storage(); // store object

// Google Auth Provider
let googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "consent" });

// Facebook Auth Provider
let facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.setCustomParameters({ display: "popup" });

// Store signed-up user in firestore database
const persistUser = async (userAuth, additionalData) => {
  if (!userAuth) return null;

  // destruct the userAuth object
  const {
    displayName,
    email,
    emailVerified,
    phoneNumber,
    photoURL,
    uid,
  } = userAuth;

  const currentUserRef = firestore.collection("users").doc(uid);

  try {
    const userSnap = await currentUserRef.get();

    // IF user snap not exists (we don't need to override if there is any data)
    if (!userSnap.exists) {
      // Set data
      try {
        await currentUserRef.set({
          displayName,
          email,
          emailVerified,
          phoneNumber,
          photoURL: photoURL
            ? photoURL
            : "https://firebasestorage.googleapis.com/v0/b/winter-70a60.appspot.com/o/img_avatar2.png?alt=media&token=2732be80-d271-4d99-9250-c2511b3db884",
          providerId: userAuth.providerData[0].providerId,
          address: {
            addressLineOne: "",
            addressLineTwo: "",
            country: "",
            city: "",
            postalCode: "",
          },
          cart: [],
          favorites: [],
          stripeCustomerId: null,
          ...additionalData,
        });
      } catch (error) {
        console.error("error storing user in db", error.message);
      }
    }
  } catch (error) {
    console.error(error.message);
  }

  return currentUserRef;
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

// Delete current user from auth System
const deleteUser = async () => {
  const userId = auth.currentUser.uid;

  // first we have to delete user from firebase
  try {
    const userRef = firestore.collection("users").doc(userId);
    await userRef.delete();
    // user is successfully deleted from firestore.
    // proceed with user deletion in auth
    try {
      await auth.currentUser.delete();
      // user deleted from firebase auth.
      return { status: "success" };
    } catch (error) {
      // log error to console
      console.error(`error deleting user from firebase auth ${error}`);
      return { status: "error", error: error };
    }
  } catch (error) {
    // log error to console
    console.error(`error deleting user from firestore ${error}`);
    return { status: "error", error: error };
  }
};

// add a item to current user's favorite list
const addToFavorite = async (userId, productId) => {
  const userRef = firestore.collection("users").doc(userId);

  try {
    const userSnap = await userRef.get();

    if (userSnap.exists) {
      userRef.update({ favorites: [...userSnap.data().favorites, productId] });
    } else {
      console.error("User does not exists in the database");
    }
  } catch (error) {
    console.error(`Error retrieving the user : ${error.message}`);
  }
};

// remove a item from current user's favorite list
const removeFavorite = async (userId, productId) => {
  const userRef = firestore.collection("users").doc(userId);

  try {
    const userSnap = await userRef.get();

    if (userSnap.exists) {
      userRef.update({
        favorites: userSnap.data().favorites.filter((fav) => fav !== productId),
      });
    } else {
      console.error("User does not exists in the database");
    }
  } catch (error) {
    console.error(`Error retrieving the user : ${error.message}`);
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
  storage,
  signupWithGoogle,
  signupWithFacebook,
  signInWithEmailAndPassword,
  signupWithEmailAndPassword,
  signOutUser,
  persistUser,
  saveOrder,
  updateCurrentUser,
  deleteUser,
  addToFavorite,
  removeFavorite,
};
