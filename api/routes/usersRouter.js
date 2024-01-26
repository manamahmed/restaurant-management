const express = require("express");
const db = require("../db.js");
const md5 = require("md5");

const router = express.Router();

router.get("/api/users", (req, res) => {
  const sql = "SELECT * FROM user";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: "success",
      data: rows,
    });
  });
});

router.get("/api/users/:id", (req, res) => {
  const sql = "select * from user where id = ?";
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      message: "success",
      data: row,
    });
  });
});

router.post("/api/users/", (req, res) => {
  const errors = [];

  if (!req.body.email) {
    errors.push("No email provided");
  }
  if (!req.body.password) {
    errors.push("No password provided");
  }

  if (errors.length > 0) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }

  const data = {
    name: req.body.name,
    email: req.body.email,
    password: md5(req.body.password),
  };

  const sql = "INSERT INTO user(name, email, password) VALUES (?, ?, ?)";
  const params = [data.name, data.email, data.password];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});

module.exports = router;
