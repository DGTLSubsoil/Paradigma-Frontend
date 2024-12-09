"use client";

import styles from "@/styles/components/buttons/normal.module.css";
import Image from "next/image";
import { SVG } from "@/../public/static/images/svg/svg";

interface NormalButtonProps {
  title: string;
  isActive?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function NormalButton({
  title,
  isActive,
  style,
  onClick,
}: NormalButtonProps) {
  return (
    <button
      className={`${styles.normal__button} ${styles.normal__button__text} ${
        isActive ? styles.active : ""
      }`}
      type="button"
      style={style}
      onClick={onClick}
    >
      <Image
        className={styles.normal__button__cubes}
        src={SVG.cubes}
        alt="cubes"
      />
      {title}
    </button>
  );
}
