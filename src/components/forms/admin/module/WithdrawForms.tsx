"use client";

import { FormEvent, useEffect, useState } from "react";
import * as useWrite from "@/hooks/useContractWriteForm";
import styles from "@/styles/components/forms/admin-forms.module.css";
import GreyButton from "@/components/buttons/Grey";
import { blockchainService } from "@/services/blockchain/blockchain.service";

const { getDecimalsOfToken, getDecimalsOfPARAD } = blockchainService;

export const ReceiveERC20Form = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const { write } = useWrite.useReceiveERC20(formData);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues: { [key: string]: string } = {};

    for (const [key, value] of formData.entries()) {
      formValues[key] = value as string;
    }

    const decimals = await getDecimalsOfToken(
      formValues["token"] as `0x${string}`
    );

    formValues["amount"] = (
      Number(formValues["amount"]) * Math.pow(10, decimals)
    ).toString();

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
        <h2 className="green_color">Receive ERC20</h2>
        <form className={styles.form__container__form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="token"
            placeholder="Token Address"
            required
          />
          <input
            type="number"
            min={0}
            step="0.001"
            name="amount"
            placeholder="Amount"
            required
          />
          <GreyButton type="submit" title="Submit" />
        </form>
      </div>
    </div>
  );
};

export const WithdrawPARADForm = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const { write } = useWrite.useWithdrawPARAD(formData);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues: { [key: string]: string } = {};

    for (const [key, value] of formData.entries()) {
      formValues[key] = value as string;
    }

    const decimals = await getDecimalsOfPARAD();

    formValues["amount"] = (
      Number(formValues["amount"]) * Math.pow(10, decimals)
    ).toString();

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
        <h2 className="green_color">Withdraw PARAD</h2>
        <form className={styles.form__container__form} onSubmit={handleSubmit}>
          <input
            type="number"
            min={0}
            step="0.001"
            name="amount"
            placeholder="Amount"
            required
          />
          <GreyButton type="submit" title="Submit" />
        </form>
      </div>
    </div>
  );
};
