document.addEventListener("DOMContentLoaded", () => {
  const eventList = document.getElementById("eventList");

  // Load events from localStorage
  const loadEvents = () => {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    eventList.innerHTML = ""; // Clear existing list

    if (events.length === 0) {
      eventList.innerHTML = "<li>No events added yet.</li>";
      return;
    }

    events.forEach((event, index) => {
      const eventItem = document.createElement("li");
      eventItem.classList.add("event-item");
      eventItem.innerHTML = `
        <div>
          <strong>Date:</strong> ${event.date} <br>
          <strong>Event:</strong> ${event.eventName}
        </div>
        <button class="delete" data-index="${index}">Delete</button>
      `;
      eventList.appendChild(eventItem);
    });
  };

  // Delete an event
  eventList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      const index = e.target.dataset.index;
      const events = JSON.parse(localStorage.getItem("events")) || [];
      events.splice(index, 1); // Remove the event
      localStorage.setItem("events", JSON.stringify(events));
      loadEvents(); // Refresh the list
    }
  });

  loadEvents(); // Initial load
});

