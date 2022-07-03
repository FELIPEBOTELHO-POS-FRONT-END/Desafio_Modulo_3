import { IExpanseCategory } from "../Interfaces/apiInterfaces";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";

interface IExpanseCategoryProps {
  expanses: IExpanseCategory[];
}

export default function ExpanseCategory(props: IExpanseCategoryProps) {
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
                  <TableCell>Categoria</TableCell>
                  <TableCell align="right">Valor (R$)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expanses.map((row) => (
                  <TableRow
                    key={row.categoria}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "& td": { padding: "15px" },
                    }}
                  >
                    <TableCell>{row.categoria}</TableCell>
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
}
