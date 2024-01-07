const checkboxListContainer = document.getElementById("checkboxList");
const checkboxNumber = document.getElementById('checkboxNumber');
const radioListContainer = document.getElementById("radioList");
const radioNumber = document.getElementById('radioNumber');
// const addRadioList = document.getElementById('addRadioList');
// const addCheckboxList = document.getElementById('addCheckboxList');
const addRadioGroup = document.getElementById('addRadioGroup');
const addCheckboxGroup = document.getElementById('addCheckboxGroup');

// addRadioList.addEventListener('click', addRadioItem);
// addCheckboxList.addEventListener('click', addCheckboxItem);

// const radioData = [
//     { id: "radio1", label: "Option 1" },
//     { id: "radio2", label: "Option 2" },
//     { id: "radio3", label: "Option 3" },
// ];

// const checkboxData = [
//     { id: "check1", label: "Check 1" },
//     { id: "check2", label: "Check 2" },
//     { id: "check3", label: "Check 3" },
// ];

let numberOfRadioList = 0;
let numberOfCheckboxList = 0;
let numberOfRadioGroups = 0;
let numberOfCheckboxGroups = 0;

// Initial list additions
// radioData.forEach(item => { addRadioItem(item); });
// checkboxData.forEach(item => { addCheckboxItem(item); });

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

// リスト要素を生成する関数
// <div class="list-item"><input type="radio"></div>
// このinputにvalue="(任意の名前)"とid='radio(/check)n'を加える

// この関数をcheckとradioに対応させる　-> イベリスに記述する
/** <div id="radioList">
 *      <div class="radio-item">
 *          <input type="radio" id="radio1" name="radio">
 *          <label for="radio1">Option 1</label>
 * </div>
 *...
 * <div class="radio(/check)-item">
 * <div id="checkboxList">
 *      <div class="checkbox-item">
 *      <input type="checkbox" id="check1" name="checkbox">
 *      <label for="check1">Check 1</label>
 * </div>
*/

// #radioListと#checkBoxListをnumberを追記してcreateする
function createListItems(container, type, count) {
    // 既存の要素をクリア
    // 0.'Add Group'を押すとinputの数値を読み取る
    // 1. #radioList(n-3)をcreateして.radioContainerにappendする
    // 2. .radio-itemを入力分create
    // 2-1. .radio-itemにidとnameを付与する
    // 3. <input type="radio" id="radio(n)" name="radio">をcreateする
    // 4. <label for="radio4">Radio 4</label>をcreate
    // 5. 3-4を2にappend(2-4は入力分create)
    // 6. styleを2に適用する

    // container.innerHTML = '';

    // 指定された数だけ要素を生成
    for (let i = 0; i < count; i++) {
        const listItem = document.createElement('div');
        listItem.classList.add('list-item');

        const input = document.createElement('input');
        input.type = type;

        // ここでラベルやその他の要素を追加できます

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
