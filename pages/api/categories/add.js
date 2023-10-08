import { INSERT } from "@/utils/database_module";


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const category = req.body;
    const categoryData = {
      name: category.name,

    };
    const addedCategory = await INSERT('categories', categoryData);
    return res.status(200).json(addedCategory);
  } else {
    res.status(405).json({
      error: 'Method not allowed'
    });
  }
}


