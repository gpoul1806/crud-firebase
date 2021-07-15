import * as express from "express";
import * as cors from "cors";

import usersRoutes from "./modules/users/users.routes";

const app = express();


// setting up the whitelisted urls, in any other url the api won't work
const whitelist = [
  "http://localhost:3000/",
  "http://localhost:3000",
  "https://contacts-a-b3e89.web.app/",
  "https://contacts-a-b3e89.web.app",
  // any other url you own
];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS : origin=>${origin}`));
    }
  },
};

app
  .use(cors(corsOptions))
  // this will be the main endpoint ex: domain.com/users/...
  .use("/users", usersRoutes)
  .use("*", (_, res) =>
    res.status(404).json({
      success: false,
      message: "endpoint not found",
    })
  );

export default app;
