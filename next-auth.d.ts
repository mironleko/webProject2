// next-auth.d.ts or types/next-auth.d.ts

import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Extending the built-in session/user types to include the properties you're expecting
   * in your application, such as the `role` field.
   */
  interface User {
    role: string;
  }

  // If you also need to add the role to the JWT for session management
  interface JWT {
    role?: string;
  }
  
  // If you also need to add the role to the session
  interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }
}
