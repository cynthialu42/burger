/*Import (require) connection.js into orm.js

In the orm.js file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.


selectAll()
insertOne()
updateOne()


Export the ORM object in module.exports. */

// Becaue we're using the mysql database connection, need to import commection file
var connection = require('../config/connection');

function printQuestionMarks(num){
    var newArr = [];
    for(let i = 0; i < num; i++){
        newArr.push("?");
    }
    return newArr.toString();
}

function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

var orm = {
    selectAll: function(tableName, cb) {
        var queryString = "SELECT * FROM " + tableName + ";";
        connection.query(queryString, function(err, result){
            if(err){
                throw err;
            }
            // Need this callback here bc async run returns undefined
            cb(result);
        });
    }, 

    insertOne: function(tableName, column, value, cb){
        // var queryString = "INSERT INTO " + tableName
        //                 + "(" + column + ") "
        //                 + "VALUES (?)";
        var queryString = "INSERT INTO " + tableName + "(" + column + ") VALUES(?);";
        console.log(queryString);
        connection.query(queryString, value, function(err, result){
            if(err){
                throw err;
            }
            //console.log("ORM result: " + result);
            cb(result);
        });
    },
    updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
    
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
    
        console.log(queryString);
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      }
    // updateOne: function(tableName, objColVals, condition, cb){
    //     var queryString = "UPDATE " + tableName
    //                     + "SET " + objToSql(objColVals)
    //                     + " WHERE " + condition;
    //     //var queryString = "UPDATE burgers SET devoured = 'true' WHERE id = 2";
    //     console.log(queryString);
    //     connection.query(queryString, function(err, result){
    //         if(err){
    //             throw err;
    //         }
    //         cb(result);
    //     });
    // }  
};

module.exports = orm;