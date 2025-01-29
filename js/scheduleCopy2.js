// schedule.js

// Define the event data structure
const events = [
    {
        name: "Tournament",
        startDate: "2025-01-09",
        duration: 7,
        cycleLength: 28,
        specificDays: [1, 2, 3, 4, 5, 6, 7, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
        image: "./images/tournamentevent.png"
    },
    {
        name: "Stamina Drink Event",
        startDate: "2025-01-09",
        duration: 2,
        cycleLength: 28,
        specificDays: [5, 6],
        image: "./images/staminaevent.png"
    },
    {
        name: "Cash Boost Event",
        startDate: "2025-01-09",
        duration: 2,
        cycleLength: 28,
        specificDays: [5, 6, 26, 27],
        image: "./images/cashevent1.jpg"
    },
    {
        name: "Fight Club Event",
        startDate: "2025-01-09",
        duration: 2,
        cycleLength: 28,
        specificDays: [11, 12],
        image: "./images/fightclubevent1.jpg"
    },
    {
        name: "Decoration Prestige Boost",
        startDate: "2025-01-09",
        duration: 2,
        cycleLength: 28,
        specificDays: [12, 13],
        image: "./images/decorationevent.png"
    },
    {
        name: "Training Event",
        startDate: "2025-01-09",
        duration: 2,
        cycleLength: 28,
        specificDays: [20, 21],
        image: "./images/trainingevent1.jpg"
    },
    {
        name: "Gym Pump Weekend",
        startDate: "2025-01-09",
        duration: 1,
        cycleLength: 28,
        specificDays: [20],
        image: "./images/gympumpevent1.jpg"
    },
    {
        name: "Discipline Event",
        startDate: "2025-01-09",
        duration: 1,
        cycleLength: 28,
        specificDays: [27],
        image: "./images/disciplineevent1.jpg"
    },
    {
        name: "Team Tournament Event",
        startDate: "2025-01-09",
        duration: 7,
        cycleLength: 28,
        specificDays: [8, 9, 10, 11, 12, 13, 14],
        image: "./images/teamtournament.png"
    },
    {
        name: "Team Fight Club Event",
        startDate: "2025-01-09",
        duration: 7,
        cycleLength: 28,
        specificDays: [22, 23, 24, 25, 26, 27, 28],
        image: "./images/teamfightclub.png"
    },
    {
        name: "Grand Championship",
        startDate: "2025-01-09",
        duration: 7,
        cycleLength: 28,
        specificDays: [1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28],
        image: "./images/Grandchamp.jpg"
    },
];

// Function to generate the schedule for a specific year
function generateSchedule(year) {
    const schedule = {};

    events.forEach(event => {
        const eventSchedule = [];
        let currentDate = new Date(event.startDate);

        // Loop through the year
        while (currentDate.getFullYear() <= year + 1) { // Allow for events in the next year
            console.log(`Current Cycle Start Date: ${currentDate.toISOString().split('T')[0]}`); // Log current cycle start date

            // Loop through specific days for the event
            event.specificDays.forEach(day => {
                const eventDate = new Date(currentDate);
                eventDate.setDate(eventDate.getDate() + (day - 1)); // Adjust for zero-based index

                // Log the event date being generated
                //console.log(`Generating Event: ${event.name} on ${eventDate.toISOString().split('T')[0]}`);

                // Only add the event if it's within the current year
                if (eventDate.getFullYear() === year || eventDate.getFullYear() === year + 1) {
                    eventSchedule.push({
                        date: new Date(eventDate),
                        image: event.image // Store the image path
                    });
                }
            });

            // Move to the next cycle
            currentDate.setDate(currentDate.getDate() + event.cycleLength);
        }

        schedule[event.name] = eventSchedule;
    });

    return schedule;
}

// Set your start date here
const startDate = new Date("2025-01-09");
let currentWeek = 0; // Initialize current week

// Function to display events for the current week
function displayEvents() {
    // Calculate the current date based on the current week
    const currentDate = new Date(startDate.getTime() + currentWeek * 7 * 24 * 60 * 60 * 1000);
    
    // Find the previous Monday from the current date
    const dayOfWeek = currentDate.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
    const mondayOffset = (dayOfWeek === 0) ? -6 : 1 - dayOfWeek; // Adjust to get the previous Monday
    const weekStartDate = new Date(currentDate);
    weekStartDate.setDate(currentDate.getDate() + mondayOffset); // Set to the previous Monday
    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekStartDate.getDate() + 6); // Set to the following Sunday

    // Format dates for display
    const weekStartDateStr = weekStartDate.toISOString().split('T')[0];
    const weekEndDateStr = weekEndDate.toISOString().split('T')[0];

    // Update the week display
    const weekDisplay = document.getElementById('week-display');
    if (weekDisplay) {
        weekDisplay.innerText = `${weekStartDateStr} - ${weekEndDateStr}`;
    }

    // Clear previous events
    const weekEventsContainer = document.getElementById('week-events');
    weekEventsContainer.innerHTML = ''; // Clear previous events

    // Create day headers
    const dayHeaders = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dayColumns = dayHeaders.map(day => {
        const column = document.createElement('div');
        column.className = 'day-column';
        const header = document.createElement('h3');
        header.innerText = day;
        column.appendChild(header);
        column.appendChild(document.createElement('div')).className = 'events'; // Create events container
        return column;
    });

    // Append day columns to the week events container
    dayColumns.forEach((column) => {
        weekEventsContainer.appendChild(column);
    });

    const schedule2025 = generateSchedule(2025); // Generate the schedule for 2025

    // Loop through the events and display them for the current week
    for (const eventName in schedule2025) {
        schedule2025[eventName].forEach(event => {
            if (event.date >= weekStartDate && event.date <= weekEndDate) {
                const eventDay = event.date.getDay(); // Get the day of the week (0 = Sun, 1 = Mon, ..., 6 = Sat)
                const dayIndex = (eventDay + 6) % 7; // Adjust to start from Monday (1 = Mon, ..., 0 = Sun)
                const dayColumn = weekEventsContainer.children[dayIndex].querySelector('.events');

                const eventDiv = document.createElement('div');
                eventDiv.className = 'event';
                eventDiv.innerHTML = `<img src="${event.image}" alt="${eventName}" class="event-image">`; // Show the image
                dayColumn.appendChild(eventDiv);
            }
        });
    }
}

// Function to change the week
function changeWeek(direction) {
    currentWeek += direction; // Update the current week
    displayEvents(); // Refresh the displayed events
}

// Call the function to display events initially
displayEvents();
