import { db } from '../../firebase-config'

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  QuerySnapshot,
} from 'firebase/firestore'

const tickerCollectionRef = collection(db, 'tickers')
class TickerDataService {
  addTickers = (newTicker) => {
    return addDoc(tickerCollectionRef, newTicker)
  }
  getAllTickers = () => {
    return getDocs(tickerCollectionRef)
  }

  deleteTicker = (id) => {
    const tickerDoc = doc(db, 'tickers', id)
    return deleteDoc(tickerDoc)
  }

  deleteAllTickers = async () => {
    const data = await this.getAllTickers()
    //console.log(data.docs)
    data.docs.forEach((item) => {
      console.log(item.id)
      tickerCollectionRef.collection.getDoc(item.id).delete()
    })
    //setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }
}

export default new TickerDataService()
