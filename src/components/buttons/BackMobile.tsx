"use client";

import styles from "@/styles/components/buttons/back_mobile.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SVG } from "@/../public/static/images/svg/svg";

interface AccountButtonProps {
  title: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function BackMobile({
  title,
  style,
  onClick,
}: AccountButtonProps) {
  const router = useRouter();

  return (
    <button
      className={`${styles.back_mobile__button} ${styles.back_mobile__button__text}`}
      type="button"
      style={style}
      onClick={onClick ? onClick : () => router.back()}
    >
      <Image src={SVG.back} alt="back" />
      {title}
    </button>
  );
}
