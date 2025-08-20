"use client";

import Link from "next/link";
import { FC } from "react";

export const Header:FC = () => {
  return(
    <>
      <header className="header bg-gray-800 font-bold text-white">
        <nav>
          <ul className="flex items-center justify-between p-6">
            <li><Link href="/" className="header-link">Blog</Link></li>
            <li><Link href="/contact/" className="header-link">お問い合わせ</Link></li>
          </ul>
        </nav>
      </header>
    </>
  )
}