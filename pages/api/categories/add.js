import { addCategory ,getAllCategories } from "./categories_module";



export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
          const category = req.body; 
          const addedCategory = await addCategory(category); 
          const categories = await getAllCategories();
          return res.status(200).json(categories);
        } catch (error) {
          console.error('Error adding category:', error);
          res.status(500).json({ error: 'Unable to add category' });
        }
      } else {
        res.status(405).json({ error: 'Method not allowed' });
      }
}
