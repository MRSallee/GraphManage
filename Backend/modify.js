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
addFile(json, brand, name, fName, suffix) {
	var brandNum = this.getBrandNum(json, brand),
	    phoneNum = this.getPhoneNum(json, brandNum, name);

	json[brandNum].phones[phoneNum].file.push(fName);
	json[brandNum].phones[phoneNum].suffix.push(suffix);
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
 	var fileNum, fileLength=0;
 		brandNum = this.getBrandNum(brand),
	    phoneNum = this.getPhoneNum(json, brandNum, name);

	for(var i in json[brandNum].phones[phoneNum].file)
		if(json[brandNum].phones[phoneNum].file.hasOwnProperty(i)) fileLength++;

	for(var i=0; i<fileLength; i++) {
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
update(json, brand, oName, nName, rScore, rLink, price, sLink) {
	var file = [], suffix = [],
		brandNum = this.getBrandNum(json, brand),
		phoneNum = this.getPhoneNum(json, brandNum, oName);

	for(var i in json[brandNum].phones[phoneNum].file) {
		file.push(json[brandNum].phones[phoneNum].file[i]);
		suffix.push(json[brandNum].phones[phoneNum].suffix[i]);
	}

	json[brandNum].phones[phoneNum] = {"name": nName, "reviewScore": rScore, "reviewLink": rLink, "price": price, "shopLink": sLink, "file": [], "suffix": []};

	for(var i in file) {
		json[brandNum].phones[phoneNum].file.push(file[i]);
		json[brandNum].phones[phoneNum].suffix.push(suffix[i]);
	}

	return json;
}

export function
updFile(json, brand, name, oSuffix, nSuffix, fName) {
	var sufNum,
		brandNum = this.getBrandNum(json, brand),
		phoneNum = this.getPhoneNum(json, brandNum, name);

	for(var i in json[brandNum].phones[phoneNum].suffix)
		if(json[brandNum].phones[phoneNum].suffix[i] == oSuffix) {
			sufNum = i;
			break;
		}

	json[brandNum].phones[phoneNum].file[sufNum] = fName;
	json[brandNum].phones[phoneNum].suffix[sufNum] = nSuffix;
	return json;
}



export function
getBrandNum(json, input) {
	var brandNum, length=0;

	for(var i in json)
		if(json.hasOwnProperty(i)) length++;

	for(var i=0; i<length ;i++)
		if(json[i].name == input) {
			brandNum=i;
			break;
		}

	return brandNum;	
}

export function
getPhoneNum(json, brandNum, input) {
	var phoneNum, length=0;
	for(var i in json[brandNum].phones)
		if(json[brandNum].phones.hasOwnProperty(i)) length++;

	for(var i=0; i<length; i++)
		if(json[brandNum].phones[i].name == input) {
			phoneNum=i;
			break;
		}

	return phoneNum;
}