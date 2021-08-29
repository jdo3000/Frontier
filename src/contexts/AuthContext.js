import React, { useContext, useState, useEffect } from 'react'
import app from '../firebase'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/auth'
import 'firebase/storage'

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({children}) {
  const functions = app.functions();
  const db = app.firestore();
  const auth = app.auth();
  const storage = app.storage();

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [signinError, setSigninError] = useState(null);
  const [signupError, setSignupError] = useState(null);

 
  // EDIT POST
  async function edit(id, titleInput, locationInput, descriptionInput, image) {
    console.log("EDITING");
    db.collection('frontiers').doc(id).update({
      title: titleInput,
      location: locationInput,
      description: descriptionInput
    }).then(() => {
      console.log('done editing')
      //setSuccess("edit complete")
    }).catch(err => {
      setError(err.message)
      console.log(err.message)
    })

  }

  async function deletePost(id, uid) {
    console.log('DELETING');
    await db.collection('frontiers').doc(id).delete();
    await db.collection('users').doc(uid).collection('frontiers').doc(id).delete();
    console.log('Delete finished')
  }

  // UPLOAD TO STORAGE AND DB
  async function uploadImage(image, titleInput, locationInput, descriptionInput) {

    var storageRef = storage.ref();
    var storageImageRef = storageRef.child('images/'+image.name);
    var imageUrl = null;
    // store file in storage
    await storageImageRef.put(image)
      .then((data) => {
        storageImageRef.getDownloadURL()
        .then((url) => {
          imageUrl = url;
          if(imageUrl === null) throw 'unable to upload image';
        }).then(() => {
          addToDB(imageUrl);
          setSuccess('image added')
          setError(null);
          
        }).catch(err => {
          setSuccess(null)
          setError(err.message)
        });
    });

    async function addToDB(imageUrl) {
      // add file info to users
      var docId = null;
      const data = {
        title: titleInput,
        image: imageUrl,
        imageName: image.name,
        location: locationInput,
        description: descriptionInput,
        user: currentUser.uid,
        pins: 0,
        id: "" };

      // add file info to frontiers
      const frontiersCollection = db.collection('frontiers');
      await frontiersCollection
        .add(data)
        .then((doc) => {
          console.log("doc id:" + doc.id);
          docId = doc.id;
          doc.update({id: docId})
        })
        .catch(err => {
          setError(err.message);
          console.log(err.message)
        });

      const userFrontiersDoc = db.collection('users').doc(currentUser.uid).collection('frontiers').doc(docId);
      await userFrontiersDoc
        .set(
          {docRef: docId}
        )
        .then(() => {
          console.log('done adding to users collection')
        }).catch(err => {
          setError(err.message);
          console.log(err.message)
        });

      console.log("done adding info to both db")
    }
    
    return;
  }

  // SIGN UP
  function signup(email, username, password) {
    auth.createUserWithEmailAndPassword(email, password)
    .then(credentials => {
      console.log('signed up as: ' + credentials.user.uid);
      credentials.user.updateProfile({
        displayName: username
      })
      db.collection('users').doc(credentials.user.uid).set({
        username: username
      }).catch(err => {
        console.log(err)
      });
      setSignupError(null);
      
    }).catch(err => {
      setSignupError(err.message)
    })

  }
  
  //SIGN IN
  function signin(email, password) {
    auth.signInWithEmailAndPassword(email, password)
      .then(credentials => {
        setSigninError(null);
        console.log('signed in as: ' + credentials.user.uid);
        
      })
      .catch(err => {
        setSigninError(err.message)
      })
  }
  
  //SIGN OUT
  async function signout() {
    await auth.signOut()
    console.log("signed out")
  }
  
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }
  
  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }
  
  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
      if(currentUser !== null) console.log(currentUser.displayName)
    })
    return unsubscribe
  }, [])
  
  const value = {
      db,
      storage,
      currentUser,
      error,
      success,
      signinError,
      signupError,
      signin,
      signup,
      signout,
      resetPassword,
      updateEmail,
      updatePassword,
      uploadImage,
      edit,
      deletePost
    }
  
  return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    )
}