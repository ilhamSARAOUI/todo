import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        // Call your login function from the user_module
        const response = await fetch('http://localhost:3000/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        
        if (response.status === 401) {
          
          throw new Error('Bad credentials');
        }

        const data = await response.json();
 
        if ('error' in data) {
          // Handle other errors here
          throw new Error(data.error);
        }
       

        return {
          id: data.user.id,
          email: data.user.email,
          name: `${data.user.firstName} ${data.user.lastName}`,
          phoneNumber: data.user.phoneNumber
         
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session(session) {
      console.log(session);
      return session;
    },
  },
});
