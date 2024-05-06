import { toast, Bounce } from "react-toastify";
import styles from "@/styles/components/toasts.module.css";

interface ToastProps {
  title?: string;
  description: string;
}

const CustomToast = ({ title, description }: ToastProps) => (
  <div className={styles.toast}>
    <h4>{title} </h4>
    <p>{description}</p>
  </div>
);

export const notifyError = (description: string) =>
  toast.error(<CustomToast title="Error" description={description} />, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });

export const notifySuccess = (description: string) =>
  toast.success(<CustomToast title="Success" description={description} />, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });

export const notifyInfo = (description: string) =>
  toast.info(<CustomToast title="Info" description={description} />, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
