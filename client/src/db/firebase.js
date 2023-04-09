import * as firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'

var firebaseConfig = require(`../config/firebase-secrets.js`)

firebase.initializeApp(firebaseConfig)

const fbTimestamp = firebase.database.ServerValue.TIMESTAMP
const db = firebase.database()
const auth = firebase.auth()
const currentUser = auth.currentUser

export default {
  db,
  auth,
  currentUser,
  fbTimestamp
}
