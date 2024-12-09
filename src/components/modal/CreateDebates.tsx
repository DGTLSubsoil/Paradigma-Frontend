"use client";
import { useState, useEffect, useRef, FormEvent } from "react";
import GreyButton from "../buttons/Grey";
import { useAccount } from "wagmi";
import styles from "@/styles/components/modal/create-debates.module.css";
import { motion } from "framer-motion";
import { useIsAdmin } from "@/hooks/useContractData";
import * as useWrite from "@/hooks/useContractWriteForm";
import { pinFileToIPFS, pinJSONToIPFS } from "@/utils/blockchain/loadToPinata";

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
      {(isAdmin || true) && (
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
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const { write } = useWrite.useUpdateUriForDispute(formData);
  const [loading, setLoading] = useState<0 | 1 | 2 | 3>(0);

  const loaders = {
    0: 'Submit',
    1: '33%',
    2: '66%',
    3: '100%'
  }
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setLoading(1)
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues: { [key: string]: string } = {};

    for (const [key, value] of formData.entries()) {
      if (
        key.includes("image")
      ) {
        const file = value as File;
        const ipfsHash = await pinFileToIPFS(file);
        formValues[key] = `https://ipfs.io/ipfs/${ipfsHash}` as string;
      } else {
        formValues[key] = value as string;
      }
    }

    const createMetadataAndUploadToIPFS = async (keyName: string, keyImage: string) => {
      const metadataNFT = {
        name: formValues[keyName],
        description: "This NFT belongs PARADIGMA METAVERSE",
        image: formValues[keyImage],
        attributes: []
      }

      return await pinJSONToIPFS(metadataNFT);
    }

    const metadata = {
      preview: formValues["image"],
      point: formValues["disputeName"],
      answer_data: [
        {
          id: 0,
          answer: formValues["answer1"],
          image: formValues["image1"],
          tokenURI: `https://ipfs.io/ipfs/${await createMetadataAndUploadToIPFS("answer1", "image1")}`,
        },
        {
          id: 1,
          answer: formValues["answer2"],
          image: formValues["image2"],
          tokenURI: `https://ipfs.io/ipfs/${await createMetadataAndUploadToIPFS("answer2", "image2")}`,
        },
        {
          id: 2,
          answer: formValues["answer3"],
          image: formValues["image3"],
          tokenURI: `https://ipfs.io/ipfs/${await createMetadataAndUploadToIPFS("answer3", "image3")}`
        }
      ]
    }

    const metadataURI = await pinJSONToIPFS(metadata);
    setLoading(2)

    const newForm: { [key: string]: string } = {
      _groupID: formValues["groupId"] as string,
      _index: formValues["groupIndex"] as string,
      _newURI: `https://ipfs.io/ipfs/${metadataURI!}`
    }

    setFormData(newForm);
  };

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      write().then(() => {
        setLoading(3)
      }).finally(() => {
        setTimeout(() => setLoading(0), 1000)
      })
    }
  }, [formData]);
  const modalRef = useRef<HTMLDivElement>(null);



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
      className={styles.debates_modal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.debates_modal__container} ref={modalRef}>
        <h2 className="purple_color">Create Dispute</h2>
        <p className={styles.debates_modal__container__close} onClick={onClose}>
          &times;
        </p>
        <form className={styles.form__container__form} onSubmit={handleSubmit}>
          <input
            type="number"
            name="groupId"
            defaultValue={1}
            placeholder="Group ID"
            required
          />
          <input type="file" name="preview" placeholder="Preview" required />
          <input type="text" name="point" placeholder="Point" required />
          <input
            type="number"
            name="meedQuantityMembers"
            placeholder="Quantity Members"
            required
          />
          <input type="text" name="answer1" placeholder="Answer 1" required />
          <input
            type="file"
            accept="image/*"
            name="image1"
            placeholder="Image 1"
            required
          />
          <input type="text" name="answer2" placeholder="Answer 2" required />
          <input
            type="file"
            accept="image/*"
            name="image2"
            placeholder="Image 2"
            required
          />
          <input type="text" name="answer3" placeholder="Answer 3" required />
          <input
            type="file"
            accept="image/*"
            name="image3"
            placeholder="Image 3"
            required
          />
          <GreyButton type="submit" title={loaders[loading]} />
        </form>
      </div>
    </motion.div>
  ) : undefined;
}

// CreateDisputeForm
