import { SELECT} from '@/utils/database_module';


export default async function handler(req, res) {
  
    const {user_id} = req.query;
  const columnsToSelect = ['*'];
  const conditions = [{
    column: 'user_id',
    operator: '=',
    value: user_id
  }];
    try {
      const tasks = await SELECT(`tasks`, columnsToSelect, conditions);
      return res.status(200).json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({
        error: 'Unable to fetch tasks'
      });
    }

}