const checkboxListContainer = document.getElementById("checkboxList");
const checkboxNumber = document.getElementById('checkboxNumber');
const radioListContainer = document.getElementById("radioList");
const radioNumber = document.getElementById('radioNumber');
const addRadioGroup = document.getElementById('addRadioGroup');
const addCheckboxGroup = document.getElementById('addCheckboxGroup');

let numberOfRadioList = 0;
let numberOfCheckboxList = 0;
let numberOfRadioGroups = 0;
let numberOfCheckboxGroups = 0;

function addRadioItem(item = {}) {
    // Check if radio button IDs are provided.
    const id = item.id || `radio${numberOfRadioList}`;
    const label = item.label || `Option ${numberOfRadioList}`;
    const radioItem = createFormItem('radio', id, label);
    radioListContainer.appendChild(radioItem);

    // Increment variable when adding a new ID
    if (!item.id) { numberOfRadioList++; }
}

function addCheckboxItem(item = {}) {
    // Check if checkbox IDs are provided.
    const id = item.id || `check${numberOfCheckboxList}`;
    const label = item.label || `Check ${numberOfCheckboxList}`;
    const checkboxItem = createFormItem('checkbox', id, label);
    checkboxListContainer.appendChild(checkboxItem);

    if (!item.id) { numberOfCheckboxList++; }
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

function createListItems(container, type, count) {
    // 指定された数だけ要素を生成
    for (let i = 0; i < count; i++) {
        const listItem = document.createElement('div');
        listItem.classList.add('list-item');

        const input = document.createElement('input');
        input.type = type;

        listItem.appendChild(input);
        container.appendChild(listItem);
    }

    // グループ化のためにborderを追加
    container.style.border = '1px solid black';
}

checkboxNumber.addEventListener('input', () => {
    const number = parseInt(checkboxNumber.value, 10);
    createListItems(checkboxListContainer, 'checkbox', number);
    groupOfCheckboxList = number;

    console.log(`Number of Checkbox list: ${number}\ngroupOfCheckboxList: ${number}`);
});

// リストを生成しグループ化する関数
function createRadioGroup(number, groupName) {
    const group = document.createElement('fieldset');
    group.style.border = '1px solid black';
    group.style.margin = '1px';
    group.id = groupName;

    for (let i = 0; i < number; i++) {
        const radioItem = document.createElement('div');
        radioItem.classList.add('radio-item');

        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.id = `${groupName}-radio${i}`;
        radioInput.name = groupName;

        const radioLabel = document.createElement('label');
        radioLabel.htmlFor = `${groupName}-radio${i}`;
        radioLabel.textContent = `Option ${i + 1}`;

        // ラベルをクリックしたときのイベントリスナー
        radioLabel.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = radioLabel.textContent;
            radioLabel.replaceWith(input);

            input.addEventListener('blur', () => {
                radioLabel.textContent = input.value;
                input.replaceWith(radioLabel);
            });
        });

        radioItem.appendChild(radioInput);
        radioItem.appendChild(radioLabel);
        group.appendChild(radioItem);
    }

    radioListContainer.appendChild(group);
}

// グループの追加ボタンのイベントリスナー
addRadioGroup.addEventListener('click', () => {
    const number = parseInt(radioNumber.value, 10);
    createRadioGroup(number, `radioGroup${numberOfRadioGroups}`);
    numberOfRadioGroups++;
});
