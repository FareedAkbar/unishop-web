import { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

interface AlertBoxProps {
  title: string;
  description: string;
  onClose: () => void;
  onContinue: () => void;
  open: boolean;
  children?: ReactNode;
  cancelButtonText?: string;
  continueButtonText?: string;
}
const AlertBox: React.FC<AlertBoxProps> = ({
  title,
  description,
  onClose,
  onContinue,
  open,
  children,
  cancelButtonText = "Cancel",
  continueButtonText = "Continue",
}) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
          <AlertDialogDescription>{children}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onClose()}>
            {cancelButtonText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onContinue()}
            className="bg-red-500 hover:bg-red-400"
          >
            {continueButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertBox;
