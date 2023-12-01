// import {PrismaClient} from '@prisma/client';
// import {NextResponse} from 'next/server';

// const prisma = new PrismaClient ();

// export async function GET (req, {params}) {
//   try {
//     const {id} = params;

//     const post = await prisma.post.findUnique ({
//       where: {
//         id,
//       },
//     });

//     if (!post) {
//       return NextResponse.json (
//         {message: 'Post not found.', error},
//         {status: 404}
//       );
//     }

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

// export async function PUT (req, {params}) {
//   try {
//     const { title, content, desc, readingDuration, categories, storyImg } = await req.json();

//     const {id} = params;

//     const slugUrl = slugify(title, { lower: true, remove: /[*+~.()'"!:@]/g });
    
//     const updatedPost = await prisma.post.update ({
//       where: {
//         id,
//       },
//       data: {
//         title: title.toLowerCase (),
//         content,
//         desc,
//         slug: slugUrl,
//         readingDuration,
//         categories,
//         storyImg,
//       },
//     });

//     if (!updatedPost) {
//       return NextResponse.json (
//         {message: 'Post not found.', error},
//         {status: 404}
//       );
//     }

//     return NextResponse.json (
//       {message: 'Post updated successfully', updatedPost},
//       {status: 200}
//     );
//   } catch (error) {
//     return NextResponse.json (
//       {message: 'Error updating post', error},
//       {status: 500}
//     );
//   }
// }

// export async function DELETE (req, {params}) {
//   try {
//     const {id} = params;

//     await prisma.post.delete ({
//       where: {
//         id,
//       },
//     });

//     return NextResponse.json (
//       {message: 'Post deleted successfully.'},
//       {status: 200}
//     );
//   } catch (error) {
//     return NextResponse.json (
//       {message: 'Error deleting data', error},
//       {status: 500}
//     );
//   }
// }
