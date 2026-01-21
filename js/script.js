const addHabitButton = document.getElementById('add-habit-button');
const noHabitsMessage = document.getElementById('noHabitsMessage');
const clearLocalStorage = document.getElementById('clear-local-storage');
const habitsList = document.getElementById('habitsList');

function addHabitToLocalStorage(habit) {
    let oldHabits = localStorage.getItem('habits')
    if (oldHabits == null) {
        localStorage.setItem('habits', JSON.stringify([habit]))
    } else {
        oldHabits = JSON.parse(oldHabits)
        oldHabits.push(habit)
        localStorage.setItem('habits', JSON.stringify(oldHabits))
    }
    checkHabits();
}

function checkHabits() {
    if (localStorage.getItem('habits') == null) {
        noHabitsMessage.style.display = 'block';
        console.log('no habits found');
        habitsList.style.display = 'none';
    } else {
        let habits = localStorage.getItem('habits');
        habits = JSON.parse(habits);
        console.log('habits found');
        noHabitsMessage.style.display = 'none';
        // for items in habit list populate habitsList
        habitsList.innerHTML = '';
        habits.forEach(habit => {
            const li = document.createElement('li');
            li.textContent = habit;
            habitsList.appendChild(li)
        })
        habitsList.style.display = 'block';
    }
};

checkHabits()

addHabitButton.addEventListener('click', () => {
    console.log('add habit button clicked');
    const habitInput = document.getElementById('habitInput');
    addHabitToLocalStorage(habitInput.value);
});

clearLocalStorage.addEventListener('click', () => {
    localStorage.clear();
    console.log('local storage cleared');
    checkHabits();
})



// Check if there are any habits in the list. 
// if there are no habits, show the no habits message.
// if there is a habit, show the habit list.