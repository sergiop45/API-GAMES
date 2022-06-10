const express = require("express");
const app = express();
const BodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

app.use(BodyParser.urlencoded({extended: false}));
app.use(BodyParser.json());


var DB = {
    games: [
        {
            id: 1,
            nome: "god of war",
            year: 2010,
            price: 50
        },
        {
            id: 2,
            nome: "DBZ",
            year: 2008,
            price: 70
        },
        {
            id: 3,
            nome: "GTA San Andreas",
            year: 2007,
            price: 100
        },
        {
            id: 4,
            nome: "Devil My Cry",
            year: 2005,
            price: 30
        }


    ]
}

app.get("/game/:id", (req, res) => {
    
    if(isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var  id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id);

        if (game!=undefined) {
            res.sendStatus(200);
            res.json(game);
        } else {
            res.sendStatus(404);
        }
    }

});


app.post("/game", (req,res) => {
    var {id, nome, price, year} = req.body;
    if(id != undefined & nome != undefined & price != undefined & year != undefined){
        
        DB.games.push({
            id,
            nome,
            price,
            year
        })
        res.sendStatus(200);
    }else {
        res.sendStatus(400);
    }
});

app.delete("/game/:id", (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = req.params.id;
        var index = DB.games.findIndex(g => g.id == id);

        if(index == -1) {
            res.sendStatus(404);
        } else {
            DB.games.splice(index, 1);
            res.sendStatus(200);
        }
    }
});

app.put("/game/:id", (req,res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400);
        

    } else {
        
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);

        if(game != undefined) {

            var {nome, price, year} = req.body;

            if( nome != undefined ) {
                game.nome = nome;
            }

            if ( price != undefined ) {
                
                if (isNaN(price)) {
                    res.sendStatus(400);
                } else {
                    game.price = price;
                 }

               }

            if ( year != undefined ) {
                
                if (isNaN(year)) {
                    res.sendStatus(400);
                } else {
                    game.year = year;
                }
                
            }

            res.sendStatus(200);

        }

    }
});

app.get("/games", (req, res) => {
    
    res.json(DB.games);
    res.sendStatus(200);
    
});

app.listen(3000, () => {
    console.log("API Rodando!");
});