//var drlist_script = require('./call_drlist');
//var drlist_bodydata = JSON.stringify(drlist_script.call_drlist('무릎'))



//var deptlist_script = require('./call_deptlist');
//var deptlist_bodydata = JSON.stringify(drlist_script.call_deptlist())

var deptlist_script = require('./call_login');
var deptlist_bodydata = JSON.stringify(deptlist_script.call_login())

console.log(deptlist_bodydata)
