function interfaces(app) {
  app.get("/api/auth", (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.json({
      auth: false
    })
  })

  app.post("/api/login", {
    method: "POSt",
    mode: "cors",
    body: { email, password }
  }, (req, res) => {
  });
}

module.exports = { interfaces };