import React from "react";
import { Image } from "primereact/image";
import { Brand } from "@/types/brand";

const SingleBrand: React.FC<{ brand: Brand }> = ({ brand }) => {
  const { href, image, imageLight, name } = brand;

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noreferrer"
      className="relative flex items-center justify-center h-[70px] opacity-70 transition hover:opacity-100"
    >
      <Image
        src={imageLight}
        alt={name}
        className="hidden  h-auto w-[38%] max-h-[90%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain"
      />
      <Image
        src={image}
        alt={name}
        className="block h-auto w-[38%] max-h-[90%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain"
      />
    </a>
  );
};

export default SingleBrand;
