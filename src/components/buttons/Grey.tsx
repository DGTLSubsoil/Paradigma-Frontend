"use client";

import styles from "@/styles/components/buttons/grey.module.css";
import Image from "next/image";
import { SVG } from "@/../public/static/images/svg/svg";

interface GreyButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  isDark?: boolean;
  isActive?: boolean;
  hideCubes?: boolean;
  isFullWidthInMobile?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  onSubmit?: () => void;
}

export default function GreyButton({
  title,
  type,
  isDark,
  isActive,
  style,
  hideCubes,
  isFullWidthInMobile,
  onClick,
  onSubmit,
}: GreyButtonProps) {
  return (
    <button
      className={`${styles.grey__button} ${styles.grey__button__text} ${
        isActive ? styles.active : ""
      } ${isDark ? styles.dark : ""} ${
        isFullWidthInMobile ? styles.mobile_width : ""
      }`}
      type={type}
      style={style}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {!hideCubes && (
        <Image
          className={styles.grey__button__cubes}
          src={SVG.hugeCubes}
          alt="cubes"
          style={{ color: "black" }}
        />
      )}
      {title}
    </button>
  );
}
