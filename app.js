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
            <strong class="editable" onclick="startEditing('name', ${index})">${event.name}</strong><br>
            <span class="editable" onclick="startEditing('date', ${index})">${event.date}</span><br>
            <span class="editable" onclick="startEditing('description', ${index})">${event.description}</span><br>
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

// Start inline editing
function startEditing(field, index) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const event = events[index];

    // Get the element that was clicked for editing
    const fieldElement = eventList.querySelector(`li[data-index='${index}'] .editable`);
    
    // Replace it with an editable field
    if (field === 'name') {
        fieldElement.innerHTML = `<input type="text" value="${event.name}" class="editing" onblur="saveInlineEdit('name', ${index})">`;
    } else if (field === 'date') {
        fieldElement.innerHTML = `<input type="date" value="${event.date}" class="editing" onblur="saveInlineEdit('date', ${index})">`;
    } else if (field === 'description') {
        fieldElement.innerHTML = `<textarea class="editing" onblur="saveInlineEdit('description', ${index})">${event.description}</textarea>`;
    }
}

// Save inline edited field
function saveInlineEdit(field, index) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const event = events[index];

    const fieldElement = eventList.querySelector(`li[data-index='${index}'] .editable`);

    if (field === 'name') {
        event.name = fieldElement.querySelector('input').value;
    } else if (field === 'date') {
        event.date = fieldElement.querySelector('input').value;
    } else if (field === 'description') {
        event.description = fieldElement.querySelector('textarea').value;
    }

    // Save updated event to localStorage
    saveEvent(event);

    // Reload events list
    loadEvents();
}

// Load events when the page is ready
document.addEventListener('DOMContentLoaded', loadEvents);
