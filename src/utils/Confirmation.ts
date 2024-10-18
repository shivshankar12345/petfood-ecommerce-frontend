import Swal, { SweetAlertIcon } from "sweetalert2";

export const userConfirm = async (
  title: string,
  text: string,
  confirmButtonText: string,
  icon?: SweetAlertIcon,
  showCancelButton?: boolean,
  confirmButtonColor?: string,
  cancelButtonColor?: string
): Promise<boolean> => {
  return (
    await Swal.fire({
      title,
      text,
      icon,
      showCancelButton,
      confirmButtonColor,
      cancelButtonColor,
      confirmButtonText,
    })
  ).isConfirmed;
};
