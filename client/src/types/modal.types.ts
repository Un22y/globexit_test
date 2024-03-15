export type Labels<T> = {
  [key in keyof T]: string;
};

export type AddInfo<T, U extends keyof T> = Pick<T, U>;
export type MainInfo<T, U extends keyof T> = Omit<T, U>;
