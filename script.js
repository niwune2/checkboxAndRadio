const checkboxListContainer = document.getElementById("checkboxList");
const checkboxNumberInput = document.getElementById('checkboxNumber');
const radioListContainer = document.getElementById("radioList");
const radioNumberInput = document.getElementById('radioNumber');
const addRadioList = document.getElementById('addRadioList');
const addCheckboxList = document.getElementById('addCheckboxList');

addRadioList.addEventListener('click', addRadioItem);
addCheckboxList.addEventListener('click', addCheckboxItem);

const radioData = [
    { id: "radio1", label: "Option 1" },
    { id: "radio2", label: "Option 2" },
    { id: "radio3", label: "Option 3" },
];

const checkboxData = [
    { id: "check1", label: "Check 1" },
    { id: "check2", label: "Check 2" },
    { id: "check3", label: "Check 3" },
];

let numberOfRadioList = radioData.length + 1;
let numberOfCheckboxList = checkboxData.length + 1;

let groupOfRadioList = null;
let groupOfCheckboxList = null;

radioNumberInput.addEventListener('input', () => {
    const number = radioNumberInput.value;
    console.log(`Number of Radio list: ${number}`);
    groupOfRadioList = number;
    console.log(`groupOfRadioList: ${groupOfRadioList}`);
});

checkboxNumberInput.addEventListener('input', () => {
    const number = checkboxNumberInput.value;
    console.log(`Number of Checkbox list: ${number}`);
    groupOfCheckboxList = number;
    console.log(`groupOfCheckboxList: ${number}`);
});

// Initial list additions
radioData.forEach(item => { addRadioItem(item); });
checkboxData.forEach(item => { addCheckboxItem(item); });

function addRadioItem(item = {}) {
    // Check if radio button IDs are provided.
    const id = item.id || `radio${numberOfRadioList}`;
    const label = item.label || `Option ${numberOfRadioList}`;
    const radioItem = createFormItem('radio', id, label);
    radioListContainer.appendChild(radioItem);

    // Increment variable when adding a new ID
    if (!item.id) { numberOfRadioList++; }
    console.log(radioData);
}

function addCheckboxItem(item = {}) {
    // Check if checkbox IDs are provided.
    const id = item.id || `check${numberOfCheckboxList}`;
    const label = item.label || `Check ${numberOfCheckboxList}`;
    const checkboxItem = createFormItem('checkbox', id, label);
    checkboxListContainer.appendChild(checkboxItem);

    if (!item.id) { numberOfCheckboxList++; }
    console.log(checkboxData);
}

function createFormItem(type, id, label) {
    const formItem = document.createElement('div');
    formItem.classList.add(`${type}-item`);

    const formInput = document.createElement('input');
    formInput.type = type;
    formInput.id = id;
    formInput.name = type;

    const formLabel = document.createElement('label');
    formLabel.htmlFor = id;
    formLabel.textContent = label;

    formItem.appendChild(formInput);
    formItem.appendChild(formLabel);

    return formItem;
}