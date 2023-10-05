const express = require("express");
const { pool } = require("../db-config");

const employeecrud = express.Router();

employeecrud.get("/", (req, res) => {
  const query = "select * from contact_app";

  pool.query(query, (error, result) => {
    if (error) res.status(500).send(error);
    else res.status(200).send(result);
  });
});

employeecrud.post("/create", (req, res) => {
  const { fname_emp, lname_emp, imgurl_emp, mobile_emp, email_emp } = req.body;

  const values = [fname_emp, lname_emp, imgurl_emp, mobile_emp, email_emp];

  const query =
    "insert into contact_app (fname_emp, lname_emp, imgurl_emp, mobile_emp, email_emp) values (?, ?, ?, ?,?)";

  pool.query(query, values, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
});

employeecrud.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { fname_emp, lname_emp, imgurl_emp, mobile_emp, email_emp } = req.body;
  const values = [fname_emp, lname_emp, imgurl_emp, mobile_emp, email_emp, id];

  const query =
    "update contact_app set fname_emp=?, lname_emp=?, imgurl_emp=?, mobile_emp=?, email_emp=? where contact_id=?";

  pool.query(query, values, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
});

employeecrud.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  const query = "delete from contact_app where contact_id=?";

  pool.query(query, id, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
});

module.exports = employeecrud;
