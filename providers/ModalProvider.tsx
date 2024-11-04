"use client";
import { useEffect, useState } from "react";

import AuthModal from "@components/AuthModal";
import UploadModal from "@components/UploadModal";
import SubscribeModal from "@components/SubscribeModal";
import { ProductWithPrice } from "@types";

interface ModalProviderProps {
  products: ProductWithPrice[];
}

const ModalProvider = ({ products }: ModalProviderProps) => {
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal></AuthModal>
      <UploadModal></UploadModal>
      <SubscribeModal products={products}></SubscribeModal>
    </>
  );
};

export default ModalProvider;
