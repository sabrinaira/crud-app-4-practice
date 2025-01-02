import { submit, display, update, remove } from './crud.js';

/**
 * The document.addEventListener function and 'DOMContentLoaded' ensures that the all code will be executed once the DOM is fully loaded.
 *
 */

document.addEventListener('DOMContentLoaded', () => {
  /**
   * This is where you will apply your DOM manipulation magic!
   *
   * An example has been set up for you that renders an <h1> element containing the text, "Simple CRUD App".
   *
   * */

  const body = document.querySelector('body'); // selects the first element occurence from the html

  const title = document.createElement('h1');
  title.innerText = 'Simple CRUD App';
  body.appendChild(title);

  /** -- The Form Section  -- */

  const form = document.createElement('form');
  form.setAttribute('id', 'crudForm');
  body.appendChild(form);

  const fName = document.createElement('input');
  fName.setAttribute('id', 'firstName');
  fName.setAttribute('name', 'firstName');
  fName.setAttribute('type', 'text');
  fName.placeholder = 'First name';

  const lName = document.createElement('input');
  lName.setAttribute('id', 'lastName');
  lName.setAttribute('name', 'lastName');
  lName.setAttribute('type', 'text');
  lName.placeholder = 'Last Name';

  const ageField = document.createElement('input');
  ageField.setAttribute('id', 'age');
  ageField.setAttribute('name', 'age');
  ageField.setAttribute('type', 'text');
  ageField.placeholder = 'Age';

  const colorField = document.createElement('input');
  colorField.setAttribute('id', 'color');
  colorField.setAttribute('name', 'color');
  colorField.setAttribute('type', 'text');
  colorField.placeholder = 'Color';

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Submit';

  /** -- Form Validation --
   * This is to check any edge cases where if the fields are empty or does not match the expected values
   */
  const validateForm = () => {
    let text = ''; // Reset text to store error message
    const validateMsg = document.querySelector('#validationMsg'); // Get the existing message element if it exists

    if (validateMsg) {
      validateMsg.remove();
      // removes an existing validationMsg if there already is one
    }

    if (fName.value === '' || lName.value === '') {
      text = 'Name fields are required.';
    } else if (typeof ageField.value !== 'number') {
      text = 'Age field input is invalid.';
    }

    if (text) {
      const validateMsg = document.createElement('p');
      validateMsg.id = 'validationMsg';
      validateMsg.textContent = text;
      body.appendChild(validateMsg);
      return false; // Return false if validation fails
    }
    return true; // Return true if validation passes
  };

  const openEditForm = (user) => {
    // Clear previous form if exists
    let editForm = document.querySelector('#editForm');
    if (editForm) editForm.remove();

    // Create a form for editing
    editForm = document.createElement('form');
    editForm.id = 'editForm';

    const firstNameInput = document.createElement('input');
    firstNameInput.value = user.firstName;

    const lastNameInput = document.createElement('input');
    lastNameInput.value = user.lastName;

    const ageInput = document.createElement('input');
    ageInput.type = 'number';
    ageInput.value = user.age;

    const colorInput = document.createElement('input');
    colorInput.value = user.color;

    const saveButton = document.createElement('button');
    saveButton.type = 'button';
    saveButton.textContent = 'Save';

    saveButton.addEventListener('click', () => {
      const updatedData = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        age: parseInt(ageInput.value, 10),
        color: colorInput.value,
      };
      update(user._id, updatedData); // Call the PATCH function with updated data
    });

    editForm.append(
      'First Name:',
      firstNameInput,
      document.createElement('br'),
      'Last Name:',
      lastNameInput,
      document.createElement('br'),
      'Age:',
      ageInput,
      document.createElement('br'),
      'Color:',
      colorInput,
      document.createElement('br'),
      saveButton
    );

    document.body.appendChild(editForm);
  };

  /**  Submit Button Event Listener */
  button.addEventListener('click', () => {
    // Need to input the values from the input fields in order to pass down to the 'submit' function

    if (validateForm()) {
      const formData = {
        firstName: fName.value,
        lastName: lName.value,
        age: parseInt(ageField.value, 10),
        color: colorField.value,
      };

      console.log('Form Data:', formData);

      submit(formData);
    }
  });

  // Appending the <form> onto the document body
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

  display(body, openEditForm);
});
