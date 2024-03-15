import { CardItem } from "../types/card.types";
import { Labels, AddInfo, MainInfo } from "../types/modal.types";

export const addInfo: Labels<AddInfo<CardItem, "address">> = {
  address: "Адрес",
};

export const mainInfo: Labels<MainInfo<CardItem, "name" | "address">> = {
  phone: "Телефон",
  email: "Почта",
  hire_date: "Дата приема",
  position_name: "Должность",
  department: "Подразделение",
};
