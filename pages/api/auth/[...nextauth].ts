// pages/api/auth/[...nextauth].ts

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Hardcoded list of users for demonstration purposes
const users = [
  {
    id: '1', // id as a string
    name: 'Admin User',
    username:'admin',
    email: 'admin@example.com',
    password: 'adminpassword', // You should hash passwords in a real application
    role: 'admin',
  },
  {
    id: '2', // id as a string
    name: 'Regular User',
    username:'user',
    email: 'user@example.com',
    password: 'userpassword', // You should hash passwords in a real application
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
      authorize: async (credentials) => { // Added the req parameter
        if (credentials) {
          const { username, password } = credentials;
          // Find user with matching credentials
          const user = users.find((user) => user.username === username && user.password === password);
          if (user) {
            // Return user object without password
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
          }
        }
        // Return null if user is not found
        return null;
      }
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user role from user to the token right after signin
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Add role to the session object
      session.user.role = token.role;
      return session;
    },
  },
  // Add any other NextAuth configuration here
});
