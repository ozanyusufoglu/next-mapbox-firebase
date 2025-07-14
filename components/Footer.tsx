import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RxLinkedinLogo } from "react-icons/rx";
import { RxGithubLogo } from "react-icons/rx";
import { RxEnvelopeClosed } from "react-icons/rx";

export default function Footer() {
  return (
    <div
      className="flex flex-row items-center justify-between
        text-white w-screen bg-red-400 p-16
        dark:bg-slate-800 dark:text-white"
    >
      {/* <div>
        <NavigationItem href="https://github.com/ozanyusufoglu/scrimba-nextjs-workshop">
          <div className="flex flex-row items-center space-x-4">
            <Image
              src="github-mark.svg"
              alt="github logo"
              width={30}
              height={30}
            ></Image>
            <p>Show me to the source code</p>
          </div>
        </NavigationItem>
      </div> */}
      <p>2024</p>
      <div className="flex flex-col gap-y-8">
        <div className="text-right">
          <p>Built by</p>
          <Link
            href="https://github.com/ozanyusufoglu/"
            className="font-bold text-slate-950 dark:text-white"
          >
            Ozan
          </Link>
          <p>with 🐵🧠</p>
        </div>
        <div className="flex flex-row gap-x-4">
          <Link href="https://github.com/ozanyusufoglu/">
            <RxGithubLogo />
          </Link>
          <Link href="#">
            <RxLinkedinLogo />
          </Link>
          <Link href="ozanyusufoglu@protonmail.com">
            <RxEnvelopeClosed />
          </Link>
        </div>
      </div>
    </div>
  );
}
