


### `npm install`

to install the node modules

### `npm install react-router-dom@5.1`


### `npm install firebase`

you need to dowload firebase in cmd

Step 1: Set up Firebase Project
If you haven't already set up a Firebase project, go to the Firebase Console (https://console.firebase.google.com/) and create a new project.

Step 2: Enable Firestore
In the Firebase Console, navigate to your project and click on "Firestore Database" from the left-hand side menu.

Step 3: Create a Collection
In Firestore, data is organized into collections, which are similar to tables in a traditional database. To create a collection called "favorite,

Step3 : in FireBase DataBase You Can See "Rules" in the right side 

Step4 : Update Rules 


rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /favorites/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}




