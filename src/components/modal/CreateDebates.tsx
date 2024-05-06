"use client";
import { useState, useEffect, useRef, FormEvent } from "react";
import GreyButton from "../buttons/Grey";
import { useAccount } from "wagmi";
import styles from "@/styles/components/modal/create-debates.module.css";
import { motion } from "framer-motion";
import { useCreateDispute } from "@/hooks/useContractWriteForm";
import { useIsAdmin } from "@/hooks/useContractData";

interface CreateDebatesModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateDebatesModalButton() {
  const { address } = useAccount();
  const [open, setOpen] = useState(false);
  const isAdmin = useIsAdmin(address);

  return (
    <>
      {isAdmin && (
        <>
          <GreyButton
            onClick={() => setOpen((prev) => !prev)}
            title="Create Dispute"
          />
          <CreateDebatesModal open={open} onClose={() => setOpen(false)} />
        </>
      )}
    </>
  );
}

export function CreateDebatesModal({ open, onClose }: CreateDebatesModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const { txStatus, error, status, write } = useCreateDispute(formData);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues: { [key: string]: string } = {};

    for (const [key, value] of formData.entries()) {
      formValues[key] = value as string;
    }

    setFormData(formValues);
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

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      write();
    }
  }, [formData]);

  return open ? (
    <motion.div
      className={styles.debates_modal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.debates_modal__container} ref={modalRef}>
        <h2 className="green_color">Create Dispute</h2>
        <p className={styles.debates_modal__container__close} onClick={onClose}>
          &times;
        </p>
        <form
          className={styles.debates_modal__container__form}
          onSubmit={handleSubmit}
        >
          <div className={styles.debates_modal__container__form__group}>
            <h2>Group ID</h2>
            <input
              min={1}
              defaultValue={1}
              type="number"
              placeholder="Group ID"
              name="groupId"
              required
            />
          </div>
          <div className={styles.debates_modal__container__form__group}>
            <h2>Status</h2>
            <input
              min={0}
              defaultValue={0}
              type="number"
              placeholder="Status"
              name="status"
              required
            />
          </div>

          <div className={styles.debates_modal__container__form__group}>
            <h2>Title</h2>
            <input placeholder="Title" name="point" required />
          </div>
          <div className={styles.debates_modal__container__form__group}>
            <h2>Amount Of Members</h2>
            <input
              min={0}
              defaultValue={0}
              type="number"
              placeholder="Amount Of Members"
              name="qtyMembers"
              required
            />
          </div>
          <div className={styles.debates_modal__container__form__group}>
            <h2>Required Amount Of Members</h2>
            <input
              min={0}
              defaultValue={100}
              type="number"
              placeholder="Required Amount Of Members"
              name="needQtyMembers"
              required
            />
          </div>
          <div className={styles.debates_modal__container__form__group}>
            <h2>Prize Pool</h2>
            <input
              min={0}
              defaultValue={0}
              step="0.001"
              type="number"
              placeholder="Prize Pool"
              name="prizePool"
              required
            />
          </div>
          <div className={styles.debates_modal__container__form__group}>
            <h2>Amount Of Answers</h2>
            <input
              min={0}
              defaultValue={3}
              type="number"
              placeholder="Quantity Of Answers"
              name="qtyAnswers"
              required
            />
          </div>
          <GreyButton
            type="submit"
            style={{ width: "100%", marginTop: 10 }}
            title="Create"
          />
        </form>
      </div>
    </motion.div>
  ) : undefined;
}
