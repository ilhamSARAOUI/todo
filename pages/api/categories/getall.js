import { SELECT} from '@/utils/database_module';


export default async function handler(req, res) {
  

  const columnsToSelect = ['*'];
  const conditions = [{
  
  }];
    try {
      const categories = await SELECT(`categories`, columnsToSelect, null);
      return res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({
        error: 'Unable to fetch categories'
      });
    }

}