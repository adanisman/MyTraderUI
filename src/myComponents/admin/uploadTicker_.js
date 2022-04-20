import React from 'react'

import ReactFileReader from 'react-file-reader'

const handleFiles = (files) => {
  console.log(files)
  var reader = new FileReader()
  reader.onload = function (e) {
    console.log(reader.result)
  }
  reader.readAsText(files[0])
}
const uploadTicker = (props) => {
  return (
    <div className="files">
      <ReactFileReader fileTypes={['.csv']} base64={true} handleFiles={handleFiles}>
        <button className="btn"> Upload </button>
      </ReactFileReader>
    </div>
  )
}

export default uploadTicker
