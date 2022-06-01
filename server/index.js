const express = require("express");
const app = express();
const port = 8300;

const sqlite3 = require("sqlite3");
const session = require("express-session");
const sqliteStoreFactory = require("express-session-sqlite").default;

const path = require('path');

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
// app.use('/api/images/full', express.static(__dirname + '/../database/images'));

app.get('/api/images/thumbnail/:name', function (req, res) {
  const name = req.params.name;

  if(RegExp('/^([A-z-_0-9])+(.jpg|.jpeg|.png)$/g').test(name)){
    console.log(name);
    res.statusCode = 502;
    res.json({
      result: false,
      msg: "not valid filename"
    });
    return;
  }

  let filepath = path.resolve(`${__dirname}/../database/images/`, name);
  res.sendFile(filepath);
});

interfaces(app);

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});