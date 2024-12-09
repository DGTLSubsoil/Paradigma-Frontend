"use client";

import styles from "@/styles/components/buttons/back.module.css";
import Image from "next/image";
import { SVG } from "@/../public/static/images/svg/svg";
import { useRouter } from "next/navigation";

interface AccountButtonProps {
  title: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function BackButton({
  title,
  style,
  onClick,
}: AccountButtonProps) {
  const router = useRouter();

  return (
    <button
      className={styles.back__button}
      type="button"
      style={style}
      onClick={onClick ? onClick : () => router.back()}
    >
      <Image src={SVG.back} alt="back" />
      <span className={styles.back__button__text}>{title}</span>
    </button>
  );
}
