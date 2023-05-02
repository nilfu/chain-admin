import NextAuth, { NextAuthOptions } from 'next-auth';
import prisma from '@/libs/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // 登录按钮显示 (e.g. "Sign in with Credentials")
      name: 'Credentials',
      // credentials 用于配置登录页面的表单
      credentials: {
        email: {
          label: '邮箱',
          type: 'text',
          placeholder: '请输入邮箱',
        },
        password: {
          label: '密码',
          type: 'password',
          placeholder: '请输入密码',
        },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        // TODO
        // const maybeUser= await prisma.user.findFirst({where:{
        //   email: credentials.email,
        //  }})

        // 根据 credentials 我们查询数据库中的信息
        const user = {
          id: '1',
          name: 'xiaoma',
          email: 'xiaoma@example.com',
        };

        if (user) {
          // 返回的对象将保存才JWT 的用户属性中
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: 'test',
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token, user }) => {
      if (session?.user && token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
