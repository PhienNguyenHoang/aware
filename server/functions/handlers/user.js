const { admin, db } = require("../util/admin");

const config = require("../util/config");

const firebase = require("firebase");

firebase.initializeApp(config);

exports.signup = async (req, res) => {
  let userId, userToken;
  let destructObject = {};
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    const snapshot = await db.doc(`/users/${newUserData.name}`).get();
    if (snapshot.exist) {
      res.status(400).json({ name: "This name is taken!" });
    } else {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(
          newUserData.email,
          newUserData.password
        );
      userId = result.user.uid;
      userToken = result.user.getIdToken();
      destructObject.token = userToken.i;
      const { token } = destructObject;
      const userCredentials = {
        name: newUserData.name,
        email: newUserData.email,
        userId,
      };
      await db.doc(`/users/${newUserData.name}`).set(userCredentials);
      res.status(201).json({ token });
    }
  } catch (error) {
    console.log(error);
    if (error.code === "auth/email-already-in-use") {
      res.status(400).json({ email: "Email is already in use" });
    } else {
      res.status(500).json({ general: "something went wrong" });
    }
  }
};
