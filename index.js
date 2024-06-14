const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const ejs = require("ejs");
const session = require("express-session");
//const sw = require("./serviceWorker.js");

const app = express();
const port = 3001;

// Configuration de la base de données MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "express",
});

// Connexion à la base de données
connection.connect((err) => {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

// Configuration du moteur de template EJS
app.set("view engine", "ejs");

//app.use(sw());

// Configurer le dossier "public" pour servir des fichiers statiques
app.use(express.static("public"));

// Configuration du middleware body-parser pour les requêtes POST
app.use(bodyParser.urlencoded({ extended: true }));

// Configuration du middleware express-session
app.use(
  session({
    secret: "votre_clé_secrète",
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/index", (req, res) => {
  res.render("index");
});

// Route pour afficher le formulaire de connexion
app.get("/", (req, res) => {
  res.render("auth", { message: null });
});

// Route pour traiter la connexion
app.post("/login", (req, res) => {
  const { login, api_key } = req.body;

  // Stocker l'api_key dans un cookie
  res.cookie("api_key", api_key);

  res.redirect("/index");
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
