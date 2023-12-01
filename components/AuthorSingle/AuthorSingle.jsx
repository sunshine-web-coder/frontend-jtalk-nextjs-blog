"use client"

import { Button, User } from '@nextui-org/react';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { useSelector } from 'react-redux';

export default function AuthorSingle({ user }) {
    const isAuthenticated = useSelector(state => state.token !== null);
    const token = useSelector(state => state.token);
    const currentUser = useSelector(state => state.user);
    console.log(currentUser);
    // const pathname = usePathname()

    // Determine if the current user is viewing their own profile
    // const isCurrentUser = currentUser.slug && pathname === currentUser.slug;
    
    // if (isCurrentUser) {
    //     console.log(true);
    // } else {
    //     console.log(false);
    // }

    return (
        <div className='mx-auto max-w-[1100px] p-4'>
            <div className="p-5 border rounded-xl pb-10 text-center text-gray-500">
                <Image
                    width="0"
                    height="0"
                    sizes="100vw"
                    priority={true}
                    className="w-32 h-32 rounded-full mx-auto"
                    src={user?.profileImage}
                    alt="avatar"
                />
                <div className="text-sm mt-5">
                    <p className="font-medium mb-2 leading-none text-gray-900">
                        {user?.name}
                    </p>
                    <p className="font-medium mb-2 leading-none text-gray-900">
                        {user?.email && '@' + user?.email.split('@')[0]}
                    </p>
                    <p>Blogger &amp; Youtuber</p>
                </div>
                <p className="mt-2 max-w-[550px] mx-auto text-sm text-gray-900">
                    Lorem ipsum dolor sit amet, consecte adipisicing elit. Voluptatibus quia
                    Maiores et perferendis eaque.
                </p>
                <div className="flex gap-3 text-xl mt-4 justify-center">
                    <Link href="" className='hover:text-[#0070F0] transition duration-500 ease-in-out'><FaTwitter /></Link>
                    <Link href="" className='hover:text-[#0070F0] transition duration-500 ease-in-out'><FaFacebookF /></Link>
                    <Link href="" className='hover:text-[#0070F0] transition duration-500 ease-in-out'><FaLinkedinIn /></Link>
                </div>
                <div className='mt-5 flex items-center justify-center gap-5'>
                    <p>{user?.followers.length || 0} Followers</p>
                    <p>{user?.following.length || 0} Following</p>
                </div>
                {isAuthenticated &&
                    <div className='mt-5'>
                        {currentUser ? (
                            // If the current user is viewing their own profile, show the link to update profile
                            <Link href="/update-profile">
                                Update Profile
                            </Link>
                        ) : (
                            // If another user is viewing this profile, show the Follow/Unfollow buttons
                            <>
                                <Button color='primary' className='w-[150px] text-base font-semibold'>
                                    Follow
                                </Button>
                                <Button color='primary' className='w-[150px] text-base font-semibold'>
                                    Unfollow
                                </Button>
                            </>
                        )}
                    </div>
                }

            </div>
            <div className="border mt-3">
                <div>
                    Check posts related to this author
                </div>
            </div>
        </div>
    )
}
