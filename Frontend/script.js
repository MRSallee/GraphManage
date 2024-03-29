// See LICENSE file for copyright and license details.
// Load data and populate phone list

function handleData(data) {
    let phoneList = document.querySelector('main.phone-list'),
        phonesContainer = document.createElement('section'),
        buttonsContainer = document.createElement('section'),
        buttonNewBrand = document.createElement('button');
    
    phonesContainer.className = 'phones-container';
    buttonsContainer.className = 'phones-buttons-container';
    buttonNewBrand.className = 'button-new-brand';
    buttonNewBrand.textContent = 'add brand'
    
    phoneList.append(phonesContainer);
    phoneList.append(buttonsContainer);
    buttonsContainer.append(buttonNewBrand);
    
    buttonNewBrand.addEventListener('click', function() {
        addNew('brand');
    });
    
    Object.entries(data).forEach(function(item) {
        addBrand(item);
    });
    
    $(phonesContainer).sortable();
}

function submitSave(e, foo) {
    e.preventDefault();
    console.log(foo);
};

function submitAddNew(e, foo) {
    e.preventDefault();
    console.log(foo);
};

function submitAddPhone(e, foo) {
    e.preventDefault();
    console.log(foo);
};

function submitUpload(e, foo) {
    e.preventDefault();
    console.log(foo);
};

function addBrand(item) {
    let phonesContainer = document.querySelector('section.phones-container'),
        brandContainer = document.createElement('article'),
        brandLabel = document.createElement('div'),
        brandPhonesList = document.createElement('div'),
        buttonNewPhone = document.createElement('button'),
        brandFromJson = item[1].name ? true : false,
        brandName = brandFromJson ? item[1].name : item,
        brandPhones = brandFromJson ? item[1].phones : [];
    
    brandContainer.className = 'brand';
    brandLabel.className = 'brand-label';
    brandPhonesList.className = 'brand-phones';
    buttonNewPhone.className = 'button-new-phone';

    brandLabel.textContent = brandName;
    buttonNewPhone.textContent = 'add phone';

    brandContainer.append(brandLabel);
    brandContainer.append(brandPhonesList);
    phonesContainer.append(brandContainer);
    brandContainer.append(buttonNewPhone);
    
    buttonNewPhone.addEventListener('click', function() {
        addNew('model', brandName);
    });

    // Add phones from a brand
    brandPhones.forEach(function(phone) {
        addModel(phone, brandName, brandPhonesList);
    });
    
    $(brandPhonesList).sortable();
    
    addDeleteButton(brandName, '', brandLabel);
}

function addModel(phone, brandName, brandPhonesList) {
    let phoneContainer = document.createElement('article'),
        phoneLabel = document.createElement('div'),
        phoneVariations = document.createElement('div'),
        phoneFromJson = phone.name ? true : false,
        phoneName = phoneFromJson ? phone.name : phone,
        phoneSuffixes = phoneFromJson ? phone.suffx : 0;
    
    phoneLabel.className = 'phone-label';
    
    phoneLabel.textContent = phoneName;
    phoneContainer.append(phoneLabel);
    brandPhonesList.append(phoneContainer);

    phoneContainer.addEventListener('click', function() {
        expandPhone(brandName, phone);

        let lastExpanded = document.querySelector('div.brand-phones article.expanded');

        if (lastExpanded) lastExpanded.classList.remove('expanded');
        phoneContainer.classList.add('expanded');
    });
    
    if (phone === 'New') phoneContainer.click();
    
    addDeleteButton(brandName, phoneName, phoneLabel);
}

//<form action="modify.php" method="post">
//  <input type="hidden" name="brand" value="(JS MAGIC)">
//  <input type="hidden" name="name" value="(JS MAGIC)">
//  <input type="hidden" name="brand" value="del-phones">
//  <input type="hidden" name="function" value="del-phones">
//</form>

function addDeleteButton(brandName, phoneName, container) {
    // Add delete button
    let delContainer = document.createElement('div'),
        delForm = document.createElement('form'),
        delInputBrand = document.createElement('input'),
        delInputModel = document.createElement('input'),
        delInputFunction = document.createElement('input'),
        delFunction = phoneName.length > 0 ? 'del-phone' : 'del-brand';
    
    delContainer.className = 'del-container';
    
    delForm.className = 'del-form';
    delForm.setAttribute('action', 'modify.php');
    delForm.setAttribute('method', 'post');
    
    delInputBrand.setAttribute('type', 'hidden');
    delInputBrand.setAttribute('name', 'name');
    delInputBrand.setAttribute('value', phoneName);
    
    delInputModel.setAttribute('type', 'hidden');
    delInputModel.setAttribute('name', 'brand');
    delInputModel.setAttribute('value', brandName);
    
    delInputFunction.setAttribute('type', 'hidden');
    delInputFunction.setAttribute('name', 'function');
    delInputFunction.setAttribute('value', delFunction);
    
    delContainer.append(delForm);
    delForm.append(delInputBrand);
    delForm.append(delInputModel);
    delForm.append(delInputFunction);
    
    delContainer.addEventListener('click', function() {
        delForm.submit();
    });
    
    container.append(delContainer);
}

