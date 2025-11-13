document.addEventListener('DOMContentLoaded', async () => {
    let events = [];

    async function fetchEvents() {
        try {
            const response = await fetch('/api/events');
            if (!response.ok) throw new Error('Failed to fetch events.');
            events = await response.json();
            renderAdminEvents();
            updateDashboard();
        } catch (error) {
            console.error('Error fetching events:', error);
            const eventsListContainer = document.querySelector('#events-list');
            if (eventsListContainer) {
                eventsListContainer.innerHTML = '<p class="text-center text-red-500">Failed to load events. Please try again later.</p>';
            }
        }
    }

    async function saveEvents() {
        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(events),
            });
            if (!response.ok) throw new Error('Failed to save events.');
        } catch (error) {
            console.error('Error saving events:', error);
            alert('Failed to save events. Your changes may not be persisted.');
        }
    }

    function renderAdminEvents() {
        const eventsListContainer = document.querySelector('#events-list');
        if (!eventsListContainer) return;

        eventsListContainer.innerHTML = '';
        if (events.length === 0) {
            eventsListContainer.innerHTML = '<p class="text-center text-slate-500">No events found.</p>';
            return;
        }

        events.forEach((event, index) => {
            const eventElement = document.createElement('div');
            eventElement.className = 'p-4 bg-white rounded-lg shadow-md flex justify-between items-center';
            eventElement.innerHTML = `
                <div>
                    <p class="font-bold text-slate-800">${event.title}</p>
                    <p class="text-sm text-slate-500">${event.date}</p>
                </div>
                <div class="space-x-2 flex-shrink-0">
                    <button class="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded hover:bg-blue-200" onclick="editEvent(${index})">Edit</button>
                    <button class="px-3 py-1 text-sm text-red-600 bg-red-100 rounded hover:bg-red-200" onclick="deleteEvent(${index})">Delete</button>
                </div>
            `;
            eventsListContainer.appendChild(eventElement);
        });
    }

    window.deleteEvent = async function(index) {
        events.splice(index, 1);
        await saveEvents();
        renderAdminEvents();
        updateDashboard();
    }

    window.editEvent = function(index) {
        const event = events[index];
        const eventElement = document.querySelector(`#events-list > div:nth-child(${index + 1})`);
        if (!eventElement) return;

        eventElement.innerHTML = `
            <div class="w-full">
                <input type="text" id="edit-title-${index}" value="${event.title}" class="w-full px-3 py-2 mt-1 border rounded-md" />
                <input type="text" id="edit-date-${index}" value="${event.date}" class="w-full px-3 py-2 mt-1 border rounded-md" />
                <textarea id="edit-description-${index}" rows="3" class="w-full px-3 py-2 mt-1 border rounded-md">${event.description}</textarea>
                <div class="flex space-x-2 mt-2">
                    <button class="flex-1 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition" onclick="saveEdit(${index})">Save</button>
                    <button class="flex-1 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 transition" onclick="renderAdminEvents()">Cancel</button>
                </div>
            </div>
        `;
    }

    window.saveEdit = async function(index) {
        const newTitle = document.getElementById(`edit-title-${index}`).value;
        const newDate = document.getElementById(`edit-date-${index}`).value;
        const newDescription = document.getElementById(`edit-description-${index}`).value;

        if (newTitle && newDate && newDescription) {
            events[index] = { ...events[index], title: newTitle, date: newDate, description: newDescription };
            await saveEvents();
            renderAdminEvents();
        }
    }

    function updateDashboard() {
        const totalEventsElement = document.getElementById('total-events');
        if (totalEventsElement) {
            totalEventsElement.textContent = events.length;
        }
    }

    const addEventForm = document.getElementById('add-event-form');
    if (addEventForm) {
        addEventForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = document.getElementById('event-title').value.trim();
            const date = document.getElementById('event-date').value.trim();
            const description = document.getElementById('event-description').value.trim();
            const imageInput = document.getElementById('event-image');
            const imageFile = imageInput.files[0];

            if (!title || !date || !description) {
                alert('Please fill in all fields.');
                return;
            }

            let imageUrl = 'logo.jpg'; // Default image

            if (imageFile) {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    imageUrl = e.target.result;
                    await addNewEvent(title, date, description, imageUrl);
                    addEventForm.reset();
                };
                reader.readAsDataURL(imageFile);
            } else {
                await addNewEvent(title, date, description, imageUrl);
                addEventForm.reset();
            }
        });
    }

    async function addNewEvent(title, date, description, imageUrl) {
        events.push({ title, date, description, imageUrl });
        await saveEvents();
        renderAdminEvents();
        updateDashboard();
        alert('Event added successfully!');
    }

    // Initial Fetch
    fetchEvents();
});