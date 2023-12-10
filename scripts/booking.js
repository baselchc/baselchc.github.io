/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?

document.addEventListener('DOMContentLoaded', function() {
 
    const days = document.querySelectorAll('.day-selector li');
    const clearButton = document.getElementById('clear-button');
    const halfDayButton = document.getElementById('half');
    const fullDayButton = document.getElementById('full');
    const costDisplay = document.getElementById('calculated-cost');

    let costPerDay = 35;
    let selectedDays = new Set();

/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!

days.forEach (function(day)  {
    day.addEventListener('click', function() {
        
        if (selectedDays.has(this.textContent)) {
            selectedDays.delete(this.textContent);
            this.classList.remove('clicked');
        } else {
            selectedDays.add(this.textContent);
            this.classList.add('clicked');
        }
        calculateTotalCost();
    });
});

/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.

clearButton.addEventListener('click', function() {
    selectedDays.clear();
    days.forEach(function(day) {
        day.classList.remove('clicked');
    });
    calculateTotalCost();
});

/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.

halfDayButton.addEventListener('click', function() {
    costPerDay = 20; // Change to half day rate
    this.classList.add('clicked');
    fullDayButton.classList.remove('clicked');
    calculateTotalCost();
});

fullDayButton.addEventListener('click', function() {
    costPerDay = 35; // Change to full day rate
    this.classList.add('clicked');
    halfDayButton.classList.remove('clicked');
    calculateTotalCost();
});

// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.

/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value

function calculateTotalCost() {
    let totalCost = costPerDay * selectedDays.size;
    costDisplay.textContent = 'Total Cost: $' + totalCost;
}
});
