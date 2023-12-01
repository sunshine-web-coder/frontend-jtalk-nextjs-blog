import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})

export async function POST (req) {
  try {
    const {
      title,
      desc,
      slug,
      readingDuration,
      categories,
      storyImg,
      content,
    } = await req.json ();

    // if (!email || !password) {
    //   return NextResponse.json (
    //     {message: 'All fields are required'},
    //     {status: 422}
    //   );
    // }

    // Check if the user with the given email already exists
    // const userExists = await prisma.user.findUnique ({
    //   where: {email: email.toLowerCase ()},
    // });

    // if (userExists) {
    //   return NextResponse.json (
    //     {message: 'User already exists with this email'},
    //     {status: 400}
    //   );
    // }

    const post = await prisma.post.create ({
      data: {
        title,
        desc,
        slug,
        readingDuration,
        categories,
        storyImg,
        content,
      },
    });

    return NextResponse.json (
      {message: 'Posts created successfully', post},
      {status: 200}
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating post', error: error.message || error },
      { status: 500 }
    );
  }
}

// export async function GET () {
//   try {
//     const post = await prisma.post.findMany ();
//     return NextResponse.json (
//       {message: 'Post fetching successfully.', post},
//       {status: 200}
//     );
//   } catch (error) {
//     return NextResponse.json (
//       {message: 'Error fetching data', error},
//       {status: 500}
//     );
//   }
// }
