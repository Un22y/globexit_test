import React, { PropsWithChildren } from "react";
import classes from "./list-wrapper.module.scss";

type ListWrapperProps = {
  isLoading: boolean;
};

export const ListWrapper = ({
  isLoading,
  children,
}: PropsWithChildren<ListWrapperProps>) => {
  return (
    <div className={classes["list-wrapper"]}>
      {isLoading ? <>Loading...</> : children}
    </div>
  );
};
