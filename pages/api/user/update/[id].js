import { updateUser } from '../user_module';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    res.status(400).json({ error: 'Missing id parameter' });
    return;
  }
  if (req.method === 'POST') {
    try {
      const user = req.body; 
      const updateduser = await updateUser(id,user); 
      res.status(200).json(updateduser); 
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'Unable to add user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
