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
  children?: ReactNode
}
const AlertBox: React.FC<AlertBoxProps> = ({
  title,
  description,
  onClose,
  onContinue,
  open,
  children
}) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-serif">{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
           
          </AlertDialogDescription>
          <AlertDialogDescription>
          
            {children}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={()=>onClose()}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=>onContinue()} className="bg-red-500 hover:bg-red-400">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertBox;
