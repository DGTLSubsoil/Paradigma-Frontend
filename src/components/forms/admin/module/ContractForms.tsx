"use client";

import { FormEvent, useEffect, useState } from "react";
import * as useWrite from "@/hooks/useContractWriteForm";
import styles from "@/styles/components/forms/admin-forms.module.css";
import GreyButton from "@/components/buttons/Grey";

export const SetRefValueForm = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const { write } = useWrite.useSetRefValue(formData);

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
    if (Object.keys(formData).length > 0) {
      write();
    }
  }, [formData]);

  return (
    <div className={styles.form}>
      <div className={styles.form__container}>
        <h2 className="purple_color">Set Ref Value</h2>
        <form className={styles.form__container__form} onSubmit={handleSubmit}>
          <input type="text" name="value" placeholder="Value" required />
          <GreyButton type="submit" title="Submit" />
        </form>
      </div>
    </div>
  );
};

export const SetPARADContractForm = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const { write } = useWrite.useSetPARADContract(formData);

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
    if (Object.keys(formData).length > 0) {
      write();
    }
  }, [formData]);

  return (
    <div className={styles.form}>
      <div className={styles.form__container}>
        <h2 className="purple_color">Set PARAD Contract</h2>
        <form className={styles.form__container__form} onSubmit={handleSubmit}>
          <input type="text" name="address" placeholder="Address" required />
          <GreyButton type="submit" title="Submit" />
        </form>
      </div>
    </div>
  );
};

export const SetSporeNFTForm = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const { write } = useWrite.useSetSporeNFT(formData);

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
    if (Object.keys(formData).length > 0) {
      write();
    }
  }, [formData]);

  return (
    <div className={styles.form}>
      <div className={styles.form__container}>
        <h2 className="purple_color">Set Spore NFT</h2>
        <form className={styles.form__container__form} onSubmit={handleSubmit}>
          <input type="text" name="address" placeholder="Address" required />
          <GreyButton type="submit" title="Submit" />
        </form>
      </div>
    </div>
  );
};



export const SetAdminWalletForm = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const { write } = useWrite.useSetAdminWallet(formData);

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
    if (Object.keys(formData).length > 0) {
      write();
    }
  }, [formData]);

  return (
    <div className={styles.form}>
      <div className={styles.form__container}>
        <h2 className="purple_color">Set Admin Wallet</h2>
        <form className={styles.form__container__form} onSubmit={handleSubmit}>
          <input type="text" name="address" placeholder="Address" required />
          <GreyButton type="submit" title="Submit" />
        </form>
      </div>
    </div>
  );
};




export const SetTransferOwnershipForm = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const { write } = useWrite.useSetTransferOwnership(formData);

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
    if (Object.keys(formData).length > 0) {
      write();
    }
  }, [formData]);

  return (
    <div className={styles.form}>
      <div className={styles.form__container}>
        <h2 className="purple_color">Transfer Ownership</h2>
        <form className={styles.form__container__form} onSubmit={handleSubmit}>
          <input type="text" name="address" placeholder="New owner" required />
          <GreyButton type="submit" title="Submit" />
        </form>
      </div>
    </div>
  );
};


export const SetAdminFeeForm = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const { write } = useWrite.useSetAdminFee(formData);

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
    if (Object.keys(formData).length > 0) {
      write();
    }
  }, [formData]);

  return (
    <div className={styles.form}>
      <div className={styles.form__container}>
        <h2 className="purple_color">Set Admin Fee</h2>
        <form className={styles.form__container__form} onSubmit={handleSubmit}>
          <input type="text" name="value" placeholder="Value in %" required />
          <GreyButton type="submit" title="Submit" />
        </form>
      </div>
    </div>
  );
};