"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  RadioGroup,
  Radio,
  Input,
} from "@nextui-org/react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { SearchIcon } from "../svgIcons/SearchIcon";

export default function SearchBar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col gap-2">
      <HiMagnifyingGlass onClick={onOpen} className="cursor-pointer text-2xl" />
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        placement="top"
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        classNames={{
          base: "bg-[#F4F4F5] max-w-[700px] py-3",
          closeButton: "text-xl",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="mr-5 pt-2">
                  <Input
                    label="Search blog"
                    labelPlacement="outside"
                    radius="lg"
                    placeholder="search..."
                    classNames={{
                      input: "text-lg h-10",
                      label: "text-2xl",
                      inputWrapper: "h-full",
                    }}
                    startContent={
                      <SearchIcon className="pointer-events-none flex-shrink-0 text-black/50 text-slate-400 dark:text-white/90" />
                    }
                  />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
