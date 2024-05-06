"use client";

import { FormEvent, useEffect, useState } from "react";
import * as useWrite from "@/hooks/useContractWriteForm";
import styles from "@/styles/components/forms/admin-forms.module.css";
import GreyButton from "@/components/buttons/Grey";
import { keccak256, toHex } from "viem";

export const GrantRoleForm = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const { write } = useWrite.useGrantRole(formData);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues: { [key: string]: string } = {};

    for (const [key, value] of formData.entries()) {
      if (key === "role") {
        formValues[key] = keccak256(toHex(value as string));
      } else {
        formValues[key] = value as string;
      }
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
        <h2 className="green_color">Grant Role</h2>
        <form className={styles.form__container__form} onSubmit={handleSubmit}>
          <input type="text" name="role" placeholder="Role" required />
          <input type="text" name="account" placeholder="Account" required />
          <GreyButton type="submit" title="Submit" />
        </form>
      </div>
    </div>
  );
};

export const RevokeRoleForm = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const { write } = useWrite.useRevokeRole(formData);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues: { [key: string]: string } = {};

    for (const [key, value] of formData.entries()) {
      if (key === "role") {
        formValues[key] = keccak256(toHex(value as string));
      } else {
        formValues[key] = value as string;
      }
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
        <h2 className="green_color">Revoke Role</h2>
        <form className={styles.form__container__form} onSubmit={handleSubmit}>
          <input type="text" name="role" placeholder="Role" required />
          <input type="text" name="account" placeholder="Account" required />
          <GreyButton type="submit" title="Submit" />
        </form>
      </div>
    </div>
  );
};

export const RenounceRoleForm = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const { write } = useWrite.useRenounceRole(formData);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues: { [key: string]: string } = {};

    for (const [key, value] of formData.entries()) {
      if (key === "role") {
        formValues[key] = keccak256(toHex(value as string));
      } else {
        formValues[key] = value as string;
      }
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
        <h2 className="green_color">Renounce Role</h2>
        <form className={styles.form__container__form} onSubmit={handleSubmit}>
          <input type="text" name="role" placeholder="Role" required />
          <input type="text" name="account" placeholder="Account" required />
          <GreyButton type="submit" title="Submit" />
        </form>
      </div>
    </div>
  );
};
