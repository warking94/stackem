const addHabitButton = document.getElementById('add-habit-button');
const noHabitsMessage = document.getElementById('noHabitsMessage');
const clearLocalStorage = document.getElementById('clear-local-storage');
const habitsList = document.getElementById('habitsList');
const habitInput = document.getElementById('habitInput');

function addHabitToLocalStorage(habit) {
    if (habitInput.value.length > 0) {
        let oldHabits = localStorage.getItem('habits')
        if (oldHabits == null) {
            localStorage.setItem('habits', JSON.stringify([habit]))
        } else {
            oldHabits = JSON.parse(oldHabits)
            oldHabits.push(habit)
            localStorage.setItem('habits', JSON.stringify(oldHabits))
        }
        checkHabits();
    } else {
        console.log('No input found')
    }

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
            const habitName = document.createElement('div');
            const yesButton = document.createElement('button');
            const noButton = document.createElement('button');
            li.className = 'habitListItem';
            habitName.textContent = habit;
            yesButton.textContent = 'yes';
            noButton.textContent = 'no';
            li.appendChild(habitName);
            li.appendChild(yesButton);
            li.appendChild(noButton);
            habitsList.appendChild(li)
        })
        habitsList.style.display = 'block';
    }
};

checkHabits()

habitInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        console.log('enter from user input');
        addHabitToLocalStorage(habitInput.value);
        habitInput.value = '';
    }

})

addHabitButton.addEventListener('click', () => {
    console.log('add habit button clicked');
    addHabitToLocalStorage(habitInput.value);
    habitInput.value = '';
});

clearLocalStorage.addEventListener('click', () => {
    localStorage.clear();
    console.log('local storage cleared');
    checkHabits();
})



