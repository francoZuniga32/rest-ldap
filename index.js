const ldap = require("ldapjs");
const express = require("express");
require("dotenv").config();

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());


const client = ldap.createClient({
  url: [procces.env.IPLDAP],
});

client.on('error', (err) => {
  // handle connection error
	console.log(err)
})

app.post("/auth", (req, res) => {
	console.log(req.body)
  if (req.body.usuario && req.body.contrasenia) {
	client.bind(`cn=${req.body.usuario},ou=usuarios,dc=fi,dc=uncoma,dc=edu,dc=ar`, req.body.contrasenia, (err) => {
		if(err){
			console.log(err);
			res.status(401).send({err: "el usuario y apellido no conciden"});
		}else{
			res.status(200).send();
		}
	  });
  } else {
    res
      .status(406)
      .send({ err: "no se proporciono el nombre.apellido y la contrasenia" });
  }
});

app.listen(3000, () => {
  console.log("listen on port 3000");
});
