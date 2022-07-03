import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IExpanse, IExpanseCategory } from "../Interfaces/apiInterfaces";
import { getExpanses } from "../Service/apiService";

export function useExpansePageState(month: string) {
  const navigate = useNavigate();

  const [expanses, setExpanses] = useState<IExpanse[]>([]);

  useEffect(() => {
    getExpanses(month!).then((data) => {
      setExpanses(data);
    });
  }, [month]);

  const getSumExpanses = useMemo(() => {
    if (expanses.length > 0) {
      const sum = expanses.reduce((a, b) => a + b.valor, 0);
      return `R$ ${sum.toFixed(2).replace(".", ",")}`;
    }
    return "R$ 00,00";
  }, [expanses]);

  const expansesCategory = useMemo(() => {
    const list: IExpanseCategory[] = [];
    const categories = expanses
      .map((item) => item.categoria)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a.localeCompare(b));
    categories.forEach((category) => {
      list.push({
        categoria: category,
        valor: expanses
          .filter((x) => x.categoria === category)
          .reduce((a, b) => a + b.valor, 0),
      });
    });
    return list;
  }, [expanses]);

  const handleSelectedDate = useCallback(
    (yearSelected: number, monthSelected: number) => {
      const currentStringDate =
        yearSelected + "-" + monthSelected.toString().padStart(2, "0");
      if (month !== currentStringDate) {
        navigate(`/despesas/${currentStringDate}`);
      }
    },
    [month, navigate]
  );

  return {
    expanses,
    getSumExpanses,
    expansesCategory,
    handleSelectedDate,
  };
}
