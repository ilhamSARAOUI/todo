import { UPDATE } from "@/utils/database_module";

export default async function handler(req, res) {

  const {id} = req.query;

  const conditions = [{column: 'id',  operator: '=', value: id},];

  if (!id) {
    res.status(400).json({
      error: 'Missing id parameter'
    });
    return;
  }
  if (req.method === 'POST') {
    try {
      const user = req.body;
      console.log (req.body);
      await UPDATE('users', req.body, conditions);
      res.status(200).json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({
        error: 'Unable to update user'
      });
    }
  } else {
    res.status(405).json({
      error: 'Method not allowed'
    });
  }
}