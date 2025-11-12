document.addEventListener('DOMContentLoaded', () => {
    // --- Event Data (managed in localStorage) ---
    let events = JSON.parse(localStorage.getItem('events')) || [
        {
            date: 'SEP 15, 2024',
            title: 'Annual Sports Day',
            description: 'A day of fun, competition, and teamwork.',
            imageUrl: 'logo.jpg'
        },
        {
            date: 'OCT 20, 2024',
            title: 'Parent-Teacher Conference',
            description: 'Discuss student progress and collaborate for success.',
            imageUrl: 'logo.jpg'
        },
        {
            date: 'NOV 22, 2024',
            title: 'Annual Science Fair',
            description: 'Explore amazing projects by our talented students.',
            imageUrl: 'logo.jpg'
        }
    ];

    function saveEvents() {
        localStorage.setItem('events', JSON.stringify(events));
    }

    // --- Function to render events in the admin panel ---
    function renderAdminEvents() {
        const eventsListContainer = document.querySelector('#events-list');
        if (eventsListContainer) {
            eventsListContainer.innerHTML = ''; // Clear static content
            if (events.length === 0) {
                eventsListContainer.innerHTML = '<p class="text-center text-slate-500">No events found.</p>';
            }
            else {
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
        }
    }

    window.deleteEvent = function(index) {
        events.splice(index, 1);
        saveEvents();
        renderAdminEvents();
        updateDashboard();
    }

    window.editEvent = function(index) {
        const event = events[index];
        const eventElement = document.querySelector(`#events-list > div:nth-child(${index + 1})`);

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

    window.saveEdit = function(index) {
        const newTitle = document.getElementById(`edit-title-${index}`).value;
        const newDate = document.getElementById(`edit-date-${index}`).value;
        const newDescription = document.getElementById(`edit-description-${index}`).value;

        if (newTitle && newDate && newDescription) {
            events[index] = {
                ...events[index],
                title: newTitle,
                date: newDate,
                description: newDescription,
            };
            saveEvents();
            renderAdminEvents();
        }
    }

    // --- Function to update dashboard stats ---
    function updateDashboard() {
        const totalEventsElement = document.getElementById('total-events');
        if (totalEventsElement) {
            totalEventsElement.textContent = events.length;
        }
    }

    // --- Event Listeners ---
    const addEventForm = document.getElementById('add-event-form');
    if (addEventForm) {
        addEventForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const titleInput = document.getElementById('event-title');
            const dateInput = document.getElementById('event-date');
            const descriptionInput = document.getElementById('event-description');
            const imageInput = document.getElementById('event-image');

            const title = titleInput.value.trim();
            const date = dateInput.value.trim();
            const description = descriptionInput.value.trim();
            const imageFile = imageInput.files[0];

            if (title && date && description) {
                if (imageFile) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        events.push({
                            title,
                            date,
                            description,
                            imageUrl: e.target.result
                        });
                        saveEvents();
                        renderAdminEvents();
                        updateDashboard();
                        addEventForm.reset();
                        alert('Event added successfully!');
                    };
                    reader.readAsDataURL(imageFile);
                } else {
                    events.push({
                        title,
                        date,
                        description,
                        imageUrl: 'logo.jpg'
                    });
                    saveEvents();
                    renderAdminEvents();
                    updateDashboard();
                    addEventForm.reset();
                    alert('Event added successfully!');
                }
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // --- Initial Render ---
    renderAdminEvents();
    updateDashboard();
});