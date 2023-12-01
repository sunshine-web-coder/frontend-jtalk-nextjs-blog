"use client";

import { Button, Checkbox, Input } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import UserApiService from "@/utils/UserApiService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "@/redux/authReducer";

export default function LogIn() {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async data => {
    setIsLoading(true);
    try {
      const response = await UserApiService.login(data);

      if (response.status === 401) {
        toast.error("Invalid credentials")
        return
      }

      const { token, user } = response
      dispatch(setToken(token));
      dispatch(setUser(user));

      setIsLoading(false);
      console.log(response);
      toast.success("You've logged in successfully")
      router.push("/dashboard")
    } catch (error) {
      console.log('apiError', { message: error.message });
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Login to your account
            </h1>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => signIn("google")}
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
                      label="Email Address"
                      type="email"
                      variant="bordered"
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
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Password"
                      type={isVisible ? "text" : "password"}
                      variant="bordered"
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
                    {errors.password.message}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Checkbox size="md" defaultSelected>
                    Remember me
                  </Checkbox>
                </div>
                <Link href="" className="text-[#005AC2] hover:underline">
                  Forgot password?
                </Link>
              </div>
              {isLoading ? (
                <Button isLoading
                  size="lg"
                  className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Please wait...
                </Button>
              ) : (
                <Button
                  size="lg"
                  type="submit"
                  className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Log in
                </Button>
              )}

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                <Link
                  href="/signup"
                  className="ml-2 font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
