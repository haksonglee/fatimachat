var deptlist = require('../routes/crawling/deptlist.json')

// let dept = [];
// for (let i =0; i< deptlist.length; i++){
//   if (deptlist[i].title === '신경과') {
//     dept.push(deptlist[i])
//   }
// }

//console.log(dept)

// var isdept = function(dept) {
//   return dept.title === '신경과'
// }

var fdept = deptlist.filter(parm => parm.title === '신경과')

console.log(fdept)


var mdept = deptlist.map(parm => parm.title)

console.log(mdept)

var fmdept = deptlist.map(parm => parm.title)

console.log(fmdept)
