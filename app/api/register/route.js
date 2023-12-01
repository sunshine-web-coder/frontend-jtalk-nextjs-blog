import bcrypt from 'bcrypt';
import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient ();

export async function POST (req) {
  try {
    const {name, email, password} = await req.json ();

    if (!email || !password) {
      return NextResponse.json (
        {message: 'All fields are required'},
        {status: 422}
      );
    }

    // Check if the user with the given email already exists
    const userExists = await prisma.user.findUnique ({
      where: {email: email.toLowerCase ()},
    });

    if (userExists) {
      return NextResponse.json (
        {message: 'User already exists with this email'},
        {status: 400}
      );
    }

    const hashedPassword = await bcrypt.hash (password, 10);
    
    const user = await prisma.user.create ({
      data: {
        name,
        email: email.toLowerCase (),
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return NextResponse.json (
      {message: 'Account created successfully', user},
      {status: 200}
    );
  } catch (error) {
    return NextResponse.json (
      {message: 'Error creating account', error},
      {status: 500}
    );
  }
}
