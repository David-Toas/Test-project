// Sidebar collapse functionality
document.addEventListener('DOMContentLoaded', () => {
    document
      .getElementById("collapse-btn")
      .addEventListener("click", function () {
        const sidebar = document.querySelector(".sidebar");
        sidebar.classList.toggle("collapsed");
  
        // Update collapse button icon
        const icon = this.querySelector("i");
        if (sidebar.classList.contains("collapsed")) {
          icon.classList.remove("bx-chevrons-left");
          icon.classList.add("bx-chevrons-right");
        } else {
          icon.classList.remove("bx-chevrons-right");
          icon.classList.add("bx-chevrons-left");
        }
      });
  
    // Dark mode toggle
    document
      .getElementById("darkModeToggle")
      .addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
      });
  
    // Chart initialization
    const ctx = document.getElementById("eventChart").getContext("2d");
  
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            data: [
              675, 950, 780, 425, 1000, 580, 875, 350, 875, 675, 950, 600,
            ],
            backgroundColor: "rgb(139, 92, 246)",
            borderRadius: 4,
            barThickness: 30,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 1000,
            ticks: {
              stepSize: 200,
              font: {
                family: "system-ui",
              },
            },
            grid: {
              color: "#f0f0f0",
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                family: "system-ui",
              },
            },
          },
        },
      },
    });
  
    // Carousel class definition
    class Carousel {
      constructor(container) {
        this.container = container;
        this.track = container.querySelector(".carousel-track");
        this.slides = [...container.querySelectorAll(".carousel-slide")];
        this.prevButton = container.querySelector(".carousel-button.prev");
        this.nextButton = container.querySelector(".carousel-button.next");
        this.dotsContainer = container.querySelector(".carousel-dots");
  
        this.currentIndex = 0;
        this.slideCount = this.slides.length;
  
        this.init();
      }
  
      init() {
        //To Create dots
        this.slides.forEach((_, index) => {
          const dot = document.createElement("button");
          dot.classList.add("carousel-dot");
          if (index === 0) dot.classList.add("active");
          dot.addEventListener("click", () => this.goToSlide(index));
          this.dotsContainer.appendChild(dot);
        });
  
        // Add event listeners
        this.prevButton.addEventListener("click", () => this.prevSlide());
        this.nextButton.addEventListener("click", () => this.nextSlide());
  
        // Start auto-sliding
        this.startAutoSlide();
  
        // Pause auto-sliding on hover
        this.container.addEventListener("mouseenter", () =>
          this.stopAutoSlide()
        );
        this.container.addEventListener("mouseleave", () =>
          this.startAutoSlide()
        );
      }
  
      updateSlidePosition() {
        this.track.style.transform = `translateX(-${
          this.currentIndex * 100
        }%)`;
  
        // Update dots
        const dots = [...this.dotsContainer.children];
        dots.forEach((dot, index) => {
          dot.classList.toggle("active", index === this.currentIndex);
        });
      }
  
      nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slideCount;
        this.updateSlidePosition();
      }
  
      prevSlide() {
        this.currentIndex =
          (this.currentIndex - 1 + this.slideCount) % this.slideCount;
        this.updateSlidePosition();
      }
  
      goToSlide(index) {
        this.currentIndex = index;
        this.updateSlidePosition();
      }
  
      startAutoSlide() {
        this.stopAutoSlide();
        this.autoSlideInterval = setInterval(() => this.nextSlide(), 5000);
      }
  
      stopAutoSlide() {
        if (this.autoSlideInterval) {
          clearInterval(this.autoSlideInterval);
        }
      }
    }
  
    // Initialize the carousel
    const carouselContainer = document.querySelector(".carousel-container");
    new Carousel(carouselContainer);
  
    // Table functionality
    const events = [
      { name: "Cloud Innovation Summit", date: "2024-10-15", speaker: "Jane Doe", status: "Completed" },
      { name: "Blockchain Revolution Conference", date: "2024-11-05", speaker: "Dr. Peter Smith", status: "In Progress" },
      { name: "AI in Healthcare Symposium", date: "2024-12-01", speaker: "Dr. Aisha Malik", status: "Completed" },
      { name: "Future of Fintech Forum", date: "2024-10-25", speaker: "John Lee", status: "Completed" },
      { name: "Data Analytics in Business", date: "2024-11-12", speaker: "Rachel Moore", status: "Completed" },
      { name: "Sustainable Energy Expo", date: "2024-09-28", speaker: "Prof. Alan Green", status: "Completed" },
      { name: "Web3 Interfaces Workshop", date: "2024-10-10", speaker: "Kevin Adams", status: "In Progress" },
      { name: "Cybersecurity for Startups", date: "2024-11-19", speaker: "Emily Zhang", status: "Completed" },
      { name: "Smart Cities Forum", date: "2024-10-18", speaker: "Dr. Maria Hernandez", status: "In Progress" },
      { name: "Tech Safari Mixer", date: "2024-09-30", speaker: "Guest Panel", status: "In Progress" }
    ];
  
    const tbody = document.querySelector('tbody');
              
    function renderEvents(eventsToRender) {
      tbody.innerHTML = eventsToRender.map(event => `
        <tr>
          <td>${event.name}</td>
          <td>${event.date}</td>
          <td>${event.speaker}</td>
          <td><span class="status-badge status-${event.status.toLowerCase().replace(' ', '-')}">${event.status}</span></td>
        </tr>
      `).join('');
    }
  
    // Initial render
    renderEvents(events);
  
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredEvents = events.filter(event => 
        event.name.toLowerCase().includes(searchTerm) ||
        event.speaker.toLowerCase().includes(searchTerm)
      );
      renderEvents(filteredEvents);
    });
  
    // Sort functionality
    const dateButton = document.querySelector('.filter-button:nth-child(2)');
    let dateAscending = true;
  
    dateButton.addEventListener('click', () => {
      const sortedEvents = [...events].sort((a, b) => {
        if (dateAscending) {
          return new Date(a.date) - new Date(b.date);
        } else {
          return new Date(b.date) - new Date(b.date);
        }
      });
      dateAscending = !dateAscending;
      renderEvents(sortedEvents);
    });



