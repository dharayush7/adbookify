
# AD Bookofy
## Description
Welcome to the Book Listing Website! This project is a web application where users can browse, buy, and list books. The frontend is built using React.js, and it integrates with Firebase for backend services, including Firestore, Firebase Storage, and Firebase Authentication.

## Features

- **Browse Books**: View a list of available books with details such as title, author, and price.

- **Buy Books**: Purchase books directly from the website.
  
- **List Books**: Users can list their own books for sale.
- **Authentication**: Secure user authentication with Firebase Authentication.
- **Database**: Use Firestore for storing and retrieving book data.
- **Storage**: Use Firebase Storage for storing book cover images.



## Technologies Used
- **React.js**: JavaScript library for building user interfaces.
- **Firebase**: Provides a suite of tools for building web apps.
  - **Firestore**: NoSQL cloud database for storing book and user data.
  - **Firebase Storage**: For storing and serving book cover images.
  - **Firebase Authentication**: For user login and registration.
## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn or pnpm
- A Kinda free account and configuration
- A free neo4j instanse

### Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/dharayush7/adbookify.git
```

# Installation

#### 1. Installing dependencies:
```bash
cd adbookify
npm install
# or
yarn
# or
pnpm i
```


## Firebase Setup
Create a free account of Firebase.

#### 2. Create project:
Create a new project in firebase. Add web app in this app.

#### 3. Utlity Setup:
don't copy firebase config now. Go to build section and go firestore database. Activate this utlity.

#### 4. Rules configure:
- Go to rules section in firestore database.
- The default rule look like this.

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // This rule allows anyone with your Firestore database reference to view, edit,
    // and delete all data in your Firestore database. It is useful for getting
    // started, but it is configured to expire after 30 days because it
    // leaves your app open to attackers. At that time, all client
    // requests to your Firestore database will be denied.
    //
    // Make sure to write security rules for your app before that time, or else
    // all client requests to your Firestore database will be denied until you Update
    // your rules
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2024, 8, 2);
    }
  }
}
```
- Now the change the last line ```allow read, write: if request.time < timestamp.date(2024, 8, 2);``` to ```allow read, write: if true;```

- Now the rule look like this

``` 
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // This rule allows anyone with your Firestore database reference to view, edit,
    // and delete all data in your Firestore database. It is useful for getting
    // started, but it is configured to expire after 30 days because it
    // leaves your app open to attackers. At that time, all client
    // requests to your Firestore database will be denied.
    //
    // Make sure to write security rules for your app before that time, or else
    // all client requests to your Firestore database will be denied until you Update
    // your rules
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

#### 5. Copy Cofigurarion:

- Go to project overview settings icon and click project settings.
- Under the section "your app" the default app was selected.
- Now copy "firebaseConfig" . 
- The firebaseConfig look like this
```
const firebaseConfig = {
  apiKey: // api id,
  authDomain:  // auth domain,
  databaseURL:  // database url,
  projectId: // project ID,
  storageBucket: // strorage Bucket,
  messagingSenderId: // Messaging sender id,
  appId: // app id 
};
```

- Now to ```adbookify/src/context/Firebase.jsx``` paste it in this...

```
const firebaseConfig = {
  // Paste hare firebase config
};
```



## Initialization

Go to AD-Tinder/

### Start server in devolopment mode:

Run this command to start the server:

using npm:
```bash
npm start
```
using yarn:
```bash
yarn start
```

using pnpm:

```bash
pnpm run start
```

## Usage

- Go to [localhost:3000](localhost:3000) 
## 🔗 Links
[portfolio](https://www.ayushdhar.com/)



## License

[MIT]

