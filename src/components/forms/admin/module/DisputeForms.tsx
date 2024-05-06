"use client";

import { FormEvent, useEffect, useState } from "react";
import * as useWrite from "@/hooks/useContractWriteForm";
import styles from "@/styles/components/forms/admin-forms.module.css";
import GreyButton from "@/components/buttons/Grey";
import { IDisputeForm } from "@/interfaces/forms.interface";

export const SetDisputePointForm = ({ dispute }: IDisputeForm) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const { write } = useWrite.useSetDisputePoint(formData);

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
        <h2 className="green_color">Set Dispute Point</h2>
        <form className={styles.form__container__form} onSubmit={handleSubmit}>
          <input
            type="number"
            name="groupId"
            defaultValue={dispute?.groupId}
            placeholder="Group ID"
            required
          />
          <input
            type="number"
            name="groupIndex"
            defaultValue={
              dispute?.groupIndex && Number(dispute?.groupIndex) - 1
            }
            placeholder="Group Index"
            required
          />
          <input type="text" name="point" placeholder="Point" required />
          <GreyButton type="submit" title="Submit" />
        </form>
      </div>
    </div>
  );
};

export const SetStatusDisputeForm = ({ dispute }: IDisputeForm) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const { write } = useWrite.useSetStatusDispute(formData);

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
        <h2 className="green_color">Set Status Dispute</h2>
        <form className={styles.form__container__form} onSubmit={handleSubmit}>
          <input
            type="number"
            name="groupId"
            defaultValue={dispute?.groupId}
            placeholder="Group ID"
            required
          />
          <input
            type="number"
            name="groupIndex"
            defaultValue={
              dispute?.groupIndex && Number(dispute?.groupIndex) - 1
            }
            placeholder="Group Index"
            required
          />
          <input type="number" name="status" placeholder="Status" required />
          <GreyButton type="submit" title="Submit" />
        </form>
      </div>
    </div>
  );
};

export const SetIsHotDisputeForm = ({ dispute }: IDisputeForm) => {
  const [formData, setFormData] = useState<{ [key: string]: string | boolean }>(
    {}
  );
  const { write } = useWrite.useSetIsHotDispute(formData);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues: { [key: string]: string | boolean } = {};

    for (const [key, value] of formData.entries()) {
      if (key === "isHot") {
        formValues[key] =
          value === "false"
            ? false
            : value === "true"
            ? true
            : (value as string);
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
        <h2 className="green_color">Set Is Hot Dispute</h2>
        <form className={styles.form__container__form} onSubmit={handleSubmit}>
          <input
            type="number"
            name="groupId"
            defaultValue={dispute?.groupId}
            placeholder="Group ID"
            required
          />
          <input
            type="number"
            name="groupIndex"
            defaultValue={
              dispute?.groupIndex && Number(dispute?.groupIndex) - 1
            }
            placeholder="Group Index"
            required
          />
          <input type="text" name="isHot" placeholder="Is Hot" required />
          <GreyButton type="submit" title="Submit" />
        </form>
      </div>
    </div>
  );
};

export const UpdateUriForDisputeForm = ({ dispute }: IDisputeForm) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const { write } = useWrite.useUpdateUriForDispute(formData);

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
        <h2 className="green_color">Update Uri For Dispute</h2>
        <form className={styles.form__container__form} onSubmit={handleSubmit}>
          <input
            type="number"
            name="groupId"
            defaultValue={dispute?.groupId}
            placeholder="Group ID"
            required
          />
          <input
            type="number"
            name="groupIndex"
            defaultValue={
              dispute?.groupIndex && Number(dispute?.groupIndex) - 1
            }
            placeholder="Group Index"
            required
          />
          <input type="text" name="newURI" placeholder="New URI" required />
          <GreyButton type="submit" title="Submit" />
        </form>
      </div>
    </div>
  );
};
