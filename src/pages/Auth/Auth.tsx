// FirebaseUI
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

// React stuff
import React, { useEffect } from 'react';

// Auth service
import { auth } from '../../firebase';
import { selectUser } from '../../features/auth/authSlice';
import { useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (Boolean(user)) {
      navigate('/yugioh-card-tracker');
    }
  }, [user, navigate]);

  useEffect(() => {
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    ui.start('#firebaseui-auth-container', {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        uiShown: function () {
          // This is what should happen when the form is full loaded. In this example, I hide the loader element.
          document.getElementById('loader')!.style.display = 'none';
        },
      },
      signInSuccessUrl: 'https://lu-jason.github.io/yugioh-card-tracker',
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: true,
        },
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        },
      ],
      signInFlow: 'popup',
    });
  }, []);

  return (
    <React.Fragment>
      <h1
        className='text-center my-3 title'
        style={{ textAlign: 'center' }}
      >
        Login Page
      </h1>
      <div id='firebaseui-auth-container'></div>
      <div
        id='loader'
        className='text-center'
      >
        Loading form
      </div>
    </React.Fragment>
  );
}
