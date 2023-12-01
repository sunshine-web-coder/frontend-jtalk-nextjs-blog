"use client";

import { Avatar, Chip, Textarea, User } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RichTextEditor from "../RichTextEditor/RichTextEditor";

export default function SingleBlog({ post }) {
  return (
    <div className="max-w-[1100px] mx-auto p-4">
      <div className="flex gap-10">
        <div className="w-[60%]">
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
          <h1 className="my-5 max-w-[600px] text-5xl font-bold leading-[58px]">
            {post?.title}
          </h1>
          <p className="text-xl font-medium leading-8">
            {post?.description}
          </p>
          {/* <hr className="mb-3 mt-3" /> */}
          <div className="mt-4 border-t border-b pt-2 pb-2">
            <div className="flex gap-3">
              <div className="flex gap-3">
                <Avatar showFallback src={post.author.profileImage ? post.author.profileImage : "https://images.unsplash.com/broken"} />
                <div className="text-[#151618] flex flex-col leading-[18px]">
                  <Link href="" className="hover:underline font-semibold">{post.author?.name}</Link>
                  <Link href="" className="hover:underline text-sm">{post.author?.email && '@' + post.author?.email.split('@')[0]}</Link>
                </div>
              </div>
              <time className="mb-[3px] self-end justify-self-end text-xs text-[#151618]">
                January 19, 2022 — 3 minutes read
              </time>
            </div>
            {/* <div className="mx-auto mt-20 max-w-[800px] border">
              <div>
                <RichTextEditor />
              </div>
            </div> */}
          </div>
          <div className="mt-4 content">
            <div dangerouslySetInnerHTML={{ __html: post?.content }} />
          </div>
        </div>
        <div className="flex w-[40%] h-[400px] items-end justify-end">
          <div className="h-[400px] max-w-[350px] overflow-hidden rounded-2xl">
            <Image
              width="0"
              height="0"
              sizes="100vw"
              priority={true}
              className="h-full w-full object-cover"
              src={post?.storyImg}
              alt="blog_img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