// Modal functionality
const modal = document.getElementById('eventModal');
const closeModal = document.querySelector('.modal-close');
const editBtn = document.getElementById('editEventBtn');
const deleteBtn = document.getElementById('deleteEventBtn');
const completeBtn = document.getElementById('completeEventBtn');

let currentEventId = null;

// Enhanced events data with more details
const eventsData = [
    {
      id: 1,
      name: "Cloud Innovation Summit",
      date: "2024-10-15",
      speaker: "Jane Doe",
      status: "Completed",
      description: "Join us for a comprehensive exploration of cloud computing innovations and their impact on modern business.",
      speakers: ["Jane Doe", "John Smith", "Sarah Johnson"],
      speakerImages: [
        "1.jpeg", 
        "2.jpeg", 
        "3.jpeg"
      ],
      attendees: 300
    },
    {
      id: 2,
      name: "Blockchain Revolution Conference",
      date: "2024-11-05",
      speaker: "Dr. Peter Smith",
      status: "In Progress",
      description: "Discover the latest developments in blockchain technology and its applications across industries.",
      speakers: ["Dr. Peter Smith", "Maria Garcia"],
      speakerImages: [
        "4.jpeg", 
        "1.jpeg"
      ],
      attendees: 250
    },
    {
      id: 3,
      name: "AI in Healthcare Symposium",
      date: "2024-12-01",
      speaker: "Dr. Aisha Malik",
      status: "Completed",
      description: "Explore the transformative role of artificial intelligence in healthcare and medical research.",
      speakers: ["Dr. Aisha Malik", "David White"],
      speakerImages: [
        "2.jpeg", 
        "3.jpeg"
      ],
      attendees: 320
    },
    {
      id: 4,
      name: "Future of Fintech Forum",
      date: "2024-10-25",
      speaker: "John Lee",
      status: "Completed",
      description: "A deep dive into the future of financial technology and innovations in the fintech space.",
      speakers: ["John Lee", "Mark Thompson"],
      speakerImages: [
        "4.jpeg", 
        "1.jpeg"
      ],
      attendees: 280
    },
    {
      id: 5,
      name: "Data Analytics in Business",
      date: "2024-11-12",
      speaker: "Rachel Moore",
      status: "Completed",
      description: "Learn how data analytics is shaping business decision-making and strategy.",
      speakers: ["Rachel Moore", "Karen Miller"],
      speakerImages: [
        "4.jpeg", 
        "3.jpeg"
      ],
      attendees: 310
    },
    {
      id: 6,
      name: "Sustainable Energy Expo",
      date: "2024-09-28",
      speaker: "Prof. Alan Green",
      status: "Completed",
      description: "A showcase of innovative solutions in sustainable energy for a greener future.",
      speakers: ["Prof. Alan Green", "Linda Scott"],
      speakerImages: [
        "2.jpeg", 
        "1.jpeg"
      ],
      attendees: 270
    },
    {
      id: 7,
      name: "Web3 Interfaces Workshop",
      date: "2024-10-10",
      speaker: "Kevin Adams",
      status: "In Progress",
      description: "Hands-on workshop on designing user interfaces for Web3 applications.",
      speakers: ["Kevin Adams", "Lisa Brown"],
      speakerImages: [
        "3.jpeg", 
        "2.jpeg"
      ],
      attendees: 200
    },
    {
      id: 8,
      name: "Cybersecurity for Startups",
      date: "2024-11-19",
      speaker: "Emily Zhang",
      status: "Completed",
      description: "Strategies and best practices for ensuring cybersecurity in startup environments.",
      speakers: ["Emily Zhang", "Jason Lee"],
      speakerImages: [
        "4.jpeg", 
        "2.jpeg"
      ],
      attendees: 230
    },
    {
      id: 9,
      name: "Smart Cities Forum",
      date: "2024-10-18",
      speaker: "Dr. Maria Hernandez",
      status: "In Progress",
      description: "Explore innovations and technologies driving the development of smart cities.",
      speakers: ["Dr. Maria Hernandez", "Chris Wilson"],
      speakerImages: [
        "1.jpeg", 
        "3.jpeg"
      ],
      attendees: 290
    },
    {
      id: 10,
      name: "Tech Safari Mixer",
      date: "2024-09-30",
      speaker: "Guest Panel",
      status: "In Progress",
      description: "A networking event to meet tech leaders and influencers in an informal setting.",
      speakers: ["Guest Panel"],
      speakerImages: [
        "4.jpeg"
      ],
      attendees: 150
    }
  ]
  

