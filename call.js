
const selectElement = document.querySelector('select');
const selectValue = selectElement.value;
console.log(selectValue);
selectElement.value = 'option2';
// Add a new option
const newOption = document.createElement('option');
newOption.value = 'option4';
newOption.text = 'option4';
selectElement.appendChild(newOption);

//Remove an option
selectElement.removeChild(selectElement.options[0]);