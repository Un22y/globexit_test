import { useCallback, useEffect, useState } from "react";
import { useFetching } from "./hooks/useFetching";
import { CardItem } from "./types/card.types";
import {
  ListItem,
  ListWrapper,
  ModalContainer,
  ModalDisplay,
} from "./component";
import { executeRequest } from "./api";
import { Requests } from "./api/const";
import "./global.scss";
import { useDebounce } from "./hooks/useDebounse";
import { AxiosRequestConfig } from "axios";
import { Input } from "./ui";
import { Search } from "./icons";
import classes from "./app.module.scss";

function App() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<CardItem | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [list, setList] = useState<CardItem[]>([]);
  const debounseValue = useDebounce(search, 500);
  const cardRequest = useCallback(async () => {
    const getParams = (): AxiosRequestConfig | undefined => {
      if (!debounseValue) {
        return undefined;
      }
      return {
        params: {
          term: debounseValue,
        },
      };
    };
    const data = await executeRequest<CardItem[]>(
      Requests.getData,
      getParams()
    );
    data && setList(data);
  }, [debounseValue]);

  const [getCards, isLoading] = useFetching(cardRequest);
  useEffect(() => {
    getCards();
  }, [debounseValue, getCards]);

  const handleOpen: React.MouseEventHandler<
    HTMLDivElement | HTMLButtonElement
  > = (event) => {
    const {
      currentTarget: {
        dataset: { name },
      },
    } = event;
    setOpenModal(true);
    setSelected(list.find((item) => item.name === name) || null);
  };
  return (
    <div className={classes["root__container"]}>
      <Input
        Icon={<Search className={classes["search__icon"]} />}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className={classes["search__input"]}
        type="text"
      />
      <ListWrapper isLoading={isLoading}>
        {list.map((item) => (
          <ListItem item={item} key={item.name} handleOpen={handleOpen} />
        ))}
      </ListWrapper>
      <ModalDisplay
        setOpen={(state: boolean) => {
          setOpenModal(state);
        }}
        selected={selected}
        open={openModal}
      >
        <ModalContainer
          selected={selected}
          setOpen={(state: boolean) => {
            setOpenModal(state);
          }}
        />
      </ModalDisplay>
    </div>
  );
}

export default App;
