   // Function to show toast notification
   function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Function to add event listeners to remove buttons
function setupRemoveButtons() {
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        // Remove existing event listeners to prevent duplicates
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Add new event listener
        newButton.addEventListener('click', function() {
            const tableRows = document.querySelectorAll('.entry-row');
            // Only remove if we have more than one row
            if (tableRows.length > 1) {
                this.closest('tr').remove();
                showToast('Row removed successfully');
            } else {
                showToast('Cannot remove the last row', 4000);
            }
        });
    });
}

// Function to automatically calculate hours based on start and end time
function setupTimeCalculation() {
    const rows = document.querySelectorAll('.entry-row');
    
    rows.forEach(row => {
        const startTimeInput = row.querySelector('input[type="time"]:nth-of-type(1)');
        const endTimeInput = row.querySelector('input[type="time"]:nth-of-type(1) + input[type="time"]');
        const hoursInput = row.querySelector('input[type="number"]');
        
        if (startTimeInput && endTimeInput && hoursInput) {
            const calculateHours = function() {
                if (startTimeInput.value && endTimeInput.value) {
                    const start = new Date(`2000-01-01T${startTimeInput.value}`);
                    const end = new Date(`2000-01-01T${endTimeInput.value}`);
                    
                    if (end < start) {
                        // End time is on the next day
                        end.setDate(end.getDate() + 1);
                    }
                    
                    const diffMs = end - start;
                    const diffHours = diffMs / (1000 * 60 * 60);
                    hoursInput.value = diffHours.toFixed(2);
                }
            };
            
            startTimeInput.addEventListener('change', calculateHours);
            endTimeInput.addEventListener('change', calculateHours);
        }
    });
}

// Initial setup for buttons and time calculation
setupRemoveButtons();
setupTimeCalculation();

document.getElementById('add-row').addEventListener('click', function() {
    const table = document.getElementById('entries-table');
    const newRow = table.rows[0].cloneNode(true);
    
    // Clear the inputs in the new row
    const inputs = newRow.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (input.type === 'number') {
            input.value = '';
            input.placeholder = '0.00';
        } else if (input.tagName === 'SELECT') {
            input.selectedIndex = 0;
        } else if (input.tagName === 'TEXTAREA') {
            input.value = '';
        } else {
            input.value = '';
        }
    });
    
    table.appendChild(newRow);
    
    // Setup the remove button and time calculation for the new row
    setupRemoveButtons();
    setupTimeCalculation();
    
    showToast('New row added');
});

document.getElementById('calculate-total').addEventListener('click', function() {
    const hoursInputs = document.querySelectorAll('.entry-row input[type="number"]');
    let totalHours = 0;
    
    hoursInputs.forEach(input => {
        if (input.value) {
            totalHours += parseFloat(input.value);
        }
    });
    
    document.getElementById('total-hours').textContent = totalHours.toFixed(2);
    showToast('Total hours calculated: ' + totalHours.toFixed(2));
});

// Auto-fill current date when the page loads
window.addEventListener('load', function() {
    const today = new Date().toISOString().split('T')[0];
    
    // Default to current date for new entries
    document.querySelectorAll('.entry-row input[type="date"]').forEach(input => {
        if (!input.value) {
            input.value = today;
        }
    });
    
    // Set default date for intern signature
    const employeeDateInput = document.getElementById('employee-date');
    if (employeeDateInput && !employeeDateInput.value) {
        employeeDateInput.value = today;
    }
});

// ON SCROLL

    // Logo resize on scroll
    const header = document.getElementById('mainHeader');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

// Menu toggle

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('header nav');
const navBtns = document.querySelector('.navBtns');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navBtns.classList.toggle('active');
});