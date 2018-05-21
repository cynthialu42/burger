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
  
    for (var key in ob) {
      var value = ob[key];
      if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
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
    
        //console.log(queryString);
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      }
   
};

module.exports = orm;