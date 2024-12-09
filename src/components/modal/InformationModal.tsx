"use client";
import React, { useState, useEffect, useRef } from "react";
import GreyButton from "../buttons/Grey";
import styles from "@/styles/components/modal/buy-nft.module.css";
import { motion } from "framer-motion";


interface InfoModalProps {
    open: boolean;
    onClose: () => void;
    text: string;
}

export function InfoModalButton(props: {
    button: React.ReactElement;
    modalText: string;
    doAction: () => void;
}) {
    const { button, modalText, doAction } = props;
    const [open, setOpen] = useState(false);

    const handleBtnClick = () => {
        doAction();
        setOpen((prev) => !prev)
    }

    return (
        <>
            {React.cloneElement(button, {
                onClick: handleBtnClick,
            })}
            <InfoModal
                open={open}
                onClose={() => setOpen(false)}
                text={modalText}
            />
        </>
    );
}

export function InfoModal({ open, onClose, text }: InfoModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClose = () => {
        onClose?.();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                onClose?.();
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose?.();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);


    return open ? (
        <motion.div
            className={styles.buynft_modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0 }}
        >
            <div className={styles.buynft_modal__container} ref={modalRef}>
                <h2 className="purple_color">Info</h2>
                <p className={styles.buynft_modal__container__close} onClick={onClose}>
                    &times;
                </p>
                <div className={styles.buynft_modal__container__form}>
                    <p>{text}</p>
                    <GreyButton
                        isActive
                        style={{width: "100%", marginTop: 10}}
                        title="Ok"
                        onClick={handleClose}
                    />
                </div>
            </div>
        </motion.div>
    ) : undefined;
}
