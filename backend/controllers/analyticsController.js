const db = require('../db');  

  exports.sendTest = async (req, res) => {
    try {
    
        const {name} = req.body;
        const [result] = await db.query('INSERT INTO test (test) VALUES (?)', [name]);
        res.status(201).json({ message: 'Message sent successfully', messageId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send message' });
    }
};

exports.getAllProjectsProgress = async (req, res) => {
  try {
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;
    if (!startDate || !endDate) {
      res.status(400).json({ error: 'Start date and end date are required' });
      return;
    }
    const allProjectsProgress = await fetchAllProjectsProgress(startDate, endDate);
    res.status(200).json(allProjectsProgress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch project progress' });
  }
};

async function fetchAllProjectsProgress(start_date, end_date) {
  try {
    const query = `
      SELECT Projects.ProjectID, Projects.TeamID, Projects.Name, Tasks.Status, COUNT(*) as TaskCount
      FROM Tasks
      JOIN Projects ON Tasks.ProjectID = Projects.ProjectID
      WHERE Tasks.StartDate >= ? AND Tasks.Deadline <= ?
      GROUP BY Projects.ProjectID, Projects.TeamID, Projects.Name, Tasks.Status
    `;

    const [rows] = await db.query(query, [start_date, end_date]);
    
    if(rows.length === 0){
      return null;
    }

    const projectProgressMap = {};

    for (const row of rows) {
      const projectId = row.ProjectID;
      const projectName = row.Name;
      const teamId = row.TeamID;

      if (!projectProgressMap[projectId]) {
        projectProgressMap[projectId] = {
          Project_Name: projectName,
          Project_Id: projectId,
          Team_Id: teamId,
          Completed: 0,
          In_Progress: 0,
          Not_Started: 0,
        };
      }

      if (row.Status === 'Completed') {
        projectProgressMap[projectId].Completed += row.TaskCount;
      } else if (row.Status === 'In Progress') {
        projectProgressMap[projectId].In_Progress += row.TaskCount;
      } else {
        projectProgressMap[projectId].Not_Started += row.TaskCount;
      }
    }

    return Object.values(projectProgressMap);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch project progress');
  }
}
  
exports.getAllTeamOnTimeCompletionRate = async (req, res) => {
  try {
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;
    if (!startDate || !endDate) {
      res.status(400).json({ error: 'Start date and end date are required' });
      return;
    }
    const OnTimeCompletionRate = await fetchAllTeamOnTimeCompletionRate(startDate, endDate);
    res.status(200).json(OnTimeCompletionRate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch workload distribution' });
  }
};

async function fetchAllTeamOnTimeCompletionRate(startDate, endDate) {
  try {
    const query = `
      SELECT
        em.EmployeeID,
        em.Name as EmployeeName,
        em.TeamID,
        tm.Name as TeamName,
        COUNT(*) AS TotalTasks,
        SUM(CASE WHEN ta.CompletionDate <= ta.Deadline THEN 1 ELSE 0 END) AS OnTimeTasks
      FROM
        Tasks ta
      JOIN
        Employees em ON ta.UserID = em.EmployeeID
      JOIN
        Teams tm ON em.TeamID = tm.TeamID 
      WHERE
        ta.StartDate >= ? AND ta.Deadline <= ? AND ta.Status = 'Completed'
      GROUP BY
        em.EmployeeID, em.TeamID
    `;

    const [rows] = await db.query(query, [startDate, endDate]);

    if(rows.length === 0){
      return null;
    }

    if (rows.length === 0) {
      throw new Error('No data found for the given date range');
    }

    const onTimeCompletionRates = rows.map(row => {
      const { EmployeeID, EmployeeName, TeamID, TeamName, TotalTasks, OnTimeTasks } = row;

      return {
        employeeID: EmployeeID,
        employeeName: EmployeeName,
        teamID: TeamID,
        teamName: TeamName,
        TotalTasks,
        OnTimeTasks,
      };
    });

    return onTimeCompletionRates;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch On-Time Completion Rate for all team projects');
  }
}


exports.getAllTeamsTaskCompletionTime = async (req, res) => {
  try {
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;
    if (!startDate || !endDate) {
      res.status(400).json({ error: 'Start date and end date are required' });
      return;
    }
    const teamsTaskCompletionTime = await fetchAllTeamsTaskCompletionTime(startDate, endDate);
    res.status(200).json(teamsTaskCompletionTime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch workload distribution' });
  }
};

async function fetchAllTeamsTaskCompletionTime(startDate, endDate) {
  try {
    const query = `
      SELECT
        Employees.EmployeeID,
        Employees.Name as EmployeeName,
        Employees.TeamID,
        tm.Name as TeamName,
        AVG(TIMESTAMPDIFF(HOUR, Tasks.StartDate, Tasks.CompletionDate)) as AverageCompletionTime
      FROM
        Tasks
      JOIN
        Employees ON Tasks.UserID = Employees.EmployeeID
      JOIN
        Teams tm ON Employees.TeamID = tm.TeamID 
      WHERE
        Tasks.StartDate >= ? AND Tasks.Deadline <= ? AND Tasks.Status = 'Completed'
      GROUP BY
        Employees.EmployeeID, Employees.TeamID
    `;

    const [rows] = await db.query(query, [startDate, endDate]);

    if(rows.length === 0){
      return null;
    }

    return rows.map(row => ({
      employeeID: row.EmployeeID,
      employeeName: row.EmployeeName,
      teamID: row.TeamID,
      teamName: row.TeamName,
      averageCompletionTime: row.AverageCompletionTime
    }));
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch Task Completion Time for all teams');
  }
}

exports.getAllTeamsOverdueTasks = async (req, res) => {
  try {
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;
    if (!startDate || !endDate) {
      res.status(400).json({ error: 'Start date and end date are required' });
      return;
    }
    const teamsOverdueTasks = await fetchAllTeamsOverdueTasks(startDate, endDate);
    res.status(200).json(teamsOverdueTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch project progress' });
  }
};

async function fetchAllTeamsOverdueTasks(startDate, endDate) {
  try {
    const overdueTasksQuery = `
      SELECT
        Employees.EmployeeID,
        Employees.Name as EmployeeName,
        Employees.TeamID,
        tm.Name as TeamName,
        COUNT(*) as OverdueTasks
      FROM
        Tasks
      JOIN
        Employees ON Tasks.UserID = Employees.EmployeeID
      JOIN
        Teams tm ON Employees.TeamID = tm.TeamID 
      WHERE
        Tasks.Status != 'Completed'
        AND Tasks.Deadline < CURDATE()
        AND Tasks.StartDate >= ? AND Tasks.Deadline <= ?
      GROUP BY
        Employees.EmployeeID, Employees.TeamID
    `;

    const [rows] = await db.query(overdueTasksQuery, [startDate, endDate]);

    if(rows.length === 0){
      return null;
    }

    return rows.map(row => ({
      employeeID: row.EmployeeID,
      employeeName: row.EmployeeName,
      teamID: row.TeamID,
      teamName: row.TeamName,
      overdueTasks: row.OverdueTasks
    }));
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch overdue tasks count for all teams');
  }
}

exports.getAllWorkLoadDistribution = async (req, res) => {
  try {
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;
    if (!startDate || !endDate) {
      res.status(400).json({ error: 'Start date and end date are required' });
      return;
    }
    const workLoadDistribution = await fetchWorkload(startDate,endDate);
    res.status(200).json(workLoadDistribution);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch workload distribution' });
  }
};

async function fetchWorkload(startDate, endDate) {
  try {
    const query = `
      SELECT
        Employees.EmployeeID,
        Employees.Name as EmployeeName,
        Employees.TeamID,
        tm.Name as TeamName,
        COUNT(*) as TotalTasks,
        SUM(CASE WHEN Tasks.Status = 'Completed' THEN 1 ELSE 0 END) as CompletedTasks,
        SUM(CASE WHEN Tasks.Status = 'In Progress' THEN 1 ELSE 0 END) as InProgressTasks,
        SUM(CASE WHEN Tasks.Status = 'Not Started' THEN 1 ELSE 0 END) as NotStartedTasks
      FROM
        Tasks
      JOIN
        Employees ON Tasks.UserID = Employees.EmployeeID
      JOIN
        Teams tm ON Employees.TeamID = tm.TeamID
      WHERE
        Tasks.StartDate >= ? AND Tasks.Deadline <= ?
      GROUP BY
        Employees.EmployeeID, Employees.TeamID
    `;

    const [rows] = await db.query(query, [startDate, endDate]);

    if(rows.length === 0){
      return null;
    }

    return rows.map(row => ({
      employeeID: row.EmployeeID,
      employeeName: row.EmployeeName,
      teamID: row.TeamID,
      teamName: row.TeamName,
      totalTasks: row.TotalTasks,
      completedTasks: row.CompletedTasks,
      inProgressTasks: row.InProgressTasks,
      notStartedTasks: row.NotStartedTasks
    }));
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch workload data');
  }
}