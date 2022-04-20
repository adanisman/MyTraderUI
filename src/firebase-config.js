import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDjd2r-j28V1_km8m03Wm6vUBEDnvsWcGc',
  authDomain: 'react-http-e83c7.firebaseapp.com',
  databaseURL: 'https://react-http-e83c7-default-rtdb.firebaseio.com',
  projectId: 'react-http-e83c7',
  storageBucket: 'react-http-e83c7.appspot.com',
  messagingSenderId: '611893206962',
  appId: '1:611893206962:web:0da3f4d072fc2373d18eab',
}
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
