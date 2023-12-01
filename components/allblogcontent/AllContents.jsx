'use client';

import { Button, Chip, Avatar } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

export default function AllContents({ posts }) {

  return (
    <div className="max-w-[1250px] mx-auto border-t p-4">
      <div className="my-4">
        <small className="leading-slug text-2xl font-light md:text-5xl md:leading-[68px]">
          Explore what we’ve <br />
          <span className="font-bold">written lately</span>
        </small>
      </div>
      {posts.length === 0 ? (
        <p className="mx-auto text-center text-gray-500">
          No recent post yet, check back or refresh the page.
        </p>
      ) : (
        <div className="mb-4 mt-8 grid grid-cols-1 gap-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post._id}
              className="w-full overflow-hidden rounded-2xl border border-black/10 pb-5 shadow-sm"
            >
              <div className='block relative h-[250px] w-full transition-transform transform-gpu group-hover:-translate-y-2'>
                <Link
                  href={`/posts/${post.slug}`}
                  className="block absolute z-10 h-[250px] border bg-red-500 w-full"
                >
                  <Image
                    width="0"
                    height="0"
                    sizes="100vw"
                    priority={true}
                    className="absolute bottom-0 left-0 right-0 h-full w-full object-cover"
                    src={post?.storyImg}
                    alt="slide-image"
                  />
                </Link>
                <div className="absolute flex gap-3 bottom-0 z-10 w-full bg-black/50 p-3">
                  <Avatar showFallback src={post.author?.profileImage ? post.author?.profileImage : "https://images.unsplash.com/broken"} />
                  <div className="text-white flex flex-col leading-[18px]">
                    <Link href={`/author/${post.author.slug}`} className="hover:underline font-semibold">{post.author?.name}</Link>
                    <Link href={`/author/${post.author.slug}`} className="hover:underline text-sm">{post.author?.email && '@' + post.author?.email.split('@')[0]}</Link>
                  </div>
                </div>
                <div className="absolute bg-black/10 w-full h-full right-0 left-0 top-0 bottom-0" />
              </div>

              <div className="p-3">
                <div className="flex flex-wrap gap-2">
                  <Chip as={Link} href="">
                    Design
                  </Chip>
                  <Chip as={Link} href="">
                    UI/UX
                  </Chip>
                  <Chip as={Link} href="">
                    Figma
                  </Chip>
                </div>
                <Link
                  className="my-3 line-clamp-2 text-2xl font-semibold hover:underline"
                  href={`/posts/${post.slug}`}
                >
                  {post?.title}
                  
                </Link>
                <p className="line-clamp-3 text-base">
                  {post?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-20 flex items-center justify-center">
        <Button className="w-[200px] h-[50px] text-xl bg-black text-white hover:bg-black/80">
          Load more
        </Button>
      </div>
    </div>
  );
}
