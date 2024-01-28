
// Get the element with an ID of 'booger'
let boogerElement = document.getElementById('inventory');

// Create a new list item
let newListItem = document.createElement('li');

// Add a class to the new list item
newListItem.className = 'list-group-item';

// Set the text content of the new list item
newListItem.textContent = 'New list item';

// Add the new list item to the 'booger' element
boogerElement.appendChild(newListItem);
