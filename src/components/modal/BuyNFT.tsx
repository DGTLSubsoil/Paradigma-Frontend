"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import GreyButton from "../buttons/Grey";
import { useAccount } from "wagmi";
import styles from "@/styles/components/modal/buy-nft.module.css";
import { motion } from "framer-motion";
import { useParadBalance} from "@/hooks/useContractData";

interface BuyNFTModalProps {
    open: boolean;
    onClose: () => void;
    basePrice: string;
    formattedPrice: bigint;
    handleBuyNFT: (mul: number) => void;
    allowance: bigint;
}

export function BuyNFTModalButton(props: {
    button: React.ReactElement;
    basePrice: string;
    formattedPrice: bigint;
    handleBuyNFT: (mul: number) => void;
    allowance: bigint;
}) {
    const { basePrice, handleBuyNFT, button, formattedPrice, allowance } = props;
    const [open, setOpen] = useState(false);

    return (
        <>
            {React.cloneElement(button, {
                onClick: () => setOpen((prev) => !prev),
            })}
            <BuyNFTModal
                open={open}
                onClose={() => setOpen(false)}
                basePrice={basePrice}
                formattedPrice={formattedPrice}
                handleBuyNFT={handleBuyNFT}
                allowance={allowance}
            />
        </>
    );
}

export function BuyNFTModal({ open, onClose, basePrice, handleBuyNFT, formattedPrice, allowance }: BuyNFTModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const { address } = useAccount();
    const { balance } = useParadBalance(address);


    const handleSubmit = (multiplier: number | null) => {
        onClose?.();
        if (multiplier) {
            handleBuyNFT(multiplier);
        }
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
                <h2 className="purple_color">Buy NFT</h2>
                <p className={styles.buynft_modal__container__close} onClick={onClose}>
                    &times;
                </p>
                <div className={styles.buynft_modal__container__form}>

                    <div>
                        <h2>{basePrice.toString()} PARAD</h2>
                        {
                            !Boolean(balance && (balance > formattedPrice))
                            ?
                            <GreyButton
                                isActive={Boolean(balance && (balance > formattedPrice))}
                                style={{width: "100%", marginTop: 10}}
                                title="Not enough PARAD"
                                onClick={() => handleSubmit(null)}
                            />
                            :
                            <GreyButton
                                isActive={Boolean(balance && (balance > formattedPrice))}
                                style={{width: "100%", marginTop: 10}}
                                title={allowance && allowance >= formattedPrice * BigInt(105) / BigInt(100) ? "Buy x1" : "Approve"}
                                onClick={() => handleSubmit(1)}
                            />
                        }    
                    </div>

                    <div>
                        <h2>{(BigInt(basePrice) * 10n).toString()} PARAD</h2>
                        {
                            !Boolean(balance && (balance > formattedPrice))
                            ?
                            <GreyButton
                                isActive={Boolean(balance && (balance > formattedPrice * 10n))}
                                style={{width: "100%", marginTop: 10}}
                                title="Not enough PARAD"
                                onClick={() => handleSubmit(null)}
                            />
                            :
                            <GreyButton
                                isActive={Boolean(balance && (balance > formattedPrice * 10n))}
                                style={{width: "100%", marginTop: 10}}
                                title={allowance && allowance >= formattedPrice * 10n * BigInt(105) / BigInt(100) ? "Buy x10" : "Approve"}
                                onClick={() => handleSubmit(10)}
                            />
                        }    
                    </div>

                    <div>
                        <h2>{(BigInt(basePrice) * 100n).toString()} PARAD</h2>
                        {
                            !Boolean(balance && (balance > formattedPrice))
                            ?
                            <GreyButton
                                isActive={Boolean(balance && (balance > formattedPrice * 100n))}
                                style={{width: "100%", marginTop: 10}}
                                title="Not enough PARAD"
                                onClick={() => handleSubmit(null)}
                            />
                            :
                            <GreyButton
                                isActive={Boolean(balance && (balance > formattedPrice * 100n))}
                                style={{width: "100%", marginTop: 10}}
                                title={allowance && allowance >= formattedPrice * 100n * BigInt(105) / BigInt(100) ? "Buy x100" : "Approve"}
                                onClick={() => handleSubmit(100)}
                            />
                        }    
                    </div>
                </div>
            </div>
        </motion.div>
    ) : undefined;
}
