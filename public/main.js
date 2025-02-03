// Add an event listener to the checkbox with id 'typeSwitch'
document.getElementById('typeSwitch').addEventListener('change', function() {
    // Select the expense options container
    const expenseOptions = document.querySelector('.options.expense');
    // Select the income options container
    const incomeOptions = document.querySelector('.options.income');
    
    // Check if the checkbox is checked
    if (this.checked) {
        // If checked, hide expense options and show income options
        expenseOptions.classList.remove('show');
        incomeOptions.classList.add('show');
    } else {
        // If not checked, hide income options and show expense options
        incomeOptions.classList.remove('show');
        expenseOptions.classList.add('show');
    }
});

// Add an event listener to the document to run when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initially show expense options by adding the 'show' class
    document.querySelector('.options.expense').classList.add('show');
});

// Add an event listener to the button with id 'addExpenseButton'
document.getElementById('addExpenseButton').addEventListener('click', function() {
    // Get the value of the new expense input field and trim any whitespace
    const newExpense = document.getElementById('newExpense').value.trim();
    const userId = document.getElementById('userId').value.trim();
    // Check if the input field is not empty
    if (newExpense) {
        fetch('/addExpense', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({userId, newExpense})
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'success'){
                // Create a new list item element
                const li = document.createElement('li');
                // Set the text content of the list item to the new expense value
                li.textContent = newExpense;
                // Insert the new list item before the parent element (input field and button)
                document.getElementById('expenseList').insertBefore(li, this.parentElement);
                // Clear the input field
                document.getElementById('newExpense').value = '';
                const deleteButton = document.createElement('button');
                deleteButton.textContent = '-';
                deleteButton.classList.add('delete-button');
        
                // Add an event listener to the delete button
                deleteButton.addEventListener('click', function() {
                    // Remove the list item
                    li.remove();
                    // Exit delete mode
                    document.body.classList.remove('delete-mode');
                });
        
                // Append the delete button to the list item
                li.appendChild(deleteButton);
            }else{
                alert(data.message);
                document.getElementById('newExpense').value = '';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Expense adding failed');
        })
    }
});

// Add an event listener to the button with id 'addIncomeButton'
document.getElementById('addIncomeButton').addEventListener('click', function() {
    // Get the value of the new income input field and trim any whitespace
    const newIncome = document.getElementById('newIncome').value.trim();
    const userId = document.getElementById('userId').value.trim();

    // Check if the input field is not empty
    if (newIncome) {
        fetch('/addIncome', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId, newIncome})
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'success'){
                // Create a new list item element
                const li = document.createElement('li');
                // Set the text content of the list item to the new income value
                li.textContent = newIncome;
                // Insert the new list item before the parent element (input field and button)
                document.getElementById('incomeList').insertBefore(li, this.parentElement);
                // Clear the input field
                document.getElementById('newIncome').value = '';
                const deleteButton = document.createElement('button');
                deleteButton.textContent = '-';
                deleteButton.classList.add('delete-button');
        
                // Add an event listener to the delete button
                deleteButton.addEventListener('click', function() {
                    // Remove the list item
                    li.remove();
                    // Exit delete mode
                    document.body.classList.remove('delete-mode');
                });
        
                // Append the delete button to the list item
                li.appendChild(deleteButton);
            }else{
                alert(data.message);
                document.getElementById('newIncome').value = '';
            }
        })
        .catch(error =>{
            console.error('Error:', error);
            alert('Income adding failed');
        })
    }
});
const listItems = document.querySelectorAll('.options li');
// Select all list items in expense and income lists
    
    // Iterate over each list item
    listItems.forEach(function(item) {
        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '-';
        deleteButton.classList.add('delete-button');
        
        // Add an event listener to the delete button
        deleteButton.addEventListener('click', function() {
            // Remove the list item
            item.remove();
            // Exit delete mode
            document.body.classList.remove('delete-mode');
        });
        
        // Append the delete button to the list item
        item.appendChild(deleteButton);
    });


// Add an event listener to the button with id 'deleteButton'
document.getElementById('deleteButton').addEventListener('click', function() {
    // Toggle delete mode
    document.body.classList.toggle('delete-mode');
    
    
});

// Add an event listener to the amount input field to ensure only numbers can be inputted
document.getElementById('amount').addEventListener('keypress', function(event) {
    // Allow only numbers and decimal points
    if (!/[0-9.]/.test(event.key)) {
        event.preventDefault();
    }
});