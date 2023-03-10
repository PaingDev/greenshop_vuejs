// Add the Firebase services that you want to use
import firebase from "firebase/app";
import "firebaseui";
//import * as firebaseui from "firebaseui";



class PhoneLoginUtil {
  constructor() {
    // TODO: Replace the following with your app's Firebase project configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBeDWEXM8-jBk68vCeoxPSP9ktuVSS6Pd8",
      authDomain: "freshpoint-99d6c.firebaseapp.com",
      databaseURL: "https://freshpoint-99d6c.firebaseio.com",
      projectId: "freshpoint-99d6c",
      storageBucket: "freshpoint-99d6c.appspot.com",
      messagingSenderId: "1027506294733",
      appId: "1:1027506294733:web:dc11d95bd120cfb6dafe84",
      measurementId: "G-HV5MQXMJ1L",
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    firebase.auth().useDeviceLanguage();
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    //firebase.auth().signInWithPhoneNumber()
  }

  phoneLoginDialog() {
    let promise = new Promise((resolve, reject) => {
      var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            //firebase.auth().currentUser()
            firebase
              .auth()
              .currentUser.getIdToken()
              .then((token) => {
                resolve(token);
                // orderService.loginPhone(token).then((data) => {
                //   store.dispatch("app/login", data.userToken);
                // });
              });

            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return false;
          },
          signInFailure: function(error) {
            // For merge conflicts, the error.code will be
            // 'firebaseui/anonymous-upgrade-merge-conflict'.
            if (error.code != "firebaseui/anonymous-upgrade-merge-conflict") {
              return resolve();
            }
            // The credential the user tried to sign in with.
            var cred = error.credential;
            // Copy data from anonymous user to permanent user and delete anonymous
            // user.
            // ...
            // Finish sign-in after data is copied.
            return firebase.auth().signInWithCredential(cred);
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById("loader").style.display = "none";
          },
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: "popup",
        signInSuccessUrl: "http://localhost:8088/success",
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          {
            provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            defaultCountry: "MM",
          },
        ],
      };

      this.ui.start("#firebaseui-auth-container", uiConfig);
    });

    return promise;
  }

  sendPhone(phoneNo, loginStage){
    console.log("sendPhone")
    import("capacitor-firebase-auth").then(fireAuth=>{
      fireAuth.cfaSignInPhoneOnCodeSent().subscribe(
        verificationId => 
        {
          console.log('cfaSignInPhoneOnCodeSent' + verificationId)
          loginStage("verification",verificationId);
        }
        )
      fireAuth.cfaSignInPhoneOnCodeReceived().subscribe(
        //
        event =>{
          console.log(
            `cfaOnCode Received : ${event.verificationId}:${event.verificationCode} : ${event}`
          )
          this.verifyCode = event.verificationCode
          
          const credential = firebase.auth.PhoneAuthProvider.credential(event.verificationId, event.verificationCode);
          firebase.auth().signInWithCredential(credential);
          loginStage("code", event);
        }
      );
      fireAuth.cfaSignIn('phone', {phone: "+95"+phoneNo}).subscribe(
        user => {
          console.log('test' +user.phoneNumber)
          loginStage("phone",user.phoneNumber);
          //this.successPhoneNo = 'success'; 
        }
      );
      
      
    });
    
  }
}

const phoneLoginUtil = new PhoneLoginUtil();
export default phoneLoginUtil;
