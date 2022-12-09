/* See LICENSE file for copyright and license details */
// Import variables
const {Input}=require('./variables.js');
const fs=require('fs')l

// Convert JSON into modifiable string
var oldjson=JSON.stringify(require('./phone_book.json'),null,4);

// Replace old values with new values (start)
var newjson=oldjson.replace(Input.oName,Input.nName);
newjson=newjson.replace(Input.oFilename,Input.nFilename);
newjson=newjson.replace(Input.oLabel,Input.nLabel);
newjson=newjson.replace(Input.oReviewscore,Input.nReviewscore);
newjson=newjson.replace(Input.oReviewlink,Input.nReviewlink);
newjson=newjson.replace(Input.oPrice,Input.nPrice);
newjson=newjson.replace(Input.oShoplink,Input.nShoplink);
// Replace old values with new values (end)

fs.writeFile('phone_book.json',newjson,(err)=> {
	if (err) throw err;
});
