import Link from 'next/link'
import React from 'react'

const Menu = () => {
  return (
    <ul className="flex flex-row items-center space-x-4">
          <li className="font-medium text-lg text-gray-500 hover:bg-black hover:text-white py-2 px-4 rounded-lg duration-500">
            <Link href="/">
              <p>Anasayfa</p>
            </Link>
          </li>
          <li className="font-medium text-lg text-gray-500 hover:bg-black hover:text-white py-2 px-4 rounded-lg duration-500">
            <Link href="/">
              <p>Konular</p>
            </Link>
          </li>
          <li className="font-medium text-lg text-gray-500 hover:bg-black hover:text-white py-2 px-4 rounded-lg duration-500">
            <Link href="/">
              <p>Yeni Bloglar</p>
            </Link>
          </li>
          <li className="font-medium text-lg text-gray-500 hover:bg-black hover:text-white py-2 px-4 rounded-lg duration-500">
            <Link href="/">
              <p>İletişim</p>
            </Link>
          </li>
        </ul>
  )
}

export default Menu