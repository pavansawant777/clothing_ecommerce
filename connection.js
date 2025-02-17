 var mysql= require("mysql");
 var util = require("util");
 var conn = mysql.createConnection({
    "host":"bio7kd7hjw3g3yvkyxbb-mysql.services.clever-cloud.com",
    "user":"usdkc0dc1jbwdogz",
    "password":"lDZPPDNrDPgiSHLnnOcV",
    "database":"bio7kd7hjw3g3yvkyxbb"
    
 });



 var exe = util.promisify(conn.query).bind(conn);



 module.exports=exe;
