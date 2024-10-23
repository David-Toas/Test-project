<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js"></script>

// Sidebar collapse
document.getElementById("collapse-btn").addEventListener("click", function () {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("collapsed");

  // Update collapse button icon
  const icon = this.querySelector("i");
  if (sidebar.classList.contains("collapsed")) {
    icon.classList.remove("bx-chevron-left");
    icon.classList.add("bx-chevron-right");
  } else {
    icon.classList.remove("bx-chevron-right");
    icon.classList.add("bx-chevron-left");
  }
});
// chart
document
  .getElementById("darkModeToggle")
  .addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });

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
        data: [675, 950, 780, 425, 1000, 580, 875, 350, 875, 675, 950, 600],
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
