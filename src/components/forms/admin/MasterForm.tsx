"use client";

import {
  GrantRoleForm,
  RenounceRoleForm,
  RevokeRoleForm,
} from "./module/RoleForms";
import {
  SetDisputePointForm,
  SetIsHotDisputeForm,
  SetStatusDisputeForm,
  UpdateUriForDisputeForm,
} from "./module/DisputeForms";
import {
  SetPARADContractForm,
  SetRefValueForm,
  SetSporeNFTForm,
} from "./module/ContractForms";
import { ReceiveERC20Form, WithdrawPARADForm } from "./module/WithdrawForms";
import styles from "@/styles/components/forms/admin-forms.module.css";
import { CreateDebatesModalButton } from "@/components/modal/CreateDebates";

export default function MasterForm() {
  return (
    <div className={styles.master_form}>
      <div className={styles.master_form__dispute}>
        <h2 className={"green_color"}>Create Dispute Modal</h2>
        <CreateDebatesModalButton />
      </div>

      <GrantRoleForm />
      <RevokeRoleForm />
      <RenounceRoleForm />
      <SetDisputePointForm />
      <SetStatusDisputeForm />
      <SetIsHotDisputeForm />
      <UpdateUriForDisputeForm />
      <SetRefValueForm />
      <SetPARADContractForm />
      <SetSporeNFTForm />
      <ReceiveERC20Form />
      <WithdrawPARADForm />
    </div>
  );
}
