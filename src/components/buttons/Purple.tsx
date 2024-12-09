"use client";

import styles from "@/styles/components/buttons/purple.module.css";
import Image from "next/image";
import { SVG } from "@/../public/static/images/svg/svg";

interface PurpleButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  isActive?: boolean;
  hideCubes?: boolean;
  isFullWidthInMobile?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function PurpleButton({
  title,
  type,
  isActive,
  style,
  hideCubes,
  isFullWidthInMobile,
  onClick,
}: PurpleButtonProps) {
  return (
    <button
      className={`${styles.purple__button} ${styles.purple__button__text} ${
        isActive ? styles.active : ""
      } ${isFullWidthInMobile ? styles.mobile_width : ""}`}
      type={type}
      style={style}
      onClick={onClick}
    >
      {!hideCubes && (
        <Image
          className={styles.purple__button__cubes}
          src={SVG.hugeCubesDark}
          alt="cubes"
          style={{ color: "black" }}
        />
      )}
      {title}
    </button>
  );
}
