export async function getUserInfo() {
  const response = await fetch(`http://localhost:3000/api/chat/get_user_info`);

  if (response.ok) {
      const data = await response.json();
      console.log('Fetched user info:', data);
      return data;
  } else {
      console.error('test. js Error fetching user Info:', response.statusText);
  }
}

export async function sendTest(test) {
  const response = await fetch('http://localhost:3000/api/test/sendTest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(test),
  });

  if (response.ok) {
      const data = await response.json();
      console.log('Test sent successfully:', data);
  } else {
      console.error('Error sending test:', response.statusText);
  }
}

export async function getTest() {
  const response = await fetch('http://localhost:3000/api/test/getTest');

  if (response.ok) {
      const tests = await response.json();
      console.log('Fetched tests:', tests);
  } else {
      console.error('Error fetching messages:', response.statusText);
  }
}

export async function getProjectProgress(startDate, endDate) {
    const response = await fetch(`http://localhost:3000/api/analytics/all_projects_progress?start_date=${startDate}&end_date=${endDate}`);
  
    if (response.ok) {
        const projectProgress = await response.json();
        console.log('Fetched project progress:', projectProgress);
        return projectProgress;
    } else {
        console.error('Error fetching project progress:', response.statusText);
    }
  }

  export async function getWorkLoadDistribution(startDate, endDate) {
    const response = await fetch(`http://localhost:3000/api/analytics/all_workload_distribution?start_date=${startDate}&end_date=${endDate}`);
  
    if (response.ok) {
        const workload = await response.json();
        console.log('Fetched workload:', workload);
        return workload;
    } else {
        console.error('Error fetching project progress:', response.statusText);
    }
  }

  export async function getAllTeamOnTimeCompletionRate(startDate, endDate) {
    const response = await fetch(
      `http://localhost:3000/api/analytics/all_on_time_completion_rate?start_date=${startDate}&end_date=${endDate}`
    );
  
    if (response.ok) {
      const onTimeCompletionRate = await response.json();
      console.log('Fetched On-Time Completion Rate:', onTimeCompletionRate);
      return onTimeCompletionRate;
    } else {
      console.error('Error fetching On-Time Completion Rate:', response.statusText);
    }
  }

  export async function getTeamsTaskCompletionTime(startDate, endDate) {
    const response = await fetch(
      `http://localhost:3000/api/analytics/all_teams_task_completion_time?start_date=${startDate}&end_date=${endDate}`
    );
  
    if (response.ok) {
      const taskCompletionTime = await response.json();
      console.log('Fetched task Completion time:', taskCompletionTime);
      return taskCompletionTime;
    } else {
      console.error('Error fetching On-Time Completion Rate:', response.statusText);
    }
  }

  export async function getTeamsOverdueTasks(startDate, endDate) {
    const response = await fetch(
      `http://localhost:3000/api/analytics/teams_overdue_tasks?start_date=${startDate}&end_date=${endDate}`
    );
  
    if (response.ok) {
      const teamsOverdueTasks = await response.json();
      console.log('Fetched overdue tasks:', teamsOverdueTasks);
      return teamsOverdueTasks;
    } else {
      console.error('Error fetching On-Time Completion Rate:', response.statusText);
    }
  }
