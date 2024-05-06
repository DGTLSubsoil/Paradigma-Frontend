"use client";

import {
  SetDisputePointForm,
  SetIsHotDisputeForm,
  SetStatusDisputeForm,
  UpdateUriForDisputeForm,
} from "@/components/forms/admin/module/DisputeForms";
import { useIsAdmin } from "@/hooks/useContractData";
import { IDisputeForm } from "@/interfaces/forms.interface";
import styles from "@/styles/components/ui/admin/admin.module.css";
import { useAccount } from "wagmi";
import { SVG } from "@/../public/static/images/svg/svg";
import Image from "next/image";

export default function AdminDebate({ dispute }: IDisputeForm) {
  const { address } = useAccount();
  const isAdmin = useIsAdmin(address);

  return !isAdmin ? (
    <></>
  ) : (
    <div className={styles.admin}>
      <div className={styles.admin__head}>
        <h1>Admin </h1>
        <Image
          className={styles.pc}
          src={SVG.horizontalLine4}
          alt="Horizontal Line"
        />
        <Image
          className={styles.mobile}
          src={SVG.horizontalLine5}
          alt="Horizontal Line"
        />
      </div>
      <div className={styles.admin__container}>
        <SetDisputePointForm dispute={dispute} />
        <SetStatusDisputeForm dispute={dispute} />
        <SetIsHotDisputeForm dispute={dispute} />
        <UpdateUriForDisputeForm dispute={dispute} />
      </div>
    </div>
  );
}
