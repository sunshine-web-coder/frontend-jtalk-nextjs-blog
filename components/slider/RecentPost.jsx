"use client";

import React, { useEffect, useRef, useState } from "react";

import style from "./RecentSlider.module.scss";
import Image from "next/image";
import { recentPostData } from "@/constants";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Chip, Avatar } from "@nextui-org/react";
import Link from "next/link";

export default function RecentPost({ posts }) {
  const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const sliderRef = useRef(null);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        }
      }
    ]
  };
  const goToPrevious = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className="pb-10">
      <hr className="mx-auto max-w-[1250px]" />
      <div className="mx-auto flex max-w-[1250px] items-center justify-between p-4">
        <p>
          Heres our <b>recent post</b>
        </p>
        <div className="flex items-center gap-3">
          <button className="prev-arrow text-xl" onClick={goToPrevious}>
            <BsArrowLeft />
          </button>
          <button className="next-arrow text-xl" onClick={goToNext}>
            <BsArrowRight />
          </button>
        </div>
      </div>
      {sortedPosts.length === 0 ? (
        <p className="mx-auto text-center text-gray-500">
          No recent post yet, check back or refresh the page.
        </p>
      ) : (
        <div className={style.recent_slide}>
          <Slider ref={sliderRef} {...settings}>
            {sortedPosts.slice(0, 5).map((post) => (
              <div key={post._id} className="p-3">
                <div className="border overflow-hidden rounded-2xl border-black/10 pb-5 shadow-sm">
                  <div className='relative h-[250px] w-full transition-transform transform-gpu group-hover:-translate-y-2'>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="block absolute z-10 h-[250px] w-full"
                    >
                      <Image
                        width="0"
                        height="0"
                        sizes="100vw"
                        priority={true}
                        className="bottom-0 left-0 right-0 h-full w-full object-cover"
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
                      <Chip as={Link} href="">Design</Chip>
                      <Chip as={Link} href="">UI/UX</Chip>
                      <Chip as={Link} href="">Figma</Chip>
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
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
}
