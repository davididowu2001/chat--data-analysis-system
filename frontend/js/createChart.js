var barColors = [  "#b91d47",  "#00aba9",  "#2b5797",  "#e8c3b9",  "#1e7145",  "#d74327",  "#0078d4",  "#ffed01",  "#fbb900",  "#7fba00",  "#5c2d91",  "#ff6f61",  "#6b5b95",  "#88d8b0"];
//  "#00A0E9",  "#046FB8",  "#60B3E3",  "#0077C2",  "#4AAED4",  "#005C8E"

export function createDoughnutChart(divID, title, xValues, yValues) {
  const chart = new Chart(divID, {
    type: "doughnut",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      // title: {
      //   display: true,
      //   text: title
      // }
    }
  });
  return chart;
}

export function createPieChart(divID, title, xValues, yValues) {
  const chart = new Chart(divID, {
    type: "pie",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      legend: {
        display: false
      }
      // title: {
      //   display: true,
      //   text: title
      // }
    }
  });
  return chart;
}

export function createStackedBarChart(divID, title, xValues, yValues) {
  const chart = new Chart(divID, {
    type: 'bar',
    data: {
        labels: xValues,
        datasets: [
            {
                label: 'Completed',
                data: yValues[0], 
                backgroundColor: barColors[0],
            },
            {
                label: 'In Progress',
                data: yValues[1], 
                backgroundColor: barColors[1],
            },
            {
                label: 'Not Started',
                data: yValues[2], 
                backgroundColor: barColors[2],
            }
        ]
    },
    options: {
        // title: {
        //   display: true,
        //   text: title
        // },
        responsive: true,
        scales: {
            xAxes: [{
              stacked: true
            }],
            yAxes: [{
              stacked: true,
              ticks: {
                stepSize: 1
              }
            }]
          },
    }
  });
  return chart;
}

export function createHorizontalStackedBarChart(divID, title, xValues, yValues) {
  const chart = new Chart(divID, {
    type: 'horizontalBar',
    data: {
      labels: xValues,
      datasets: [
        {
          label: 'On Time',
          data: yValues[0],
          backgroundColor: barColors[4],
        },
        {
          label: 'Late',
          data: yValues[1],
          backgroundColor: barColors[0],
        }
      ]
    },
    options: {
      // title: {
      //   display: true,
      //   text: title
      // },
      responsive: true,
      scales: {
        xAxes: [{
          stacked: true,
          ticks: {
            stepSize: 1
          }
        }],
        yAxes: [{
          stacked: true
        }]
      },
    }
  });
  return chart;
}

export function createBarChart(divID, title, xValues, yValues) {
  const chart = new Chart(divID, {
    type: 'bar',
    data: {
      labels: xValues,
      datasets: [
        {
          label: 'Overdue',
          data: yValues,
          backgroundColor: barColors,
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      // title: {
      //   display: true,
      //   text: title
      // },
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      },
    }
  });
  return chart;

}

// Dummy data:
// var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
// var yValues = [55, 49, 44, 24, 15];