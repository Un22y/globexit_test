import React, { DetailedHTMLProps, SVGProps } from "react";
import cn from "classnames";
import classes from "./input.module.scss";

type InputProps = {
  className?: string;
  Icon?: React.ReactElement<SVGProps<SVGSVGElement>>;
} & DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ Icon, className, ...props }, ref): JSX.Element => {
    return (
      <label className={cn(classes["input__container"])}>
        <input
          {...props}
          ref={ref}
          className={cn(classes["input__input"], className)}
        />
        {!!Icon && Icon}
      </label>
    );
  }
);
