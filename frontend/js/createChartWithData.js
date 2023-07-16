import {
    getProjectProgress, getWorkLoadDistribution,
    getAllTeamOnTimeCompletionRate, getTeamsTaskCompletionTime,
    getTeamsOverdueTasks
} from './test.js';
import { createPieChart, createStackedBarChart, createHorizontalStackedBarChart, createBarChart } from './createChart.js';

var startDate = '2020-01-01';
var endDate = '2025-05-05';
var teamDict = {};
let chart1, chart2, chart3, chart4;

const startDateInput = document.getElementById('start_date');
const endDateInput = document.getElementById('end_date');
const teamFilter = document.getElementById('team_filter');
const applyFiltersButton = document.getElementById('apply_filters');

var teamID = 0;

(async function initializeCharts() {
    const projectProgressData = await getProjectProgress(startDate, endDate).then((result) => projectProgress(result));
    const employeeWorkLoadData = await getWorkLoadDistribution(startDate, endDate).then((result) => employeeWorkLoad(result));
    const onTimeCompletionRateData = await getAllTeamOnTimeCompletionRate(startDate, endDate).then((result) => onTimeCompletionRate(result));
    const overdueTasksData = await getTeamsOverdueTasks(startDate, endDate).then((result) => overdueTasks(result));

    // Initialize the charts and store their instances
    chart1 = createStackedBarChart("chartDiv1", "Project Progress", projectProgressData.xValues, projectProgressData.yValues);
    chart2 = createPieChart("chartDiv2", "Employee Workload", employeeWorkLoadData.xValues, employeeWorkLoadData.yValues);
    chart3 = createHorizontalStackedBarChart("chartDiv3", "Employee On Time Completion Rate", onTimeCompletionRateData.xValues, onTimeCompletionRateData.yValues);
    chart4 = createBarChart("chartDiv4", "Employee Overdue Tasks", overdueTasksData.xValues, overdueTasksData.yValues);
})();

// Add a click event listener to the apply button
applyFiltersButton.addEventListener('click', () => {

    if(startDateInput.value != ''){
        startDate = startDateInput.value;
    }
    if(endDateInput.value != ''){
        endDate = endDateInput.value;
    }

    teamID = teamFilter.value;
    updateDashboard(startDate, endDate);
});

// getTeamsTaskCompletionTime(startDate, endDate)

async function updateDashboard(startDate, endDate) {
    const projectProgressData = await getProjectProgress(startDate, endDate).then((result) => projectProgress(result));
    const employeeWorkLoadData = await getWorkLoadDistribution(startDate, endDate).then((result) => employeeWorkLoad(result));
    const onTimeCompletionRateData = await getAllTeamOnTimeCompletionRate(startDate, endDate).then((result) => onTimeCompletionRate(result));
    const overdueTasksData = await getTeamsOverdueTasks(startDate, endDate).then((result) => overdueTasks(result));

    chart1.data.labels = projectProgressData.xValues;
    chart1.data.datasets[0].data = projectProgressData.yValues[0];
    chart1.data.datasets[1].data = projectProgressData.yValues[1];
    chart1.data.datasets[2].data = projectProgressData.yValues[2];
    chart1.update();

    chart2.data.labels = employeeWorkLoadData.xValues;
    chart2.data.datasets[0].data = employeeWorkLoadData.yValues;
    chart2.update();

    chart3.data.labels = onTimeCompletionRateData.xValues;
    chart3.data.datasets[0].data = onTimeCompletionRateData.yValues[0];
    chart3.data.datasets[1].data = onTimeCompletionRateData.yValues[1];
    chart3.update();

    chart4.data.labels = overdueTasksData.xValues;
    chart4.data.datasets[0].data = overdueTasksData.yValues;
    chart4.update();
}

function projectProgress(result) {
    var divID = "chartDiv1";
    var title = "Project Progress";

    if (result == null || teamID == -1) {
        createStackedBarChart(divID, title, [], []);
        return;
    }

    var xValues = new Array();
    var CompletedData = new Array();
    var InProgressData = new Array();
    var NotStartedData = new Array();

    var newArrPos = 0;
    for (let index = 0; index < result.length; index++) {
        if (result[index]["Team_Id"] == teamID || teamID == 0) {
            xValues[newArrPos] = result[index]["Project_Name"];
            CompletedData[newArrPos] = result[index]["Completed"];
            InProgressData[newArrPos] = result[index]["In_Progress"];
            NotStartedData[newArrPos] = result[index]["Not_Started"];
            newArrPos++;
        }
    }
    var yValues = [CompletedData, InProgressData, NotStartedData];

    return{xValues, yValues};
}

function employeeWorkLoad(result) {
    var divID = "chartDiv2";
    var title = "Employee Workload";

    if (result == null || teamID == -1) {
        createPieChart(divID, title, [], []);
        return;
    }

    var xValues = new Array();
    var yValues = new Array();

    var newArrPos = 0;
    for (let index = 0; index < result.length; index++) {
        teamDict[Object.values(result[index])[2]] = Object.values(result[index])[3];
        if (result[index]["teamID"] == teamID || teamID == 0) {
            xValues[newArrPos] = result[index]["employeeName"];
            yValues[newArrPos] = Object.values(result[index])[4];
            newArrPos++;
        }
    }

    if (xValues.length == 0) {
        createPieChart(divID, title, [], []);
        return;
    }

    populateTeamFilter();

    return {xValues, yValues};
}

function onTimeCompletionRate(result) {
    var divID = "chartDiv3";
    var title = "Employee On Time Completion Rate";

    if (result == null || teamID == -1) {
        createHorizontalStackedBarChart(divID, title, [], []);
        return;
    }

    var xValues = new Array();
    var completedTasksData = new Array();
    var completedOnTimeTasksData = new Array();

    var newArrPos = 0;
    for (let index = 0; index < result.length; index++) {
        if (result[index]["teamID"] == teamID || teamID == 0) {
            xValues[newArrPos] = result[index]["employeeName"];
            completedOnTimeTasksData[newArrPos] = Object.values(result[index])[5];
            completedTasksData[newArrPos] = Object.values(result[index])[4] - completedOnTimeTasksData[newArrPos];
            newArrPos++;
        }
    }
    var yValues = [completedTasksData, completedOnTimeTasksData];
    return {xValues, yValues};
}

function overdueTasks(result) {
    var divID = "chartDiv4";
    var title = "Employee Overdue Tasks";

    if (result == null || teamID == -1) {
        createBarChart(divID, title, [], []);
        return;
    }

    var xValues = new Array();
    var yValues = new Array();

    var newArrPos = 0;
    for (let index = 0; index < result.length; index++) {
        if (result[index]["teamID"] == teamID || teamID == 0) {
            xValues[newArrPos] = result[index]["employeeName"];
            yValues[newArrPos] = result[index]["overdueTasks"];
            newArrPos++;
        }
    }
    return {xValues, yValues};
}

async function populateTeamFilter() {
    const teamFilter = document.getElementById('team_filter');
    // console.log(teamDict);
    const optionCount = teamFilter.options.length;

    if (optionCount > 0) {
        return;
    }

    const allTeams = document.createElement('option');
    allTeams.value = 0;
    allTeams.textContent = 'All Teams';
    teamFilter.appendChild(allTeams);
  
    Object.entries(teamDict).forEach(([teamId, teamName]) => {
      const option = document.createElement('option');
      option.value = teamId;
      option.textContent = teamName;
      teamFilter.appendChild(option);
    });

}