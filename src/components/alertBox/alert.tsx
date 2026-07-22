import { type ReactNode } from "react";
import { X } from "lucide-react";
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
        <button
          onClick={() => onClose()}
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
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
            className="bg-red-500 hover:bg-red-400 dark:text-white"
          >
            {continueButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertBox;
