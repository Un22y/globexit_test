import { useEffect } from "react";

export const useCloseDroppedWindowListener = (
  rootRef: React.RefObject<HTMLDivElement>,
  stateHandler: React.Dispatch<boolean> | ((state: boolean) => void),
  state: boolean
): void => {
  useEffect(() => {
    const closeSelect = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const ref = rootRef.current as HTMLElement;
      if (
        !!ref &&
        !(
          ref.compareDocumentPosition(target) &
          Node.DOCUMENT_POSITION_CONTAINED_BY
        )
      ) {
        state && stateHandler(false);
      }
    };
    document.addEventListener("click", closeSelect);

    return () => document.removeEventListener("click", closeSelect);
  }, [rootRef]);
};
