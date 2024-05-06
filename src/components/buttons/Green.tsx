"use client";

import styles from "@/styles/components/buttons/green.module.css";
import Image from "next/image";
import { SVG } from "@/../public/static/images/svg/svg";

interface GreenButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  isActive?: boolean;
  hideCubes?: boolean;
  isFullWidthInMobile?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function GreenButton({
  title,
  type,
  isActive,
  style,
  hideCubes,
  isFullWidthInMobile,
  onClick,
}: GreenButtonProps) {
  return (
    <button
      className={`${styles.green__button} ${styles.green__button__text} ${
        isActive ? styles.active : ""
      } ${isFullWidthInMobile ? styles.mobile_width : ""}`}
      type={type}
      style={style}
      onClick={onClick}
    >
      {!hideCubes && (
        <Image
          className={styles.green__button__cubes}
          src={SVG.hugeCubesDark}
          alt="cubes"
          style={{ color: "black" }}
        />
      )}
      {title}
    </button>
  );
}
