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
  });