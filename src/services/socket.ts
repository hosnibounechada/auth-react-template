import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  reconnectionDelayMax: 10000,
  auth: {
    token: "abc",
  },
  query: {
    "my-key": "my-value",
  },
});

export default socket;
