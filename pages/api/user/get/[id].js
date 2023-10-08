
import { SELECT} from '@/utils/database_module';


export default async function handler(req, res) {
  
    const { id} = req.query;
  const columnsToSelect = ['*'];
  const conditions = [{
    column: ' id',
    operator: '=',
    value:  id
  }];
    try {
      const user = await SELECT(`users`, columnsToSelect, conditions);
      return res.status(200).json(user[0]);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({
        error: 'Unable to fetch tasks'
      });
    }

}