// Event management system

// DOM elements
const eventForm = document.getElementById('eventForm');
const eventNameInput = document.getElementById('eventName');
const eventDateInput = document.getElementById('eventDate');
const eventDescriptionInput = document.getElementById('eventDescription');
const eventList = document.getElementById('eventList');

// Load events from localStorage
function loadEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    eventList.innerHTML = '';
    events.forEach((event, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${event.name}</strong><br>
            <em>${event.date}</em><br>
            ${event.description}
            <button onclick="deleteEvent(${index})">Delete</button>
        `;
        eventList.appendChild(li);
    });
}

// Save events to localStorage
function saveEvent(event) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
}

// Handle form submission
eventForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Create event object
    const event = {
        name: eventNameInput.value,
        date: eventDateInput.value,
        description: eventDescriptionInput.value,
    };

    // Save event to localStorage
    saveEvent(event);

    // Reset form
    eventForm.reset();

    // Reload events list
    loadEvents();
});

// Delete event
function deleteEvent(index) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.splice(index, 1);
    localStorage.setItem('events', JSON.stringify(events));

    // Reload events list
    loadEvents();
}

// Load events when the page is ready
document.addEventListener('DOMContentLoaded', loadEvents);

