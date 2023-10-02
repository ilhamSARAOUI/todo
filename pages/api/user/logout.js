// pages/api/auth/logout.js


import { getSession } from 'next-auth/react';
import { useRouter } from 'react';


export default async function handler(req, res) {
    const router = useRouter(); 
  const session = await getSession({ req });

  if (session) {
    await removeUserSessionData(session);

    router.push('/login')
    res.status(200).end();
  } else {
    res.status(401).end();
  }
}
