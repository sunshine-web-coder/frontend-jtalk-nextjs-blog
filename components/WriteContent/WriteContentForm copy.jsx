"use client";

import { Button } from "@nextui-org/react";
import React, { useMemo, useState } from "react";
import { HiOutlinePhoto, HiPlusSmall } from "react-icons/hi2";
import { RxExternalLink } from "react-icons/rx";
import { MdOndemandVideo } from "react-icons/md";
import "react-quill/dist/quill.bubble.css";
import dynamic from "next/dynamic";

export default function WriteContentForm() {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [],
  );
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="custom_container relative p-4">
      <form className="">
        <div className="flex items-center">
          <div>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              className="w-full p-10 pb-0 text-3xl outline-none placeholder:text-[#8b8b8b]"
            />
          </div>
          <div>
            <input
              type="text"
              id="desc"
              name="desc"
              placeholder="Description"
              className="w-full p-10 pb-0 text-3xl outline-none placeholder:text-[#8b8b8b]"
            />
          </div>
        </div>
        <div>
          <input
            type="text"
            id="desc"
            name="desc"
            placeholder="Description"
            className="w-full p-10 pb-0 text-3xl outline-none placeholder:text-[#8b8b8b]"
          />
        </div>
        <div className="relative flex">
          <div className="relative mt-2 h-[35px] max-w-max rounded-full">
            <button
              type="button"
              className="rounded-full border border-[#8b8b8b] p-1"
              onClick={() => setOpen(!open)}
            >
              <HiPlusSmall className="text-2xl" />
            </button>
            {open && (
              <div className="absolute left-[45px] top-1 z-20 flex items-center gap-2 bg-white">
                <button
                  type="button"
                  title="Add an image"
                  className="rounded-full border border-green-600 p-1 text-green-600"
                >
                  <HiOutlinePhoto />
                </button>
                <button
                  type="button"
                  title="Add image from external link"
                  className="rounded-full border border-green-600 p-1 text-green-600"
                >
                  <RxExternalLink />
                </button>
                <button
                  type="button"
                  title="Add a video"
                  className="rounded-full border border-green-600 p-1 text-green-600"
                >
                  <MdOndemandVideo />
                </button>
              </div>
            )}
          </div>
          <div className="w-full">
            <ReactQuill
              className="w-full"
              theme="bubble"
              value={value}
              onChange={setValue}
              placeholder="Tell your story..."
            />
          </div>
        </div>
        <Button color="primary" className="absolute right-4 top-[10px]">
          Publish
        </Button>
      </form>
    </div>
  );
}
