require('dotenv').config()

const post = function(url, status, toSend) {
  return new Promise(function(resolve, reject) {
    const httpRequest = new XMLHttpRequest()
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === status) {
          const response = JSON.parse(this.responseText)
          console.log(response)
          resolve(response)
        } else {
          reject(httpRequest)
        }
      }
    }
    httpRequest.open('POST', 'http://localhost:3000/'+ url, true)
    httpRequest.setRequestHeader('Content-Type', 'application/json')
    httpRequest.send(JSON.stringify(toSend))
  })
}

exports.post = post

