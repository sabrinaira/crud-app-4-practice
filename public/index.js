/**
 * This is where you will apply your DOM manipulation magic!
 *
 * An example has been set up for you that renders an <h1> element containing the text, "Hello World!"
 *
 * */

const body = document.querySelector('body'); // selects the first element occurence from the html

const title = document.createElement('h1');
title.innerText = 'Simple CRUD App';
body.appendChild(title);

/** Simple CRUD App stuff logic here! */

const divForm = document.createElement('div');
body.appendChild(divForm);

const form = document.createElement('form');
form.setAttribute('id', 'crudForm');
body.appendChild(form);

const fName = document.createElement('input');
fName.setAttribute('id', 'firstName');
fName.setAttribute('type', 'text');
fName.placeholder = 'First name';

const lName = document.createElement('input');
lName.setAttribute('id', 'lastName');
lName.setAttribute('type', 'text');
lName.placeholder = 'Last Name';

const ageField = document.createElement('input');
ageField.setAttribute('id', 'age');
ageField.setAttribute('type', 'text');
ageField.placeholder = 'Age';

const colorField = document.createElement('input');
colorField.setAttribute('id', 'color');
colorField.setAttribute('type', 'text');
colorField.placeholder = 'Color';

const button = document.createElement('button');
button.type = 'button';
button.textContent = 'Submit';

button.addEventListener('click', () => {
  console.log(
    `First Name: ${fName.value}, Last Name: ${lName.value}, Age: ${ageField.value}, Color: ${colorField.value}`
  );
});

const submit = () => {
  fetch('http://localhost:5001/users/')
    .then(() => {})
    .catch(() => {});
};

form.append(
  'First Name:',
  fName,
  document.createElement('br'),
  'Last Name:',
  lName,
  document.createElement('br'),
  'Age:',
  ageField,
  document.createElement('br'),
  'Color:',
  colorField,
  document.createElement('br'),
  button
);
