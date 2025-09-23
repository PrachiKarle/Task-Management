var mysql=require("mysql");
const conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"task_management"
})

var util=require("util");
var exe=util.promisify(conn.query).bind(conn);

module.exports=exe;