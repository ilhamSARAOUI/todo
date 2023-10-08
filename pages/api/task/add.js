
import { INSERT } from "@/utils/database_module";


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const task = req.body; 

    const addedTask = await INSERT('tasks', task);
    return res.status(200).json(addedTask);
  } else {
    res.status(405).json({
      error: 'Method not allowed'
    });
  }
}
