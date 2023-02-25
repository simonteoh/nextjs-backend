const app = require('express')();
var http = require('http').createServer(app);
const axios = require('axios')
const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000'
    }
});
let i = 0;
const cors = require('cors')

app.use(cors())

io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id}`);
    console.log('this is socket', socket.connected)
  socket.on('disconnect', () => {
    console.log(`A user disconnected: ${socket.id}`);
  });
  
//   setInterval(() => {
//     axios.get('http://localhost:5001/point')
//       .then((response) => {

//         io.emit('refreshPoint', response.data.getPoints.total_earned);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, 5000);

// setInterval(() => {
    
//     // io.emit('refreshPoint', 123);
//     console.log('this is interval', i++)
//   }, 5000);
socket.on('refreshPoint', (data) => {
    io.emit('updatedPoint', data)
    
    console.log('refreshPoint called', data)

});

  socket.on('queue', (data) => {
    console.log('this is queue')
    console.log(`Received queue message: ${data}`);
  });
});

const port = process.env.PORT || 5000;
http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});