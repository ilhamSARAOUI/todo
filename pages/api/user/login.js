
import { SELECT} from '@/utils/database_module';
const CryptoJS = require("crypto-js");


export default async function handler(req, res) {
  
  const { email, password } = req.body;
  const columnsToSelect = ['*'];
  const conditions = [{
    column: ' email',
    operator: '=',
    value: email
  }];
  try {
      const users = await SELECT(`users`, columnsToSelect, conditions);
      if (users.length === 1) {
        const user = users[0];
        const hashedPassword = CryptoJS.SHA256(password).toString();
  
        if (user.password === hashedPassword) {
          return res.status(200).json({ user: user });
        }
      }
     
      return res.status(401).json({ error: 'invalid credentilas' });
    } catch (error) {
      console.error('Error logging in user:', error);
      return { error: 'An error occurred while logging in' };
    }

}