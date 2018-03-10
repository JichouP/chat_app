import io from "socket.io-client";
import React from "react";

const socket = io();
socket.emit('mes', 'Hello!');