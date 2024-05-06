"use client";

import styles from "@/styles/components/buttons/vote-in-section.module.css";
import Image from "next/image";
import { SVG } from "@/../public/static/images/svg/svg";

interface VoteInSectionButtonProps {
  title: string;
  isActive?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function VoteInSection({
  title,
  isActive,
  style,
  onClick,
}: VoteInSectionButtonProps) {
  return (
    <button
      className={`${styles.account__button} ${styles.account__button__text} ${
        isActive ? styles.active : ""
      }`}
      type="button"
      style={style}
      onClick={onClick}
    >
      <Image src={SVG.vote} alt="vote" />
      {title}
    </button>
  );
}
