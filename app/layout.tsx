import React from "react";
import "@styles/globals.css";
import { Figtree } from "next/font/google";
import Sidebar from "@components/Sidebar";
import SupabaseProvider from "@providers/SupabaseProvider";
import UserProvider from "@providers/UserProvider";
import ModalProvider from "@providers/ModalProvider";
import ToasterProvider from "@providers/ToasterProvider";
import getSongsByUserId from "@actions/getSongsByUserId";
import Player from "@components/Player";
import getActiveProducts from "@actions/getActiveProducts";

const font = Figtree({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Spotify clone",
  description: "Listen worldwide music on spotify clone!",
};

export const revalidate = 0;

const Root = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const userSongs = await getSongsByUserId();
  const products = await getActiveProducts();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
};

export default Root;
