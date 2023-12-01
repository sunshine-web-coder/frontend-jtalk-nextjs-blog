import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import {PrismaAdapter} from '@auth/prisma-adapter';

const prisma = new PrismaClient ();

export const authOptions = {
  adapter: PrismaAdapter (prisma),
  providers: [
    CredentialsProvider ({
      id: 'credentials',
      name: 'credentials',
      credentials: {},

      async authorize (credentials) {
        const {email, password} = credentials;
        try {
          const user = await prisma.user.findUnique ({
            where: {email: email.toLowerCase ()},
          });

          if (!user) {
            return NextResponse.json (
              {message: 'Email or password incorrect'},
              {status: 400}
            );
          }

          const passwordsMatch = await bcrypt.compare (password, user.password);

          if (!passwordsMatch) {
            return NextResponse.json (
              {message: 'Email or password incorrect'},
              {status: 400}
            );
          }

          return user;
        } catch (error) {
          console.log ('Error: ', error);
        }
      },
    }),
    GoogleProvider ({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({user, account}) {
      if (account.provider === 'credentials') {
        // credentials login
        return true;
      }

      if (account.provider === 'google') {
        let existingUser;

        try {
          existingUser = await prisma.user.findUnique ({
            where: {email: user.email.toLowerCase ()},
          });
        } catch (error) {
          console.log ('Error finding user', error);
          return false;
        }

        if (existingUser) {
          // user found
          return true;
        } else {
          // user not found, create new user
          const newUser = await prisma.user.create ({
            data: {
              email: user.email.toLowerCase (),
            },
          });
          return true;
        }
      }
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  // debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth (authOptions);

export {handler as GET, handler as POST};