function renderEvents(eventsToRender) {
  tbody.innerHTML = eventsToRender.map(event => `
    <tr data-event-id="${event.id}" class="event-row">
      <td>${event.name}</td>
      <td>${event.date}</td>
      <td>${event.speaker}</td>
      <td><span class="status-badge status-${event.status.toLowerCase().replace(' ', '-')}">${event.status}</span></td>
    </tr>
  `).join('');

  // Add click handlers to rows
  document.querySelectorAll('.event-row').forEach(row => {
    row.addEventListener('click', () => showEventDetails(row.dataset.eventId));
  });
}

// function showEventDetails(eventId) {
//   const event = eventsData.find(e => e.id === parseInt(eventId));
//   if (!event) return;

//   currentEventId = eventId;

//   // Update modal content
//   document.getElementById('modalEventName').textContent = event.name;
//   document.getElementById('modalEventDate').textContent = new Date(event.date).toLocaleDateString('en-US', {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });
//   document.getElementById('modalEventDescription').textContent = event.description;
  
//   // Update speakers section
//   const speakersContainer = document.getElementById('modalSpeakers');
//   speakersContainer.innerHTML = event.speakers.map(speaker => `
//     <div class="speaker-avatar">
//       <img src="${event.speakerImages[index]}"  alt="${speaker}" class="rounded-full"/>
//       <span>${speaker}</span>
//     </div>
//   `).join('');
  
//   document.getElementById('modalAttendees').textContent = `${event.attendees} Attendees`;

//   // Show/hide complete button based on status
//   completeBtn.style.display = event.status === 'In Progress' ? 'block' : 'none';

//   // Show modal
//   modal.classList.remove('hidden');
// }

function showEventDetails(eventId) {
    const event = eventsData.find(e => e.id === parseInt(eventId));
    if (!event) return;
  
    currentEventId = eventId;
  
    // Update modal content
    document.getElementById('modalEventName').textContent = event.name;
    document.getElementById('modalEventDate').textContent = new Date(event.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    document.getElementById('modalEventDescription').textContent = event.description;
    
    // Update speakers section with correct image mapping
    const speakersContainer = document.getElementById('modalSpeakers');
    speakersContainer.innerHTML = event.speakers.map((speaker, index) => `
      <div class="speaker-avatar flex items-center gap-1 mb-2">
        <img src="${event.speakerImages[index]}" 
             alt="${speaker}" 
             style="width: 20px; height: 20px;"
             class="rounded-full"
             onerror="this.src='default-avatar.jpg'"
        />
        <span>${speaker}</span>
      </div>
    `).join('');
    
    document.getElementById('modalAttendees').textContent = `${event.attendees} Attendees`;
  
    // Show/hide complete button based on status
    completeBtn.style.display = event.status === 'In Progress' ? 'block' : 'none';
  
    // Show modal
    modal.classList.remove('hidden');
  }

function hideModal() {
  modal.classList.add('hidden');
  currentEventId = null;
}

// Event handlers for modal buttons
closeModal.addEventListener('click', hideModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) hideModal();
});

editBtn.addEventListener('click', () => {
  if (!currentEventId) return;
  // Add your edit functionality here
  console.log('Edit event:', currentEventId);
});

deleteBtn.addEventListener('click', () => {
  if (!currentEventId) return;
  const confirmed = confirm('Are you sure you want to delete this event?');
  if (confirmed) {
    const index = eventsData.findIndex(e => e.id === parseInt(currentEventId));
    if (index !== -1) {
      eventsData.splice(index, 1);
      renderEvents(eventsData);
      hideModal();
    }
  }
});

completeBtn.addEventListener('click', () => {
  if (!currentEventId) return;
  const event = eventsData.find(e => e.id === parseInt(currentEventId));
  if (event && event.status === 'In Progress') {
    event.status = 'Completed';
    renderEvents(eventsData);
    hideModal();
  }
});

// Initial render with the enhanced data
renderEvents(eventsData);




  });



