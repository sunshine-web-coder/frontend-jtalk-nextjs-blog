"use client";

import { Button, Input, SelectItem, Select } from "@nextui-org/react";
import React, { useMemo, useState } from "react";
import { HiMiniPhoto } from "react-icons/hi2";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import { modules } from "./EditorTool";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import PostApiService from "@/utils/PostApiService";
import { useSelector } from "react-redux";
'News', 'Technology', 'Programming', 'Sports', 'Entertainment', 'Travel', 'Health', 'Science'
export const animals = [
  {
    label: "News",
    value: "News",
  },
  {
    label: "Technology",
    value: "Technology",
  },
  {
    label: "Programming",
    value: "Programming",
  },
  { label: "Sports", value: "Sports"},
  { label: "Entertainment", value: "Entertainment"},
  {
    label: "Travel",
    value: "Travel",
  },
  {
    label: "Health",
    value: "Health",
  },
  {
    label: "Science",
    value: "Science",
  },
];

export default function WriteContentForm() {
  const token = useSelector(state => state.token);

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [],
  );
  const [value, setValue] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      readingDuration: "",
      categories: [], // Array for multiple categories
      storyImg: "", // For image URL or file upload
      content: "", // For the rich text editor content
    },
  });

  const onSubmit = async (data) => {
    try {
      // Call createPost from PostApiService
      const response = await PostApiService.createPost(data, token)

      // Handle the response or update the UI as needed
      console.log(response);
      alert('Post created successfully');
    } catch (error) {
      // Handle errors
      console.error(error);
      alert('Error creating post');
    }
  };

  return (
    <div className="max-w-[1250px] mx-auto relative p-4">
      <div className="">
        <h3 className="text-xl font-semibold">Create Story</h3>
      </div>
      <form className="mt-16" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          <div>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <Input
                  label="Story Title"
                  labelPlacement="outside"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Story Title"
                  className="w-full"
                  classNames={{
                    inputWrapper: "h-[50px]",
                    input: "h-[50px] text-base",
                  }}
                  variant="bordered"
                  {...field}
                />
              )}
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <Input
                  label="Story Description"
                  labelPlacement="outside"
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Story Description"
                  className="w-full"
                  classNames={{
                    inputWrapper: "h-[50px]",
                    input: "h-[50px] text-base",
                  }}
                  variant="bordered"
                  {...field}
                />
              )}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div>
            <Controller
              name="readingDuration"
              control={control}
              rules={{ required: "Reading Duration is required" }}
              render={({ field }) => (
                <Input
                  label="Reading Duration"
                  labelPlacement="outside"
                  type="text"
                  id="readingDuration"
                  name="readingDuration"
                  placeholder="Reading Duration"
                  className="w-full"
                  classNames={{
                    inputWrapper: "h-[50px]",
                    input: "h-[50px] text-base",
                  }}
                  variant="bordered"
                  {...field}
                />
              )}
            />
            {errors.readingDuration && (
              <p className="text-red-500">{errors.readingDuration.message}</p>
            )}
          </div>

          <div>
            <div className="flex rounded-2xl bg-gradient-to-tr from-pink-500 to-yellow-500 p-8 text-white shadow-lg">
              <div className="flex w-full flex-col items-center gap-3">
                <label
                  htmlFor="storyImg"
                  className="flex h-10 w-full cursor-pointer items-center justify-center rounded-lg border"
                >
                  <div className="flex items-center justify-center gap-2 text-white">
                    <HiMiniPhoto className="text-xl " />
                    <p className="text-sm">Choose a photo to upload</p>
                  </div>
                  <input id="storyImg" type="file" className="hidden" />
                </label>
                <div className="flex w-full items-center">
                  <hr className="flex-grow border border-gray-300" />
                  <span className="px-3 text-white">or</span>
                  <hr className="flex-grow border border-gray-300" />
                </div>
                <Controller
                  name="storyImg"
                  control={control}
                  rules={{
                    validate: (value) => {
                      if (
                        value.startsWith("http") ||
                        value.startsWith("https")
                      ) {
                        return true;
                      }
                      return "*Please enter a valid image URL";
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        placeholder="Paste image URL"
                        type="url"
                        id="storyImg"
                        name="storyImg"
                        className="w-full"
                        {...field}
                      />
                      {fieldState?.error && (
                        <p className="text-white">
                          {fieldState?.error?.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              *Include an image for your story cover
            </p>
          </div>

          <div>
            <Select
              {...register("category", {
                required: "Story category is required",
              })}
              label="Story Category"
              labelPlacement="outside"
              placeholder="Story Category"
              id="category"
              name="category"
              // selectionMode="multiple"
              className="w-full"
              classNames={{
                trigger: "h-[50px] text-base",
                innerWrapper: "h-[50px] text-base",
              }}
              variant="bordered"
            >
              {animals.map((animal) => (
                <SelectItem key={animal.value} value={animal.value}>
                  {animal.label}
                </SelectItem>
              ))}
            </Select>
            {/* <p className="mt-1 text-xs text-gray-500">
              *You can choose to select multiple categories for your story.
            </p> */}
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
          </div>
        </div>
        <div className="relative mt-10">
          <div className="w-full">
            <Controller
              name="content"
              control={control}
              rules={{ required: "Content is required" }}
              render={({ field }) => (
                <ReactQuill
                  className="w-full border"
                  theme="snow"
                  modules={modules}
                  onChange={(content) => {
                    setValue(content);
                    field.onChange(content);
                  }}
                  value={value}
                  placeholder="Tell your story..."
                />
              )}
            />
            {errors.content && (
              <p className="text-red-500">{errors.content.message}</p>
            )}
          </div>
        </div>
        <div className="mt-10 flex items-center justify-end">
          <Button
            type="submit"
            color="primary"
            className="absolute right-4 top-[10px]"
          >
            Publish
          </Button>
          <Button type="submit" color="primary" className="">
            Publish
          </Button>
        </div>
      </form>
    </div>
  );
}
