//创建一个客户端 中间的为协议

var ws = new WebSocket('ws://127.0.0.1:9000/')

ws.onopen = function () {
  ws.send('大家好')
  
}
ws.onmessage = function (event) {
  //var chatroom = document.querySelector('#chatroom')
  //chatroom.innerHTML +='<br />' + event.data
  //console.log(this.$store.state.quality.content)
  console.log(event.data)
}

ws.onclose = function () {
  console.log('closed')

}

ws.onerror = function (err) {
  console.log(err)
}