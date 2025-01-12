// Define the event data structure
const events = [
    {
        name: "Tournament",
        image: "./images/tournamentevent.png",
        specificDays: [1, 2, 3, 4, 5, 6, 7, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
    },
    {
        name: "Stamina Drink Event",
        image: "./images/staminaevent.png",
        specificDays: [5, 6]
    },
    {
        name: "Cash Boost Event",
        image: "./images/cashevent1.jpg",
        specificDays: [5, 6, 26, 27]
    },
    {
        name: "Fight Club Event",
        image: "./images/fightclubevent1.jpg",
        specificDays: [11, 12]
    },
    {
        name: "Decoration Prestige Boost",
        image: "./images/decorationevent.png",
        specificDays: [12, 13]
    },
    {
        name: "Training Event",
        image: "./images/trainingevent1.jpg",
        specificDays: [20, 21]
    },
    {
        name: "Gym Pump Weekend",
        image: "./images/gympumpevent1.jpg",
        specificDays: [20]
    },
    {
        name: "Discipline Event",
        image: "./images/disciplineevent.jpg",
        specificDays: [27]
    },
    {
        name: "Team Tournament Event",
        image: "./images/teamtournament.png",
        specificDays: [8, 9, 10, 11, 12, 13, 14]
    },
    {
        name: "Team Fight Club Event",
        image: "./images/teamfightclub.png",
        specificDays: [22, 23, 24, 25, 26, 27, 28]
    },
    {
        name: "Grand Championship",
        image: "./images/Grandchamp.jpg",
        specificDays: [1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28]
    },
];

// Function to generate events for a given year
function generateEventsForYear(year) {
    const eventsForYear = [];
    const startDate = new Date(year, 0, 1); // January 1st of the given year

    for (let month = 0; month < 12; month++) {
        for (let day = 1; day <= 31; day++) {
            const date = new Date(year, month, day);
            if (date.getMonth() !== month) continue; // Skip invalid dates

            const dayOfCycle = (day - 1) % 28 + 1; // Calculate the day in the cycle
            const dailyEvents = events.filter(event => event.specificDays.includes(dayOfCycle));

            if (dailyEvents.length > 0) {
                eventsForYear.push({
                    date: date.toISOString().split('T')[0],
                    events: dailyEvents
                });
            }
        }
    }
    return eventsForYear;
}

// Initialize variables
let currentWeek = 0; // Initialize current week
const eventsFor2025 = generateEventsForYear(2025); // Generate events for 2025

// Function to display events in the calendar
function displayEvents() {
    const weekEventsContainer = document.getElementById('week-events');
    weekEventsContainer.innerHTML = ''; // Clear existing events

    // Calculate the start index for the current week (Monday)
    const startIndex = currentWeek * 7; // This assumes currentWeek is 0 for the first week
    const endIndex = startIndex + 7;

    // Days of the week
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Loop through the events for the current week and display them
    for (let i = startIndex; i < endIndex && i < eventsFor2025.length; i++) {
        const event = eventsFor2025[i];
        const eventElement = document.createElement('div');
        eventElement.className = 'event-item';

        // Create a header for the date and day
        const date = new Date(event.date);
        const dayName = daysOfWeek[date.getDay() === 0 ? 6 : date.getDay() - 1]; // Adjust for Sunday
        const dateHeader = document.createElement('div');
        dateHeader.className = 'date-header';
        dateHeader.innerText = `${dayName} ${date.getDate()}`;
        eventElement.appendChild(dateHeader);
        
        // Loop through each event for the day
        event.events.forEach(ev => {
            const eventDetail = document.createElement('div');
            eventDetail.className = 'event-detail';
            eventDetail.innerHTML = `
                <img src="${ev.image}" alt="${ev.name}" class="event-poster">
            `;
            eventElement.appendChild(eventDetail);
        });

        weekEventsContainer.appendChild(eventElement);
    }

    // Update the header with the current week's date range
    const startDate = new Date(eventsFor2025[startIndex].date);
    const endDate = new Date(eventsFor2025[endIndex - 1].date);
    document.getElementById('week-display').innerText = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
}

// Function to change the week
function changeWeek(direction) {
    currentWeek += direction; // Update the current week
    displayEvents(); // Refresh the displayed events
}

// Call the function to display events initially
displayEvents();
