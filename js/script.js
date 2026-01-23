const addHabitButton = document.getElementById('add-habit-button');
const noHabitsMessage = document.getElementById('noHabitsMessage');
const clearLocalStorageButton = document.getElementById('clear-local-storage');
const habitsList = document.getElementById('habitsList');
const habitInput = document.getElementById('habitInput');


function addHabitToLocalStorage(habit) {
    if (habit.length > 0) {
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
            const streak = document.createElement('p');
            li.className = 'habitListItem';
            habitButtons.className = 'habitListbuttons';
            habitName.textContent = habit;
            habitName.className = 'habit-name'
            yesButton.textContent = 'yes';
            yesButton.id = habit.replace(/\s+/g, '_') + '_yes';
            noButton.textContent = 'no';
            noButton.id = habit.replace(/\s+/g, '_') + '_no';

            streak.textContent = 'Curent Streak: 0';
            streak.id = habit + '_streak'

            habitButtons.appendChild(yesButton);
            habitButtons.appendChild(noButton);
            
            li.appendChild(habitName);
            li.appendChild(habitButtons);
            li.appendChild(streak)
            habitsList.appendChild(li)
        })
        habitsList.style.display = 'block';
    }
};


function countStreak(habitHistory) {
    // const habitHisory = JSON.parse(localStorage.getItem(habitName + '_history') || '[]');

    // for habit in habit list get habit history.
    // count from the end of the history backwards how many yes we have

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(key, value);
    }

    let streak = 0;
    for (let i = habitHistory.length -1; i>= 0; i--) {
        if (habitHistory[i].completed === 'yes') {
            streak++;
        } else { 
            break
        }
    }

    return streak;

}


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
        const li = event.target.closest('.habitListItem')
        const habitName = li.querySelector('.habit-name').textContent;

        const d = new Date();
        const today = d.toISOString().split('T');

        const habitHisory = JSON.parse(localStorage.getItem(habitName + '_history') || '[]');
        const dateExists = habitHisory.some(item => item.date === today);

        if (dateExists) {
            habitHisory.pop();
            habitHisory.push({ date: today, completed: event.target.textContent});
        } else {
            habitHisory.push({ date: today, completed: event.target.textContent});
        }

        localStorage.setItem(habitName + '_history', JSON.stringify(habitHisory));

        console.log(localStorage.getItem(habitName + '_history'));
        console.log(JSON.parse(localStorage.getItem(habitName + '_history')));

        countStreak(habitHisory)
        console.log(countStreak(habitHisory))

        const streakCounter = document.getElementById(habitName + '_streak')
        streakCounter.textContent = 'Current Streak: ' + countStreak(habitHisory)
    }

})


