import React from "react";
import classes from "./list-item.module.scss";
import { CardItem } from "../../types/card.types";
import { Mail, Phone } from "../../icons";

type ListItemProps = {
  item: CardItem;
  handleOpen: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
};

export const ListItem = ({ handleOpen, item }: ListItemProps) => {
  const { name, phone, email } = item;
  return (
    <div className={classes["list-item__container"]} key={name}>
      <button
        className={classes["list-item__header-container"]}
        data-name={name}
        onClick={handleOpen}
      >
        <h3 className={classes["list-item__header"]}>{name}</h3>
      </button>
      <a className={classes["list-item__info-link"]} href={`tel:${phone}`}>
        <div className={classes["list-item__icon-container"]}>
          <Phone />
        </div>
        <p className={classes["list-item__text-secondary"]}>{phone}</p>
      </a>
      <a className={classes["list-item__info-link"]} href={`mailto:${email}`}>
        <div className={classes["list-item__icon-container"]}>
          <Mail />
        </div>
        <p className={classes["list-item__text-secondary"]}>{email}</p>
      </a>
    </div>
  );
};
