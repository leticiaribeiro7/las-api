const express = require("express");
const consign = require("consign");


const ENV = process.env.NODE_ENV;

module.exports = () => {

    const app = express();
    app.use(express.urlencoded({ extended: true }));

    app.use(express.json());
    consign()
    .include("./src/controllers")
    .into(app);
    
    consign().include("src/controllers").into(app);

    app.get("/", (_req, res) => {
        res.send("Bem vindo ao Las Api");
    });


    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
        if (err) {
            if (err.erroApp) {
                res.status(400).send(err.erroApp);
            } else if (ENV !== "production") {
                res.status(500).send({ error: err.message });
            }
        } else {
            res.status(500).send({ error: "Algo deu errado..." });
        }
    });

    return app;
};
