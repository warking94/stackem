const addHabitButton = document.getElementById('add-habit-button');
const noHabitsMessage = document.getElementById('noHabitsMessage');
const clearLocalStorageButton = document.getElementById('clear-local-storage');
const habitsList = document.getElementById('habitsList');
const habitInput = document.getElementById('habitInput');
const d = new Date();






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
            const habitButtons = document.createElement('div')
            const yesButton = document.createElement('button');
            const noButton = document.createElement('button');
            li.className = 'habitListItem';
            habitButtons.className = 'habitListbuttons';
            habitName.textContent = habit;
            habitName.className = 'habit-name'
            yesButton.textContent = 'yes';
            yesButton.id = habit.replace(/\s+/g, '_') + '_yes'
            noButton.textContent = 'no';
            noButton.id = habit.replace(/\s+/g, '_') + '_no'
            habitButtons.appendChild(yesButton);
            habitButtons.appendChild(noButton);
            li.appendChild(habitName);
            li.appendChild(habitButtons);
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

clearLocalStorageButton.addEventListener('click', () => {
    localStorage.clear();
    console.log('local storage cleared');
    checkHabits();
})

habitsList.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        console.log(event.target);
        console.log('button id: ' + event.target.id);
        const li = event.target.closest('.habitListItem');
        const habitName = li.querySelector('.habit-name').textContent;
        console.log('Habit name is: ' + habitName);

        // if (localStorage.getItem(habitName + '_record') == null) {
        //     localStorage.setItem(habitName + '_record', d.getDate());
        //     console.log('local storage for record set')
        // } else {
        //     const record = localStorage.getItem(habitName + '_record');
        //     parsedRecord = JSON.parse(record);
        //     parsedRecord.push(d.getDate())
        //     localStorage.setItem(habitName + '_record', JSON.stringify(record))
        //     console.log('New record shows:  ' + localStorage.getItem(habitName + '_record'))

        // }


        const habitHisory = JSON.parse(localStorage.getItem(habitName + '_history') || '[]');
        habitHisory.push({ date: d.getDate(), completed: event.target.textContent})
        localStorage.setItem(habitName + '_history', JSON.stringify(habitHisory))
        console.log(localStorage.getItem(habitName + '_history'))
        console.log(JSON.parse(localStorage.getItem(habitName + '_history')))
    }
})


console.log('----------------------')
console.log('DATE: ' + d.getDate())
console.log('MONTH: ' + d.getMonth())
console.log('YEAR: ' + d.getFullYear())