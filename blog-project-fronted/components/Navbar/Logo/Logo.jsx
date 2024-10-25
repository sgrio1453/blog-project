import React from 'react'
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
            <div className="w-24 h-16 flex items-center justify-center m-auto py-4">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={96}
                height={48}
                className="object-contain"
              />
          </div>
        </Link>
  )
}

export default Logo