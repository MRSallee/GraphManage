// See LICENSE file for copyright and license details.
const fs=require('fs'),
      {Input}=require('./variables.js');
var json=JSON.parse(JSON.stringify(require('./phone_book.json')));
fs.writeFile('backup.json',JSON.stringify(json,null,4),(err)=> { if(err) throw err; });



if(Input.func=="add-phone") addPhones();
else if(Input.func=="add-brand") json.push({"name": Input.brand,"phones": []});
else if(Input.func=="add-file") addFile();
else if(Input.func=="del-phone") delPhones();
else if(Input.func=="del-brand") delBrand();
else if(Input.func=="del-file") delFile();

fs.writeFile('phone_book.json',JSON.stringify(json,null,4),(err)=> { if(err) throw err; });



function
addPhones() {
	var brandNum=getBrandNum(Input.brand);

	json[brandNum].phones.push({"name": Input.name,"reviewScore": "","reviewLink": "","price": "","shopLink": "","file":[],"suffix": []});
}


function
addFile() {
	var brandNum=getBrandNum(Input.brand),
	    phoneNum=getPhoneNum(brandNum,Input.name);

	json[brandNum].phones[phoneNum].suffix.push(Input.suffix);
	json[brandNum].phones[phoneNum].file.push(Input.fileName);
}

function
delPhones() {
	var brandNum=getBrandNum(Input.brand),
		phoneNum=getPhoneNum(brandNum,Input.name);

	json[brandNum].phones.splice(phoneNum, phoneNum+1);
}

function
delBrand() {
	var brandNum=getBrandNum(Input.brand);
	
	json.splice(brandNum,brandNum+1);
}

function
delFile() {
 	var brandNum=getBrandNum(Input.brand),
	    phoneNum=getPhoneNum(brandNum, Input.name),
	    fileNum, fileLength=0, i=0;

	for(i in json[brandNum].phones[phoneNum].suffix) {
		if(json[brandNum].phones[phoneNum].suffix.hasOwnProperty(i)) fileLength++;
	}

	for(i=0;i<fileLength;i++) {
		if(json[brandNum].phones[phoneNum].suffix[i]==Input.suffix) {
			fileNum=i;
			break;
		}
	}
	
	json[brandNum].phones[phoneNum].suffix.splice(fileNum, fileNum+1);
	json[brandNum].phones[phoneNum].file.splice(fileNum, fileNum+1);
}

function
getBrandNum(input) {
	var brandNum, length=0, i=0;

	for(i in json) {
		if(json.hasOwnProperty(i)) length++;
	}

	for(i=0;i<length;i++) {
		if(json[i].name==input) {brandNum=i; break;}
	}

	return brandNum;	
}

function
getPhoneNum(brandNum,input) {
	var phoneNum, length=0, i=0;

	for(i in json[brandNum].phones) {
		if(json[brandNum].phones.hasOwnProperty(i)) length++;
	}

	for(i=0;i<length;i++) {
		if(json[brandNum].phones[i].name==input) {phoneNum=i; break;}
	}

	return phoneNum;
}