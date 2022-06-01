const express = require("express");
const app = express();
const port = 8300;

const sqlite3 = require("sqlite3");
const session = require("express-session");
const sqliteStoreFactory = require("express-session-sqlite").default;

const { interfaces } = require("./src/interface.js");

const SqliteStore = sqliteStoreFactory(session);

app.use(session({
  store: new SqliteStore({
    driver: sqlite3.Database,
    path: "/tmp/sqlite.db",
    ttl: 1234,
    prefix: 'sess:',
    cleanupInterval: 300000
  }),
  secret: 'ljcucc',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
  

app.use('/', express.static(__dirname + '/../client/public/'));

interfaces(app);

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});