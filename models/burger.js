/*Inside your burger directory, create a folder named models.


In models, make a burger.js file.
Inside burger.js, import orm.js into burger.js

Also inside burger.js, create the code that will call the ORM functions using burger specific input for the ORM.
Export at the end of the burger.js file. */

var orm = require("../config/orm");

var burger = {
    selectAll: function(cb){
        orm.selectAll('burgers', function(result){
            cb(result);
        });
    },

    insertOne: function(columns, values, cb){
        orm.insertOne('burgers', columns, values, function(result){
            cb(result);
        });
    }, 

    updateOne: function(objColVals, condition, cb){
        orm.updateOne('burgers', objColVals, condition, function(result){
            cb(result);
        });
    }
};

module.exports = burger;