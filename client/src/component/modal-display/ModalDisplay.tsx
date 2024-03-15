import { PropsWithChildren } from "react";
import { CardItem } from "../../types/card.types";
import classes from "./modal-display.module.scss";

type ModalDisplayProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
  selected: CardItem | null;
};

export const ModalDisplay = ({
  open,
  selected,
  setOpen,
  children,
}: PropsWithChildren<ModalDisplayProps>) => {
  const handleClose = () => setOpen(false);
  if (open && selected)
    return (
      <div onClick={handleClose} className={classes["modal-display__layout"]}>
        {children}
      </div>
    );
  return null;
};
