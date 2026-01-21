const addHabitButton = document.getElementById('add-habit-button');
const noHabitsMessage = document.getElementById('noHabitsMessage');

function addHabitToLocalStorage(habit) {
    localStorage.setItem('habits', JSON.stringify(habit));
}

function showHabits() {
    noHabitsMessage.style.display = 'none';
    const habits = localStorage.getItem('habits')
    document.getElementById('habitsList').textContent = habits

}

addHabitButton.addEventListener('click', () => {
    console.log('add habit button clicked');
    const habitInput = document.getElementById('habitInput');
    if (habitInput.value.trim() === '') {
        alert('habit input is empty');
    } else {
        console.log(habitInput.value);
        addHabitToLocalStorage(habitInput.value);
        habitInput.value = '';
        showHabits();
    }
});




// Check if there are any habits in the list. 
// if there are no habits, show the no habits message.
// if there is a habit, show the habit list.