// pages/api/task/get/[id].js

import { DELETE } from "@/utils/database_module";

export default async function handler(req, res) {
  const {id} = req.query;
    const conditions = [{column: 'id',  operator: '=', value: id},];
    try {
      const tasks = await DELETE('tasks', conditions);
      return res.status(200).json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({
        error: 'Unable to delete tasks'
      });
    }
  
}