function addNew(type, brandName) {
    // Post method function
    let body = document.querySelector('body'),
        addNewContainer = document.createElement('section'),
        addNewForm = document.createElement('form'),
        addNewInput = document.createElement('input'),
        hiddenInputFunction = document.createElement('input'),
        hiddenInputVar = document.createElement('input'),
        functionValue = type === 'brand' ? 'add-brand' : 'add-phone',
        hiddenInputVarName = type === 'brand' ? 'name' : 'brand',
        name = type === 'brand' ? 'brand' : 'name';

    addNewContainer.className = 'add-new-container';
    addNewForm.setAttribute('action', 'modify.php');
    addNewForm.setAttribute('method', 'post');
    addNewInput.className = 'add-new-label';
    addNewInput.name = name;
    addNewForm.addEventListener('submit', function(e) {
        submitAddNew(e, functionValue);
    });

    hiddenInputFunction.setAttribute('type', 'hidden');
    hiddenInputFunction.name = 'function';
    hiddenInputFunction.value = functionValue;

    hiddenInputVar.setAttribute('type', 'hidden');
    hiddenInputVar.name = hiddenInputVarName;
    hiddenInputVar.value = brandName ? brandName : "";

    addNewContainer.append(addNewForm);
    addNewForm.append(addNewInput);
    addNewForm.append(hiddenInputFunction);
    addNewForm.append(hiddenInputVar);
    body.append(addNewContainer);
    addNewInput.focus();
}

