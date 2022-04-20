import { SettingsInputCompositeTwoTone } from '@material-ui/icons'
import axios from 'axios'
//import { useState, useEffect } from 'react'

class TickerDataService {
  addTickers = (newTicker) => {
    const body = {
      symbol: newTicker.symbol,
      cname: newTicker.cname,
    }
    // const [post, setPost] = useState(null)
    //axios.post('/api/ticker/create', body)
    axios.post('/api/ticker/create', body).then((response) => {
      // setPost(response.data)
      // console.log(response.data)
    })

    return post
  }

  sendTickerFile = (file) => {
    const formData = new FormData()
    formData.append('file', file)

    axios
      .post('/api/ticker/getFile', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((response) => {
        // setPost(response.data)
        // console.log(response.data)
      })

    return post
  }
}

export default new TickerDataService()
