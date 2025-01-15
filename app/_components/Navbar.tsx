"use client";

import Link from "next/link";

import {
  Menubar,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
} from "./ui/menubar";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold">
          <Image
            src="/logo.svg"
            alt="logo"
            width={50}
            height={20}
            className="rounded-md "
          />
        </Link>
        <div className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-gray-300">
            Cadastros
          </Link>

          <Link href="/pdf-filter" className="hover:text-gray-300">
            Filtrar
          </Link>

          {/* <Link href="/pedidosxlsx" className="hover:text-gray-300">
            Pedidos
          </Link> */}
        </div>

        <div className="md:hidden">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className=" p-2 rounded-md">☰</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <Link
                    href="/"
                    className="block py-1 px-3 hover:text-gray-300"
                  >
                    Cadastros
                  </Link>
                </MenubarItem>

                <MenubarItem>
                  <Link
                    href="/pdf-filter"
                    className="block py-1 px-3 hover:text-gray-300"
                  >
                    Filtrar
                  </Link>
                </MenubarItem>

                {/* <MenubarItem>
                  <Link
                    href="/pedidosxlsx"
                    className="block py-1 px-3 hover:text-gray-300"
                  >
                    Pedidos
                  </Link>
                </MenubarItem> */}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
