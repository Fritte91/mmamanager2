// schedule.js

// Define the event data structure
const events = [
    {
        name: "Tournament",
        date: [
            "2024-12-23", "2025-01-09", "2025-01-16", "2025-01-23", 
            "2025-01-30", "2025-02-06", "2025-02-13", "2025-02-20"
        ], // Example date
        image: "./images/tournamentevent.png" // Ensure this path is correct
    },
    {
        name: "Team Tournament",
        date: "2024-12-24",
        image: "./images/fightclubevent1.jpg"
    },
    {
        name: "Stamina Drink Event",
        date: "2024-12-23",
        image: "./images/staminaevent.png" // Ensure this path is correct
    },
    {
        name: "Decoration Prestige Boost",
        date: "2024-12-23",
        image: "./images/decorationevent.png" // Ensure this path is correct
    },
    {
        name: "Training Event",
        date: "2024-12-25",
        image: "./images/trainingevent1.jpg"
    },
    {
        name: "discipline Event",
        date: "2024-12-26",
        image: "./images/staminaevent.png"
    },
    {
        name: "Cash Boost Event",
        date: "2024-12-28",
        image: "./images/cashevent1.jpg"
    },
    {
        name: "Gym Pump Event",
        date: "2024-12-27",
        image: "./images/gympumpevent1.jpg"
    },
    {
        name: "Cash Boost Event",
        date: "2024-12-29",
        image: "./images/cashevent1.jpg"
    },
    {
        name: "Fight Club Event",
        date: "2024-12-24",
        image: "./images/fightclubevent1.jpg"
    },
    {
        name: "Grand Championship",
        date: "2024-12-24",
        image: "./images/fightclubevent1.jpg"
    },
];

// Set your start date here
const startDate = new Date("2025-01-09");
let currentWeek = 0; // Initialize current week

// Function to display events for the current week
function displayEvents() {
    const currentDate = new Date(startDate.getTime() + currentWeek * 7 * 24 * 60 * 60 * 1000);
    const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds

    // Update the date display
    const weekTitle = document.getElementById('week-title');
    weekTitle.innerText = `Week of ${currentDate.toDateString()}`; // Display the current week date

    const weekEventsContainer = document.getElementById('week-events');
    weekEventsContainer.innerHTML = ''; // Clear previous events

    // Define abbreviated day names
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    // Loop through the days of the week
    days.forEach((day, index) => {
        const dayElement = document.createElement('div');
        dayElement.className = 'event-item';
        dayElement.setAttribute('data-day', day);
        dayElement.textContent = day; // Set the abbreviated day name

        // Add events for the day (if any)
        const eventsForDay = events.filter(event => event.date === getDateForDay(index));
        console.log(`Events for ${day}:`, eventsForDay); // Log events for the day

        eventsForDay.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.className = 'event';
            eventDiv.innerHTML = `<img src="${event.image}" alt="${event.name}" class="event-image">`;
            dayElement.appendChild(eventDiv);
        });

        weekEventsContainer.appendChild(dayElement);
    });

    // Example logic to add class based on event count
    const eventItems = document.querySelectorAll('.event-item');
    eventItems.forEach(item => {
        const events = item.querySelectorAll('.event'); // Get all events in the item
        const eventCount = events.length;
        if (eventCount > 1) {
            item.classList.add('multiple-events'); // Add class for multiple events
            item.setAttribute('data-event-count', eventCount); // Set event count
        } else {
            item.classList.add('single-event'); // Add class for single event
        }
    });
}

// Function to get the date for a specific day index
function getDateForDay(index) {
    const currentDate = new Date(startDate.getTime() + currentWeek * 7 * 24 * 60 * 60 * 1000);
    const firstDayOfWeek = currentDate.getDate() - currentDate.getDay() + 1; // Adjust to get the first day of the week
    const date = new Date(currentDate.setDate(firstDayOfWeek + index)); // Get the date for the specific day
    return date.toISOString().split('T')[0]; // Return date in YYYY-MM-DD format
}

// Function to change the week
function changeWeek(direction) {
    currentWeek += direction; // Update the current week
    displayEvents(); // Refresh the displayed events
}

// Call the function to display events initially
displayEvents();