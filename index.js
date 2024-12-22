document.addEventListener("DOMContentLoaded", () => {
  const viewEventsButton = document.getElementById("viewEvents");
  const openChatButton = document.getElementById("openChat");

  // Navigate to Events page
  viewEventsButton.addEventListener("click", () => {
    window.location.href = "events.html";
  });

  // Navigate to Chat page
  openChatButton.addEventListener("click", () => {
    window.location.href = "chat.html";
  });

  // Calendar Setup
  const calendar = document.getElementById("calendar");
  const currentMonthYear = document.getElementById("currentMonthYear");
  const prevMonth = document.getElementById("prevMonth");
  const nextMonth = document.getElementById("nextMonth");

  let date = new Date();

  const renderCalendar = () => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // First and last day of the month
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    // Set month and year in header
    currentMonthYear.textContent = `${date.toLocaleString("default", {
      month: "long",
    })} ${year}`;

    // Clear previous calendar content
    calendar.innerHTML = "";

    // Fill blank days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      const blankDay = document.createElement("div");
      blankDay.classList.add("day", "empty");
      calendar.appendChild(blankDay);
    }

    // Fill actual days of the month
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const day = document.createElement("div");
      day.classList.add("day");
      day.textContent = i;

      const eventDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        i
      ).padStart(2, "0")}`;
      day.dataset.date = eventDate;

      // Check if this day has events
      const events = JSON.parse(localStorage.getItem("events")) || [];
      const hasEvent = events.some((event) => event.date === eventDate);
      if (hasEvent) {
        day.classList.add("has-event");
      }

      // Add click event for adding events
      day.addEventListener("click", () => addEvent(eventDate));
      calendar.appendChild(day);
    }
  };

  const addEvent = (date) => {
    const eventName = prompt(`Add an event for ${date}:`);
    if (eventName) {
      const events = JSON.parse(localStorage.getItem("events")) || [];
      events.push({ date, eventName });
      localStorage.setItem("events", JSON.stringify(events));
      alert("Event added successfully!");
      renderCalendar();
    }
  };

  prevMonth.addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
  });

  nextMonth.addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
  });
  
  renderCalendar();

  // Notification System
  const sendNotifications = () => {
    const today = new Date().toISOString().split("T")[0];
    const events = JSON.parse(localStorage.getItem("events")) || [];
    events.forEach((event) => {
      if (event.date === today) {
        new Notification("Event Reminder", {
          body: `You have an event: ${event.eventName}`,
        });
      }
    });
  };

  if ("Notification" in window) {
    if (Notification.permission === "granted") {
      sendNotifications();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          sendNotifications();
        }
      });
    }
  }
});
