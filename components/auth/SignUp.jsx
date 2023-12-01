"use client";

import { Button, Checkbox, Input } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 400) {
        alert("User with this email already exists");
        return;
      }

      if (res.ok) {
        router.push("/login");
        alert("Registered successful");
      } else {
        throw new Error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Create and account
            </h1>
            <div className="flex items-center gap-3">
              <Button
                size="lg"
                className="flex w-full items-center bg-[#E0E7FF] text-base"
              >
                <FcGoogle className="text-3xl" />
                <p>Continue with google</p>
              </Button>
              {/* <Button onClick={() => signIn("twitter")} size="lg" title="Continue with twitter">
                <FaTwitter className="text-3xl text-sky-500" />
              </Button> */}
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              {/* <div>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Your name is required",
                    minLength: {
                      value: 3,
                      message: "Name should be at least 3 characters long",
                    },
                    // maxLength: {
                    //   value: 20,
                    //   message: "Name should not exceed 20 characters",
                    // },
                  }}
                  render={({ field }) => (
                    <div>
                      <Input
                        {...field}
                        label="Your first & last name"
                        labelPlacement="outside"
                        variant="bordered"
                        type="text"
                        placeholder="Your first & last name"
                        className="max-w-full"
                        classNames={{
                          inputWrapper: "py-[25px]",
                          input: "py-[25px]",
                        }}
                      />
                    </div>
                  )}
                />
                {errors.name && (
                  <div className="mt-2 text-red-500">{errors.name.message}</div>
                )}
              </div> */}
              <div>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      variant="bordered"
                      type="email"
                      placeholder="Enter your email"
                      className="max-w-full"
                      classNames={{
                        inputWrapper: "py-[25px]",
                        input: "py-[25px]",
                      }}
                    />
                  )}
                />
                {errors.email && (
                  <div className="mt-2 text-red-500">
                    {errors.email.message}
                  </div>
                )}
              </div>
              <div>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#])[A-Za-z\d@$!#]{8,}$/,
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      variant="bordered"
                      placeholder="Enter your password"
                      type={isVisible ? "text" : "password"}
                      className="max-w-full"
                      classNames={{
                        inputWrapper: "py-[25px]",
                        input: "py-[25px]",
                      }}
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <FaEye className="pointer-events-none text-2xl text-default-400" />
                          ) : (
                            <FaEyeSlash className="pointer-events-none text-2xl text-default-400" />
                          )}
                        </button>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <div className="mt-2 text-red-500">
                    {errors.password.type === "required" ? (
                      "Password is required"
                    ) : (
                      <ul className="list-disc pl-8">
                        <li>
                          Your password must be at least 8 characters long.
                        </li>
                        <li>
                          It must contain a mix of uppercase and lowercase
                          letters.
                        </li>
                        <li>
                          It should include at least one special character
                          (e.g., !,@, #, $).
                        </li>
                        <li>You must also use at least one number (0-9).</li>
                      </ul>
                    )}
                  </div>
                )}
              </div>
              <div>
                <Checkbox size="md" defaultSelected>
                  I accept the
                  <Link
                    className="ml-2 font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href=""
                  >
                    Terms and Conditions
                  </Link>
                </Checkbox>
              </div>
              <Button
                size="lg"
                type="submit"
                className="w-full rounded-lg bg-primary-600 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?
                <Link
                  href="/login"
                  className="ml-2 font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
