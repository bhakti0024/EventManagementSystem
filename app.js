// Event management system

// DOM elements
const eventForm = document.getElementById('eventForm');
const eventNameInput = document.getElementById('eventName');
const eventDateInput = document.getElementById('eventDate');
const eventDescriptionInput = document.getElementById('eventDescription');
const eventList = document.getElementById('eventList');

let editingEventIndex = null; // Track the event being edited

// Load events from localStorage
function loadEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    eventList.innerHTML = '';
    events.forEach((event, index) => {
        const li = document.createElement('li');
        li.dataset.index = index;
        li.innerHTML = `
            <strong>${event.name}</strong><br>
            <span>${event.date}</span><br>
            <span>${event.description}</span><br>
            <button class="edit" onclick="editEvent(${index})">Edit</button>
            <button onclick="deleteEvent(${index})">Delete</button>
        `;
        eventList.appendChild(li);
    });
}

// Save events to localStorage
function saveEvent(event) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    if (editingEventIndex !== null) {
        // Update existing event
        events[editingEventIndex] = event;
    } else {
        // Add new event
        events.push(event);
    }
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

    // Reset form and exit editing mode
    eventForm.reset();
    editingEventIndex = null;

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

// Edit event - populate the form with current event details
function editEvent(index) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const event = events[index];

    // Populate the form with event data
    eventNameInput.value = event.name;
    eventDateInput.value = event.date;
    eventDescriptionInput.value = event.description;

    // Set the editing index to track which event we are editing
    editingEventIndex = index;

    // Change the button text to "Update Event"
    const submitButton = eventForm.querySelector('button');
    submitButton.textContent = 'Update Event';
}

// Load events when the page is ready
document.addEventListener('DOMContentLoaded', loadEvents);
// Event management system

// DOM elements
const eventForm = document.getElementById('eventForm');
const eventNameInput = document.getElementById('eventName');
const eventDateInput = document.getElementById('eventDate');
const eventDescriptionInput = document.getElementById('eventDescription');
const eventList = document.getElementById('eventList');

let editingEventIndex = null; // Track the event being edited

// Load events from localStorage
function loadEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    eventList.innerHTML = '';
    events.forEach((event, index) => {
        const li = document.createElement('li');
        li.dataset.index = index;
        li.innerHTML = `
            <strong>${event.name}</strong><br>
            <span>${event.date}</span><br>
            <span>${event.description}</span><br>
            <button class="edit" onclick="editEvent(${index})">Edit</button>
            <button onclick="deleteEvent(${index})">Delete</button>
        `;
        eventList.appendChild(li);
    });
}

// Save events to localStorage
function saveEvent(event) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    if (editingEventIndex !== null) {
        // Update existing event
        events[editingEventIndex] = event;
    } else {
        // Add new event
        events.push(event);
    }
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

    // Reset form and exit editing mode
    eventForm.reset();
    editingEventIndex = null;

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

// Edit event - populate the form with current event details
function editEvent(index) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const event = events[index];

    // Populate the form with event data
    eventNameInput.value = event.name;
    eventDateInput.value = event.date;
    eventDescriptionInput.value = event.description;

    // Set the editing index to track which event we are editing
    editingEventIndex = index;

    // Change the button text to "Update Event"
    const submitButton = eventForm.querySelector('button');
    submitButton.textContent = 'Update Event';
}

// Load events when the page is ready
document.addEventListener('DOMContentLoaded', loadEvents);
