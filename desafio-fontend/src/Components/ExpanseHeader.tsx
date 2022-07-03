import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { MONTHS, YEARS } from "../Helpers/calendarHelper";

interface IExpanseHeaderProps {
  onChangeCompleteDate: (selectedYear: number, selectedMonth: number) => void;
  firstDate: string;
  somaDespesas: string;
}

export const ExpanseHeader = memo(function ExpanseHeader(
  props: IExpanseHeaderProps
) {
  const [selectedMonth, setSelectedMonth] = useState<number>(3);
  const [selectedYear, setSelectedYear] = useState<number>(2022);

  useEffect(() => {
    const dateString = props.firstDate;
    if (dateString) {
      setSelectedMonth(+dateString.split("-")[1]);
      setSelectedYear(+dateString.split("-")[0]);
    }
  }, [props.firstDate]);

  return (
    <Box display="flex" alignItems="center" padding="8px 30px">
      <Box width="20rem" flex="1">
        <FormControl
          margin="normal"
          sx={{ width: "10rem", paddingRight: "10px" }}
        >
          <InputLabel id="select-year">Ano</InputLabel>
          <Select
            labelId="select-year"
            value={selectedYear}
            onChange={(evt) => {
              setSelectedYear(evt.target.value as number);
              if (selectedMonth) {
                props.onChangeCompleteDate(+evt.target.value!, selectedMonth);
              }
            }}
          >
            {YEARS.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl margin="normal" sx={{ width: "15rem" }}>
          <InputLabel id="select-month">Mês</InputLabel>
          <Select
            labelId="select-month"
            value={selectedMonth}
            onChange={(evt) => {
              setSelectedMonth(evt.target.value as number);
              if (selectedYear) {
                props.onChangeCompleteDate(selectedYear, +evt.target.value!);
              }
            }}
          >
            {MONTHS.map((c, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <span>
          Despesa total: <strong>{props.somaDespesas}</strong>
        </span>
      </Box>
    </Box>
  );
});
