import express from "express";
import apiRouter from "./routes/api.router.js";
import errorMiddleware from "./middlewares/error.mw.js";
import connectToMongo from "./model/mongodb/dbConnect.js";
import { initialUsers, initialCards } from "./initialData/initalDataService.js";
import debug from "debug";
import path from "node:path";
import * as url from "url";
import loggerAdapter from "./loggerAdapter.js";
import envAdapter from "./envAdapter.js";
const app = express();
import cors from "cors";
const log = debug("app:Connections");
envAdapter();
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
app.use(cors());
app.use(express.json());
app.use("/", apiRouter);
app.use(loggerAdapter());
app.use(errorMiddleware);
app.use(express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT || 3030;

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});
// start server
connectToMongo()
  .then(() => {
    app.listen(PORT, () => {
      log("Server is listening on port " + PORT);
      initialUsers();
      initialCards();
    });
  })
  .catch((error) => {
    log("Error connecting to MongoDB:", error);
  });
