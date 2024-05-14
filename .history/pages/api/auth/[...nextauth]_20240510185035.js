import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { refreshAuth } from '@/queries/Users';
import fetch from 'node-fetch';

const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Enter your email' },
        password: { label: 'Password', type: 'password', placeholder: 'Enter your password' },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        const res = await fetch('https://crm.web3flow.online/auth/login', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'en-US',
          },
        });

        const user = await res.json();

        if (!res.ok) {
          throw new Error('Wrong username or password');
        }

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: 'SUPER_SECRET_JWT_SECRET',
  },
  callbacks: {
    async jwt({ token, user, account }) {
     // Check if token is expired
     if (token) {
      try {
        // Refresh the access token
        const refreshedToken = await refreshAccessToken(token);

        // Update the token with the new access token
        token.accessToken = refreshedToken.accessToken;
        token.expires = Math.floor(refreshedToken.expires / 1000);
      } catch (error) {
        console.error('Failed to refresh access token:', error);
        // Handle error
        // For example, redirect to login page
      }
    }

      if (account && user) {
        return {
          ...token,
          accessToken: user.data.access_token,
          refreshToken: user.data.refresh_token,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.exp = token.exp;

      return session;
    },
  },
  pages: {
    signIn: '/',
  },
};

async function refreshAccessToken(token) {
  const variables = {
    refresh_token: token.refreshToken,
  }
  // Logic for refreshing the access token
  const response = await fetch('https://crm.web3flow.online/graphql/system', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.refreshToken}`,
    },
    body: JSON.stringify({
      refreshAuth,
      variables
    }),
  });
  const refreshedToken = await response.json();
  return refreshedToken;
}

export default (req, res) => NextAuth(req, res, options);