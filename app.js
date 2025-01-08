// DOM elements
const eventForm = document.getElementById('eventForm');
const eventNameInput = document.getElementById('eventName');
const eventDateInput = document.getElementById('eventDate');
const eventDescriptionInput = document.getElementById('eventDescription');
const eventList = document.getElementById('eventList');

let editingEventIndex = null; // Keep track of the event being edited

// Load events from localStorage
function loadEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    eventList.innerHTML = ''; // Clear the current event list
    events.forEach((event, index) => {
        const li = document.createElement('li');
        li.dataset.index = index;
        li.innerHTML = `
            <strong>${event.name}</strong><br>
            <span>${event.date}</span><br>
            <span>${event.description}</span><br>
            <button class="edit" onclick="editEvent(${index})">Edit</button>
            <button class="delete" onclick="deleteEvent(${index})">Delete</button>
        `;
        eventList.appendChild(li);
    });
}

// Save events to localStorage
function saveEvent(event) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    if (editingEventIndex !== null) {
        events[editingEventIndex] = event; // Update the existing event
    } else {
        events.push(event); // Add a new event
    }
    localStorage.setItem('events', JSON.stringify(events));
}

// Handle form submission
eventForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Create or update the event object
    const event = {
        name: eventNameInput.value,
        date: eventDateInput.value,
        description: eventDescriptionInput.value,
    };

    // Save the event (either create or update)
    saveEvent(event);

    // Reset the form and exit editing mode
    eventForm.reset();
    editingEventIndex = null;

    // Reload the events list
    loadEvents();
});

// Delete event
function deleteEvent(index) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.splice(index, 1); // Remove the event from the array
    localStorage.setItem('events', JSON.stringify(events));

    // Reload the events list
    loadEvents();
}

// Edit event
function editEvent(index) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const event = events[index];

    // Populate the form with the event details for editing
    eventNameInput.value = event.name;
    eventDateInput.value = event.date;
    eventDescriptionInput.value = event.description;

    // Set the editing index
    editingEventIndex = index;

    // Change the submit button text to "Update Event"
    const submitButton = eventForm.querySelector('button');
    submitButton.textContent = 'Update Event';
}

// Load events when the page is ready
document.addEventListener('DOMContentLoaded', loadEvents);
