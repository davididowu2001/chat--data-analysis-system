const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.post('/sendTest', analyticsController.sendTest);
router.get('/all_projects_progress', analyticsController.getAllProjectsProgress);
router.get('/all_workload_distribution', analyticsController.getAllWorkLoadDistribution);
router.get('/all_on_time_completion_rate', analyticsController.getAllTeamOnTimeCompletionRate);
router.get('/all_teams_task_completion_time', analyticsController.getAllTeamsTaskCompletionTime);
router.get('/teams_overdue_tasks', analyticsController.getAllTeamsOverdueTasks);


module.exports = router;