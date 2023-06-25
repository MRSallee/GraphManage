// Written by: Madison Lynch <madi@mxdi.xyz>
// Source: https://github.com/MRSallee/GraphManage
// See LICENSE file for copyright and license details.
export function
addPhones(json, brand, name) {
	var brandNum = this.getBrandNum(json, brand);

	json[brandNum].phones.push({"name": name, "reviewScore": "","reviewLink": "","price": "","shopLink": "","file":[],"suffix": []});
	return json;
}

export function
addBrand(json, brand) {
	json.push({"name": brand,"phones": []});
	return json;
}

export function
addFile(json, brand, name, suffix, fName) {
	var brandNum = this.getBrandNum(json, brand),
	    phoneNum = this.getPhoneNum(json, brandNum, name);

	json[brandNum].phones[phoneNum].suffix.push(suffix);
	json[brandNum].phones[phoneNum].file.push(fName);
	return json;
}

export function
delPhones(json, brand, name) {
	var brandNum = this.getBrandNum(json, brand),
		phoneNum = this.getPhoneNum(json, brandNum, name);

	json[brandNum].phones.splice(phoneNum, phoneNum+1);
	return json;
}

export function
delBrand(json, brand) {
	var brandNum = this.getBrandNum(json, brand);
	
	json.splice(brandNum, brandNum+1);
	return json;
}

export function
delFile(json, brand, name, suffix) {
 	var brandNum = this.getBrandNum(brand),
	    phoneNum = this.getPhoneNum(json, brandNum, name),
	    fileNum, fileLength=0, i=0;

	for(i in json[brandNum].phones[phoneNum].file)
		if(json[brandNum].phones[phoneNum].file.hasOwnProperty(i)) fileLength++;

	for(i=0; i<fileLength; i++) {
		if(json[brandNum].phones[phoneNum].suffix[i] == suffix) {
			fileNum=i;
			break;
		}
	}

	json[brandNum].phones[phoneNum].suffix.splice(fileNum, fileNum+1);
	json[brandNum].phones[phoneNum].file.splice(fileNum, fileNum+1);
	return json;
}

export function
getBrandNum(json, input) {
	var brandNum, length=0, i=0;

	for(i in json)
		if(json.hasOwnProperty(i)) length++;

	for(i=0;i<length;i++)
		if(json[i].name == input) {
			brandNum=i;
			break;
		}

	return brandNum;	
}

export function
getPhoneNum(json, brandNum, input) {
	var phoneNum, length=0, i=0;

	for(i in json[brandNum].phones)
		if(json[brandNum].phones.hasOwnProperty(i)) length++;

	for(i=0;i<length;i++)
		if(json[brandNum].phones[i].name == input) {
			phoneNum=i;
			break;
		}

	return phoneNum;
}