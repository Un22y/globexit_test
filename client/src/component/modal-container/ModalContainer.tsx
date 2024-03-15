import classes from "./modal-container.module.scss";
import { CardItem } from "../../types/card.types";
import { Cross } from "../../icons";
import { useMemo } from "react";
import { omit } from "../../helpers/omit";
import { AddInfo, MainInfo } from "../../types/modal.types";
import { mainInfo, addInfo } from "../../const/modal.const";

type ModalContainerProps = {
  selected: CardItem | null;
  setOpen: (state: boolean) => void;
};

export const ModalContainer = ({ selected, setOpen }: ModalContainerProps) => {
  const handleClose = () => setOpen(false);
  const info = useMemo(() => {
    if (!selected) {
      return null;
    }
    const copy = omit<CardItem, "name">(selected, ["name"]);
    return Object.entries<CardItem>(copy).reduce<{
      main: Record<string, string>;
      additional: Record<string, string>;
    }>(
      (acc, [key, value]) => {
        if (key in mainInfo) {
          acc.main[key] = value;
        }
        if (key in addInfo) {
          acc.additional[key] = value;
        }
        return acc;
      },
      { main: {}, additional: {} }
    );
  }, [selected]);
  if (!selected) return null;
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={classes["modal-container__container"]}
    >
      <div className={classes["modal-container__header"]}>
        <h2 className={classes["modal-container__name"]}>{selected.name}</h2>
        <button
          className={classes["modal-container__close-btn"]}
          onClick={handleClose}
        >
          <Cross />
        </button>
      </div>
      <div className={classes["modal-container__main-info"]}>
        {info &&
          Object.entries<MainInfo<CardItem, "name" | "address">>(info.main).map(
            ([key, value]) => (
              <div className={classes["modal-container__info-row"]}>
                <p className={classes["modal-container__info-label"]}>
                  {mainInfo[key]}
                </p>
                <p className={classes["modal-container__info-value"]}>
                  {value}
                </p>
              </div>
            )
          )}
      </div>
      <div className={classes["modal-container__add-info"]}>
        <p className={classes["modal-container__add-title"]}>
          Дополнительная информация
        </p>
        {info &&
          Object.entries<AddInfo<CardItem, "address">>(info.additional).map(
            ([key, value]) => (
              <div className={classes["modal-container__info-row"]}>
                <p className={classes["modal-container__info-label"]}>
                  {addInfo[key]}
                </p>
                <p className={classes["modal-container__info-value"]}>
                  {value}
                </p>
              </div>
            )
          )}
      </div>
    </div>
  );
};
