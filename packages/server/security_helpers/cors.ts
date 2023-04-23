import cors from "cors";

const whitelist = [
  "http://localhost:3000",
  "http://uno-game.ru",
  "http://www.uno-game.ru",
  "https://uno-game.ru",
  "https://www.uno-game.ru",
];
const corsOptions = {
  //@ts-ignore
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

export default cors(corsOptions);
