"use client";

/* import {
  GrantRoleForm,
  RenounceRoleForm,
  RevokeRoleForm,
} from "./module/RoleForms"; */
import {
    CreateDisputeForm,
    SetDisputePointForm, SetDeleteDispute,
    SetIsHotDisputeForm,
    SetStatusDisputeForm, UpdateGroupIdURIForm,
    UpdateUriForDisputeForm,
} from "./module/DisputeForms";
import {
  SetPARADContractForm,
  SetRefValueForm,
  SetSporeNFTForm, SetAdminWalletForm, SetAdminFeeForm, SetTransferOwnershipForm
} from "./module/ContractForms";
import { ReceiveERC20Form, WithdrawPARADForm } from "./module/WithdrawForms";
import styles from "@/styles/components/forms/admin-forms.module.css";

export default function MasterForm() {
  return (
    <div className={styles.master_form}>
      <CreateDisputeForm/>
{/*       <GrantRoleForm />
      <RevokeRoleForm />
      <RenounceRoleForm /> */}
      <SetDisputePointForm />
      <SetDeleteDispute />
      <SetStatusDisputeForm />
      <SetIsHotDisputeForm />
      <UpdateUriForDisputeForm />
      <SetRefValueForm />
      <SetPARADContractForm />
      <SetSporeNFTForm />
      <SetAdminWalletForm />
      <SetTransferOwnershipForm />
      <SetAdminFeeForm />
      <WithdrawPARADForm />
      <UpdateGroupIdURIForm />
    </div>
  );
}
