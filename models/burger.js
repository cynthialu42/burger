var orm = require("../config/orm");

var burger = {
    selectAll: function(cb){
        orm.selectAll('burgers', function(result){
            cb(result);
        });
    },

    insertOne: function(columns, values, cb){
        orm.insertOne('burgers', columns, values, function(result){
            console.log("model burgerjs result: " + result);
            cb(result);
        });
    }, 

    updateOne: function(objColVals, condition, cb){
        orm.updateOne('burgers', objColVals, condition, function(result){
            console.log(result);
            cb(result);
        });
    }
};

module.exports = burger;