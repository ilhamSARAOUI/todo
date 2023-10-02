// pages/api/task/get/[id].js

import { getTask } from '../task_module';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    res.status(400).json({ error: 'Missing id parameter' });
    return;
  }

  if (req.method === 'GET') {
    try {

      const tasks = await getTask(id);

     return res.status(200).json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Unable to fetch tasks' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
