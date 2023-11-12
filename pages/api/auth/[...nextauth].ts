
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const users = [
  {
    id: '1', 
    name: 'Admin User',
    username:'admin',
    email: 'admin@example.com',
    password: 'adminpassword', 
    role: 'admin',
  },
  {
    id: '2', 
    name: 'Regular User',
    username:'user',
    email: 'user@example.com',
    password: 'userpassword', 
    role: 'user',
  },
];

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        if (credentials) {
          const { username, password } = credentials;
          const user = users.find((user) => user.username === username && user.password === password);
          if (user) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
          }
        }
        return null;
      }
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
});
