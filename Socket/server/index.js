import { Server } from 'socket.io';
import { uuidv4 as uuid } from 'uuid';

const io = new Server(4000,{ 
    cors: {
        origin: '*',
    }
 });

const users = new Map();
const messages = [];

io.on('connection', socket => {
    // When a new user enter chat 
    socket.on('user', user => {
        const newUser = {
            id: uuid(),
            name: user,
        };

        users.set(socket.id, newUser);

        // Send new user info and messages to new user
        socket.emit('user', newUser);
        socket.emit('msg', messages);

        // Send updated users list to all users
        io.emit('users', Array.from(users.values())); 
    });

    // When a new message is sent 
    socket.on('msg', msg => {
        messages.push(msg);

        io.emit('msg', messages);
    });

    // When user leaves chat
    socket.io('disconnect', () => {
        users.delete(socket.id);

        io.emit('users', Array.from(users.values())); 
    });
})