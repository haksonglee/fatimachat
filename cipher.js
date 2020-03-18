const crypto = require('crypto');

const cipher = crypto.createCipher('aes-256-cbc', 'Reykjavík');
let result = cipher.update('이학송|19711108',' utf8','base64');
result += cipher.final('base64');
console.log('crypto ', result);

const decipher = crypto.createDecipher('aes-256-cbc','Reykjavík');
let result2 = decipher.update(result, 'base64', 'utf8');
result2 += decipher.final('utf8');
console.log('decrypto ', result2)
