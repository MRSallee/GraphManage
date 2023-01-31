/* See LICENSE file for copyright and license details */
// Load data and populate phone list
function handleData(data) {
    console.log(data);
    let phoneList = document.querySelector('main.phone-list'),
        phonesContainer = document.createElement('section'),
        buttonsContainer = document.createElement('section'),
        buttonNewBrand = document.createElement('button');
    
    phonesContainer.className = 'phones-container';
    buttonsContainer.className = 'phones-buttons-container';
    buttonNewBrand.className = 'button-new-brand';
    buttonNewBrand.textContent = '+ Add new brand'
    
    phoneList.append(phonesContainer);
    phoneList.append(buttonsContainer);
    buttonsContainer.append(buttonNewBrand);
    
    buttonNewBrand.addEventListener('click', function() {
        addNew('brand');
    });
    
    Object.entries(data).forEach(function(item) {
        addBrand(item);
    });
}

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
    buttonNewPhone.textContent = '+';

    brandContainer.append(brandLabel);
    brandContainer.append(brandPhonesList);
    phonesContainer.append(brandContainer);
    brandContainer.append(buttonNewPhone);
    
    buttonNewPhone.addEventListener('click', function() {
        addNew('model', brandPhonesList);
    });

    // Add phones from a brand
    brandPhones.forEach(function(phone) {
        addModel(phone, brandPhonesList);
    });
}

function addModel(phone, brandPhonesList) {
    let phoneContainer = document.createElement('article'),
        phoneLabel = document.createElement('div'),
        phoneVariations = document.createElement('div'),
        phoneFromJson = phone.name ? true : false,
        phoneName = phoneFromJson ? phone.name : phone,
        phoneSuffixes = phoneFromJson ? phone.suffx : 0;
    
    phoneLabel.textContent = phoneName;
    phoneContainer.append(phoneLabel);
    brandPhonesList.append(phoneContainer);

    phoneContainer.addEventListener('click', function() {
        expandPhone(phone);

        let lastExpanded = document.querySelector('div.brand-phones article.expanded');

        if (lastExpanded) lastExpanded.classList.remove('expanded');
        phoneContainer.classList.add('expanded');
    });
}

function addNew(type, brandPhonesList) {
    let body = document.querySelector('body'),
        addNewContainer = document.createElement('section'),
        addNewInput = document.createElement('input');
    
    addNewContainer.className = 'add-new-container';
    addNewInput.className = 'add-new-brand-name';
    
    addNewContainer.append(addNewInput);
    body.append(addNewContainer);
    addNewInput.focus();
    
    addNewInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            let inputValue = addNewInput.value;
            addNewContainer.remove();
            
            if (type === 'brand') addBrand(inputValue);
            if (type === 'model') addModel(inputValue, brandPhonesList);
        }
    });
}

// Populate phone editor
function expandPhone(phone) {
    // Clear current contents
    let phoneEditor = document.querySelector('main.phone-editor form');
    
    function clearEditor() {
        let allInputs = phoneEditor.querySelectorAll('input');
        phoneEditor.innerHTML = '';
    }
    clearEditor();
    
    let phoneHeading = document.createElement('h2'),
        phoneHeadingLabel = document.createElement('span'),
        phoneSubmit = document.createElement('input'),
        valsMain = document.createElement('div');
    
    phoneHeadingLabel.textContent = phone.name;
    phoneSubmit.setAttribute('type', 'submit');
    phoneSubmit.setAttribute('value', 'Save');
    
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

    function createValRow(label, value, container) {
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
            
            createValRow('Filename', file, valsVariant);
            createValRow('Label', phone.suffix[index], valsVariant);
        })
    } else {
        let valsVariant = document.createElement('div');
        valsVariant.className = 'values-variant';
        phoneEditor.append(valsVariant);
        
        createValRow('Filename', phone.file, valsVariant);
        createValRow('Label', '', valsVariant);
    }
    
        
}

// Load json and init
//let jsonUrl = 'https://squig.link/headphones/data/phone_book.json?' + new Date().getTime();
//let jsonUrl = 'https://squig.link/data_mrs/phone_book.json?' + new Date().getTime();
let jsonUrl = 'phone_book.json?' + new Date().getTime();

fetch(jsonUrl)
.then(response => {
    return response.json();
})
.then(data => handleData(data));        