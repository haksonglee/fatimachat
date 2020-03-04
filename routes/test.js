var drlist_script = require('./call_drlist');
var drlist_bodydata = JSON.stringify(drlist_script.call_drlist('무릎'))

console.log(drlist_bodydata)


//var deptlist_script = require('./call_deptlist');
//var deptlist_bodydata = JSON.stringify(drlist_script.call_deptlist())
