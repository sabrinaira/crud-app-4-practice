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

  /** -- FETCH REQUESTS -- */

  /** POST REQUEST */
  const submit = async (formData) => {
    try {
      const response = await fetch('http://localhost:5001/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error submitting data form');
      }

      const data = await response.json();
      console.log('Data submitted:', data);
    } catch (err) {
      console.error('Submission failed:', err.message);
    }
  };

  /** GET REQUEST */
  const display = async (params) => {
    try {
      const response = await fetch('http://localhost:5001/users/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      console.log(data);

      //Create a container to display the data that already exists in the database
      let displayContainer = document.querySelector('#displayContainer');
      if (!displayContainer) {
        displayContainer = document.createElement('div');
        displayContainer.id = 'displayContainer';
        body.appendChild(displayContainer);
      }
      // Clear the container before appending new data
      displayContainer.innerHTML = '';

      // Loop through the data and render each item
      data.forEach((item) => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card'; // Add styling class if needed

        userCard.innerHTML = `
        <p><strong>First Name:</strong> ${item.firstName}</p>
        <p><strong>Last Name:</strong> ${item.lastName}</p>
        <p><strong>Age:</strong> ${item.age}</p>
        <p><strong>Color:</strong> ${item.color}</p>
      `;

        displayContainer.appendChild(userCard);
      });
    } catch (err) {
      console.error('Unable to retrieve list of Data:', err);
    }
  };

  /** PATCH REQUEST */
  const update = async (params) => {
    try {
    } catch (err) {
      console.error('Unable to update data:', err);
    }
  };

  /** DELETE REQUEST */
  const remove = async (params) => {
    try {
    } catch (err) {
      console.error('Unable to delete data from database:', err);
    }
  };

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

  display();
});
