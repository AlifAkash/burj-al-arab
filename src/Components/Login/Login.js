import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {UserContext} from "../../App";
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {
        firebase.initializeApp(firebaseConfig)
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            const {displayName, email} = user
            const signedInUser = {name : displayName, email};
            setLoggedInUser(signedInUser);
            history.replace(from);
          })
          .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
    }

    return (
        <div>
            <h1>Log In Here</h1>
            <button onClick={handleGoogleSignIn}>Sign In With Google</button>
        </div>
    );
};

export default Login;