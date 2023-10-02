import { login } from './user_module';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const loginResult = await login(email, password);

      if (loginResult.success) {
       
        return res.status(200).json({ user: loginResult.user });
      } else {
      
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ error: 'Unable to log in' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
