For the Back end i used Node.js with Express.js and Firestore (Firebase) as a database.

Unfortunately, you will not be able to run this app locally because you need a private key (json -> functions/src/config/firebase-adminsdk.json) 
in order to run the app. I deleted because it is something like the credentials for my app in firebase!

If you want, you can create an account and insert your own key (project settings -> Service accounts-> genereate new private key)

Finally, change the .firebaserc :

{
  "projects": {
    "default": "your-project's-name"
  }
}

Run the functions locally => npm run serve

Deploy your functions to Firebase Functions => npm run deploy
