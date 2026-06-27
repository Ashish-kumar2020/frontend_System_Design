
const express = require("express");
const {createServer} = require("node:http");
const {join} = require('node:path');
const {Server}  = require("socket.io");

const app= express();
const server = createServer(app);
const  io = Server(server);


io.on('connection',(socket) => {
    console.log('Connection is established');
    io.on('chat message',(socket) => {
    socket.on('chat message' , (msg) => {
        io.emmit('chat message',msg);
    })

    socket.on('disconnect',() => {
        console.log("User Disconnected")
    })



    })
})
