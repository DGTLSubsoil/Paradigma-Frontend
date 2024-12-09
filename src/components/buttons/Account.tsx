"use client";

import styles from "@/styles/components/buttons/account.module.css";
import Image from "next/image";
import { SVG } from "@/../public/static/images/svg/svg";

interface AccountButtonProps {
  title: string;
  isActive?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function AccountButton({
  title,
  isActive,
  style,
  onClick,
}: AccountButtonProps) {
  return (
    <button
      className={`${styles.account__button} ${styles.account__button__text} ${
        isActive ? styles.active : ""
      }`}
      type="button"
      style={style}
      onClick={onClick}
    >
      <Image
        className={styles.account__button__cubes}
        src={SVG.cubes}
        alt="cubes"
      />
      <Image src={SVG.account} alt="account" />
      {title}
    </button>
  );
}