// Populate phone editor
function expandPhone(brandName, phone) {
    // Clear current contents
    let phoneEditor = document.querySelector('main.phone-editor form'),
        uploader = document.querySelector('div.uploader-container');
    
    function clearEditor() {
        let allInputs = phoneEditor.querySelectorAll('input');
        phoneEditor.innerHTML = '';
        
        if (uploader) uploader.remove();
    }
    clearEditor();
    
    let phoneHeading = document.createElement('h2'),
        phoneHeadingLabel = document.createElement('span'),
        phoneSubmit = document.createElement('input'),
        valsMain = document.createElement('div');
    
    phoneHeadingLabel.textContent = phone.name;
    phoneSubmit.setAttribute('type', 'submit');
    phoneSubmit.setAttribute('value', 'Save');
    phoneSubmit.addEventListener('click', function(e) {
        submitSave(e, 'Save!');
    });
    
    phoneHeading.append(phoneHeadingLabel);
    phoneHeading.append(phoneSubmit);
    phoneEditor.append(phoneHeading);
    
    valsMain.className = 'values-main';
    phoneEditor.append(valsMain);
    
    createValRow('Name', phone.name ? phone.name : '', valsMain);
    createValRow('Review link', phone.reviewLink ? phone.reviewLink : '', valsMain);
    createValRow('Review score', phone.reviewScore ? phone.reviewScore : '', valsMain);
    createValRow('Price', phone.price ? phone.price : '', valsMain);
    createValRow('Shop link', phone.shopLink ? phone.shopLink : '', valsMain);

    function createValRow(label, value, container, readOnly) {
        let rowContainer = document.createElement('article'),
            labelElem = document.createElement('div'),
            inputElem = document.createElement('input'),
            inputElemO = document.createElement('input');
        
        rowContainer.className = 'value-row';
        labelElem.textContent = label;
        
        inputElem.setAttribute('name', 'n' +label.replace(' ', ''));
        inputElem.setAttribute('value', value);
        
        inputElemO.setAttribute('name', 'o' +label.replace(' ', ''));
        inputElemO.setAttribute('value', value);
        inputElemO.setAttribute('type', 'hidden');
        
        if (readOnly) inputElem.setAttribute('readonly', '');
        
        rowContainer.append(labelElem);
        rowContainer.append(inputElem);
        rowContainer.append(inputElemO);
        
        container.append(rowContainer);
    }
    
    if (Array.isArray(phone.file)) {
        phone.file.forEach(function(file, index) {
            let valsVariant = document.createElement('div');
            valsVariant.className = 'values-variant';
            phoneEditor.append(valsVariant);
            
            createValRow('Filename', file, valsVariant, true);
            createValRow('Label', phone.suffix[index], valsVariant);
        })
    } else {
        let valsVariant = document.createElement('div');
        valsVariant.className = 'values-variant';
        phoneEditor.append(valsVariant);
        
        createValRow('Filename', phone.file, valsVariant, true);
        createValRow('Label', '', valsVariant);
    }
    
    function createUploader(brandName) {
        let phoneEditor = document.querySelector('main.phone-editor'),
            uploaderContainer = document.createElement('div'),
            uploaderForm = document.createElement('form'),
            uploaderLabelFile = document.createElement('label'),
            uploaderInputFile = document.createElement('input'),
            uploaderInputFilename = document.createElement('input'),
            uploaderInputBrand = document.createElement('input'),
            uploaderInputPhone = document.createElement('input'),
            uploaderInputSuffix = document.createElement('input'),
            uploaderInputHidden = document.createElement('input');
        
        uploaderLabelFile.setAttribute('for', 'input-file');
        
        uploaderInputFile.setAttribute('type', 'file');
        uploaderInputFile.setAttribute('name', 'file');
        uploaderInputFile.setAttribute('accept', '.txt');
        //uploaderInputFile.setAttribute('multiple', '');
        uploaderInputFile.id = 'input-file';
        uploaderInputFile.addEventListener('change', function() {
            let file = uploaderInputFile.value,
                regex = '(L|R|L\\d|R\\d|Target)$',
                filename = String(file).split('\\').pop().split('.txt').shift(),
                regexMatch = filename.match(regex),
                isValid = regexMatch ? 1 : 0,
                filenameTrimmed = filename.replace(regexMatch[0], '');

            uploaderInputFilename.setAttribute('value', filenameTrimmed);
            
            
            //createValRow(label, value, container, readOnly)
            createValRow('Filename', filenameTrimmed, uploaderForm, true);
            createValRow('Label', '', uploaderForm);
            
            let uploadButton = document.createElement('input');
            
            uploadButton.setAttribute('type', 'submit');
            uploadButton.setAttribute('value', 'Upload');
            uploadButton.className = 'button-upload';
            uploadButton.addEventListener('click', function(e) {
                submitUpload(e, 'Upload!');
            });
            
            uploaderForm.append(uploadButton);
        });

        //uploaderInputFilename.setAttribute('type', 'hidden');
        //uploaderInputFilename.setAttribute('name', 'filename');
        //uploaderInputFilename.setAttribute('value', '');
        //uploaderInputFilename.setAttribute('readonly', '');

        uploaderInputBrand.setAttribute('type', 'hidden');
        uploaderInputBrand.setAttribute('name', 'brand');
        uploaderInputBrand.setAttribute('value', brandName);

        uploaderInputPhone.setAttribute('type', 'hidden');
        uploaderInputPhone.setAttribute('name', 'name');
        uploaderInputPhone.setAttribute('value', phone.name);

        //uploaderInputSuffix.setAttribute('type', 'hidden');
        //uploaderInputSuffix.setAttribute('name', 'suffix');

        uploaderInputHidden.setAttribute('type', 'hidden');
        uploaderInputHidden.setAttribute('name', 'function');
        uploaderInputHidden.setAttribute('value', 'add-file');
        
        uploaderForm.setAttribute('action', 'upload.php');
        uploaderForm.setAttribute('method', 'post');
        uploaderForm.setAttribute('enctype', 'multipart/form-data');
        uploaderForm.append(uploaderLabelFile);
        uploaderLabelFile.append(uploaderInputFile);
        //uploaderForm.append(uploaderInputFilename);
        uploaderForm.append(uploaderInputBrand);
        uploaderForm.append(uploaderInputPhone);
        //uploaderForm.append(uploaderInputSuffix);
        uploaderForm.append(uploaderInputHidden);
        
        uploaderContainer.className = 'uploader-container';
        uploaderForm.className = 'uploader-form';
        uploaderContainer.append(uploaderForm);
        phoneEditor.append(uploaderContainer);
    }
    createUploader(brandName);
}

// Load json and init
//let jsonUrl = 'https://squig.link/headphones/data/phone_book.json?' + new Date().getTime();
//let jsonUrl = 'https://squig.link/data_mrs/phone_book.json?' + new Date().getTime();
let jsonUrl = '../phone_book.json?' + new Date().getTime();

fetch(jsonUrl)
.then(response => {
    return response.json();
})
.then(data => handleData(data));