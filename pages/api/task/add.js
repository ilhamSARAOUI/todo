import {  addTask } from './task_module';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const task = req.body; 
      const addedTask = await addTask(task); 
      res.status(200).json(addedTask); 
    } catch (error) {
      console.error('Error adding task:', error);
      res.status(500).json({ error: 'Unable to add task' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
