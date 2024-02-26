const express = require('express');
const { Server } = require("socket.io");
const { v4: uuidV4 } = require('uuid');
const dotenv = require('dotenv')
const http = require('http');
const cors = require('cors')
const db = require('./config/db')
const userRouter = require('./routers/user.router')
const authRouter = require('./routers/auth.router')
const tournamentRouter = require('./routers/tournament.router')
const path = require('path')

dotenv.config()
const app = express();

const server = http.createServer(app);
const rooms = new Map();
const users = new Map();

// set port to value received from environment variable or 8080 if null
const port = process.env.PORT || 4000

// upgrade http server to websocket server
const io = new Server(server, {
  cors: '*', // allow connection from any origin
});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/file', express.static('upload'))
app.use(express.static(path.join(__dirname, 'client', 'dist')))
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/tournaments', tournamentRouter)
app.get('*', async (req,res) => res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html')))

// io.connection
io.on('connection', (socket) => {
    // console.log(socket.id, 'connected');

    // socket.on('username')
    // socket.on('username', (username) => {
    //     console.log(username);  
    //     socket.data.username = username;
    // });

    // createRoom
    // socket.on('createRoom', async (callback) => { // callback here refers to the callback function from the client passed as data
    //     const roomId = uuidV4(); // <- 1 create a new uuid
    //     await socket.join(roomId); // <- 2 make creating user join the room
    
    //     // set roomId as a key and roomData including players as value in the map
    //     rooms.set(roomId, { // <- 3
    //     roomId,
    //     players: [{ id: socket.id, username: socket.data?.username }]
    //     });
    //     // returns Map(1){'2b5b51a9-707b-42d6-9da8-dc19f863c0d0' => [{id: 'socketid', username: 'username1'}]}

    //     callback(roomId); // <- 4 respond with roomId to client by calling the callback function from the client
    // });
    // ...
    // socket.on('joinRoom', async (args, callback) => {
    //   // check if room exists and has a player waiting
    //   const room = rooms.get(args.roomId);
    //   let error, message;
    
    //   if (!room) { // if room does not exist
    //     error = true;
    //     message = 'room does not exist';
    //   } else if (room.length <= 0) { // if room is empty set appropriate message
    //     error = true;
    //     message = 'room is empty';
    //   } else if (room.length >= 2) { // if room is full
    //     error = true;
    //     message = 'room is full'; // set message to 'room is full'
    //   }
  
    //   if (error) {
    //     // if there's an error, check if the client passed a callback,
    //     // call the callback (if it exists) with an error object and exit or 
    //     // just exit if the callback is not given
  
    //     if (callback) { // if user passed a callback, call it with an error payload
    //       callback({
    //         error,
    //         message
    //       });
    //     }
  
    //     return; // exit
    //   }
  
    //   await socket.join(args.roomId); // make the joining client join the room
  
    //   // add the joining user's data to the list of players in the room
    //   const roomUpdate = {
    //     ...room,
    //     players: [
    //       ...room.players,
    //       { id: socket.id, username: socket.data?.username },
    //     ],
    //   };
  
    //   rooms.set(args.roomId, roomUpdate);
  
    //   callback(roomUpdate); // respond to the client with the room details.
  
    //   // emit an 'opponentJoined' event to the room to tell the other player that an opponent has joined
    //   socket.to(args.roomId).emit('opponentJoined', roomUpdate);
    // });

    // socket.on('move', (data) => {
    //     // emit to all sockets in the room except the emitting socket.
    //     socket.to(data.room).emit('move', data.move);
    // });

    // socket.on("disconnect", () => {
    //   const gameRooms = Array.from(rooms.values()); // <- 1
  
    //   gameRooms.forEach((room) => { // <- 2
    //     const userInRoom = room.players.find((player) => player.id === socket.id); // <- 3
  
    //     if (userInRoom) {
    //       if (room.players.length < 2) {
    //         // if there's only 1 player in the room, close it and exit.
    //         rooms.delete(room.roomId);
    //         return;
    //       }
  
    //       socket.to(room.roomId).emit("playerDisconnected", userInRoom); // <- 4
    //     }
    //   });
    // });

    socket.on('join-to-game', (user, game) => {
      users.set(user._id, [socket.id, user, game])
      socket.join(game)
      if(rooms.get(game)) {
        socket.emit('get-game', rooms.get(game))
      } else {
        rooms.set(game, [])
        socket.emit('get-game', [])
      }
      io.emit('get-users', Array.from(users.values()))

      socket.on('move-a', (data) => {
        // rooms.get(game)?.push(data)
        // console.log(1);
        socket.broadcast.to(game).emit('move-d', data)
      })
      
      socket.on('disconnect', () => {
        // rooms.delete(users.get(user._id)[3])
        users.delete(user._id)
        io.emit('get-users', Array.from(users.values()))
      })
    })
});



server.listen(port, () => {
  db()
  console.log(`listening on *:${port}`);
});