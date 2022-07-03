import { IExpanse } from "../Interfaces/apiInterfaces";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { memo } from "react";

interface IExpanseMainProps {
  expanses: IExpanse[];
}

export const ExpanseMain = memo(function (props: IExpanseMainProps) {
  const { expanses } = props;
  return (
    <Box>
      {expanses.length > 0 ? (
        <Box width="inherit">
          <TableContainer
            component={"div"}
            sx={{ padding: "8px 30px", width: "inherit" }}
          >
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Despesa</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Dia</TableCell>
                  <TableCell align="right">Valor (R$)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expanses.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "& td": { padding: "15px" },
                    }}
                  >
                    <TableCell>{row.descricao}</TableCell>
                    <TableCell>{row.categoria}</TableCell>
                    <TableCell>{row.dia}</TableCell>
                    <TableCell align="right">
                      {row.valor.toFixed(2).toString().replace(".", ",")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <span>Não há despesas para o período selecionado!</span>
      )}
    </Box>
  );
});
