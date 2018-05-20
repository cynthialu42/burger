var burger = require("../models/burger.js"),
    express = require('express'),
    router = express.Router();


router.get("/", function(req, res){
    burger.selectAll(function(data){
        //console.log(data);
        // Sending array of burger objects from database
        // to the index page as 'burger'
        res.render("index", {burger:data});
    });
});

router.post("/api/burgers", function(req, res){
    burger.insertOne("burger_name", req.body.burgerName, function(data){
        res.json(data);
    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;  
    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
module.exports = router;
