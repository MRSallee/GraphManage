/* See LICENSE file for copyright and license details */
// Load data and populate phone list
function handleData(data) {
    console.log(data);
    let phoneList = document.querySelector('main.phone-list');
    
    Object.entries(data).forEach(function(item) {        
        let brandContainer = document.createElement('section'),
            brandLabel = document.createElement('div'),
            brandPhonesList = document.createElement('div'),
            brandName = item[1].name,
            brandPhones = item[1].phones;
        
        brandContainer.classList.add('brand');
        brandLabel.classList.add('brand-label')
        brandPhonesList.classList.add('brand-phones')
        
        brandLabel.textContent = brandName;
        
        brandContainer.append(brandLabel);
        brandContainer.append(brandPhonesList);
        phoneList.append(brandContainer);
        
        // Add phones from a brand
        brandPhones.forEach(function(phone) {
            let phoneContainer = document.createElement('article'),
                phoneLabel = document.createElement('div'),
                phoneVariations = document.createElement('div'),
                phoneName = phone.name,
                phoneSuffixes = phone.suffx;
            
            phoneLabel.textContent = phoneName;
            phoneContainer.append(phoneLabel);
            brandPhonesList.append(phoneContainer);
            
            phoneContainer.addEventListener('click', function() {
                expandPhone(phone);
                
                let lastExpanded = document.querySelector('div.brand-phones article.expanded');
                
                if (lastExpanded) lastExpanded.classList.remove('expanded');
                phoneContainer.classList.add('expanded');
            });
        });
        
    });
}

// Populate phone editor
function expandPhone(phone) {
    console.log(phone);
    
    // Clear current contents
    let phoneEditor = document.querySelector('main.phone-editor form');
    phoneEditor.innerHTML = '';
    
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
let jsonUrl = 'https://squig.link/headphones/data/phone_book.json?' + new Date().getTime();

fetch(jsonUrl)
.then(response => {
    return response.json();
})
.then(data => handleData(data));        