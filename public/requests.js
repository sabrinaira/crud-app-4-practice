/** -- FETCH CRUD REQUESTS -- */
// I had to put these on a different file because all the features are becoming clutterd over at index.js.

/**
 * READ
 * GET REQUEST
 * */
export const display = async (body, openEditForm) => {
  try {
    const response = await fetch('http://localhost:5001/users/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json(body);
    // console.log(data);

    // Create a container to display the data that already exists in the database
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

      // adds an Edit button for each item
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => openEditForm(item));
      userCard.appendChild(editButton);

      // delete button to delete the entry
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () =>
        remove(item._id, item.firstName, item.lastName)
      );
      userCard.appendChild(deleteButton);

      displayContainer.appendChild(userCard);
    });
  } catch (err) {
    console.error('Unable to retrieve list of Data:', err);
  }
};

/**
 * CREATE
 * POST REQUEST
 * */
export const submit = async (formData) => {
  try {
    const response = await fetch('http://localhost:5001/users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Error submitting data form');
    }

    display();

    const data = await response.json();
    console.log('Data submitted:', data);
  } catch (err) {
    console.error('Submission failed:', err.message);
  }
};

/**
 * UPDATE
 * PATCH REQUEST
 * */
export const update = async (id, updateData) => {
  try {
    const response = await fetch(`http://localhost:5001/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error('Error updating data');
    }

    const data = await response.json();
    console.log('Data updated:', data);

    // Re-fetch and display updated data
    display();
  } catch (err) {
    console.error('Unable to update data:', err);
  }
};

/**
 * DELETE
 * DELETE REQUEST
 * */
export const remove = async (id, firstName, lastName) => {
  try {
    console.log(`Deleting user: ${firstName} ${lastName}`);

    const response = await fetch(`http://localhost:5001/users/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log(
        `User with id:${id} successfully deleted: ${firstName} ${lastName}`
      );

      display();

      const data = await response.json();
      return data;
    } else {
      console.error(`Failed to delete user with id:${id}`);
    }
  } catch (err) {
    console.error('Unable to delete data from database:', err);
  }
};
