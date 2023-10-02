import { getAllCategories} from './categories_module';


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const categories = await getAllCategories();
      return res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({
        error: 'Unable to fetch categories'
      });
    }
  } else {
    res.status(405).json({
      error: 'Method not allowed'
    });
  }
}