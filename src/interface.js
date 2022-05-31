function interfaces(app) {
  app.get("/api/auth", (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.json({
      auth: false
    })
  })

  app.post("/api/login", (req, res) => {
  });
}

module.exports = { interfaces };