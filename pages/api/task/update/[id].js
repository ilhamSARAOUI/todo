import { createDatabaseConnection, updateTask } from '../task_module';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    res.status(400).json({ error: 'Missing id parameter' });
    return;
  }
  if (req.method === 'POST') {
    try {
      const task = req.body; 
      const updatedTask = await updateTask(id,task); 
      res.status(200).json(updatedTask); 
    } catch (error) {
      console.error('Error adding task:', error);
      res.status(500).json({ error: 'Unable to add task' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
