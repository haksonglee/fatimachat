const url = require('url')

const myURL = new URL('https://www.fatimahosp.co.kr')
console.log('searchParams', myURL.searchParams);

myURL.searchParams.append('name','이학송')

console.log(myURL)
//https://www.fatimahosp.co.kr/?name=%EC%9D%B4%ED%95%99%EC%86%A1

const querystring = require("querystring");
const parseUrl = url.parse('https://www.fatimahosp.co.kr/?name=%EC%9D%B4%ED%95%99%EC%86%A1')
const query = querystring.parse(parseUrl.query)

console.log('qeurystring().parse()', query.name)
