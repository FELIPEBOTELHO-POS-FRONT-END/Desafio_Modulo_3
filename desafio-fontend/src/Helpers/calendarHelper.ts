export const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const YEARS = [2020, 2021, 2022, 2023, 2024]

export function getFixedStartDate(){
    return getStringValues({month:1, year:2021})
}

export function getStringValues(value:{month:number, year: number}){
    return {month: value.month.toString().padStart(2,'0'), year: value.year.toString()}
} 