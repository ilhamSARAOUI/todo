// pages/api/task/getall/[user_id].js

import { createDatabaseConnection, getAllTasks } from '../task_module';

export default async function handler(req, res) {
  const { user_id } = req.query;

  if (!user_id) {
    res.status(400).json({ error: 'Missing user_id parameter' });
    return;
  }

  if (req.method === 'GET') {
    try {

      const tasks = await getAllTasks(user_id);

     return res.status(200).json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Unable to fetch tasks' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
