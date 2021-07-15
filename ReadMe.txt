For the Back end of the contacts application i used Node.js with Express.js and Firestore (Firebase) as a database.

Unfortunately, you will not be able to run this app locally because you need a private key (json -> functions/src/config/firebase-adminsdk.json) 
in order to run the app. I deleted because it is something like the credentials for my app in firebase!

If you want, you can create an account and insert your own key (project settings -> Service accounts-> genereate new private key)




Althought, even if you can not run the app locally, i will give you the apis:


Get ALL: method get, endpoint:              https://europe-west1-contacts-a-b3e89.cloudfunctions.net/api/users

Get One Item : method get, endpoint:        https://europe-west1-contacts-a-b3e89.cloudfunctions.net/api/users/:id

Post Item: method post, endpoint:           https://europe-west1-contacts-a-b3e89.cloudfunctions.net/api/users

Update Item: method put, endpoint:          https://europe-west1-contacts-a-b3e89.cloudfunctions.net/api/users/:id

Delete Item: method delete, endpoint:       https://europe-west1-contacts-a-b3e89.cloudfunctions.net/api/users/:id

where id is 123, it is a test 