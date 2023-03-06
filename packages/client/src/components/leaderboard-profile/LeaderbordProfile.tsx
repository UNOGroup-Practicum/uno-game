import { profilesList } from "./database";
import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Avatar,
} from "@mui/material";
import { createData } from "../../utils/createDataForLeaderboard";

type LabelDisplayedRowsArgs = {
  from: number;
  to: number;
  count: number;
  page: number;
};

type Column = {
  id: "position" | "imgUrl" | "name" | "games" | "wins" | "percent";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
};

const columns: readonly Column[] = [
  { id: "position", label: "#", minWidth: 60, align: "center" },
  { id: "imgUrl", label: "", minWidth: 60 },
  { id: "name", label: "Имя", minWidth: 240 },
  { id: "games", label: "Игр", minWidth: 140, align: "center" },
  { id: "wins", label: "Побед", minWidth: 140, align: "center" },
  { id: "percent", label: "%", minWidth: 140, align: "center" },
];

type Data = {
  id: number;
  position: number;
  imgUrl: string;
  name: string;
  games: number;
  wins: number;
  percent: string;
};

const rows: Data[] = [];
profilesList
  .sort((a, b) => b.wins - a.wins)
  .forEach((el, idx) => {
    rows.push(createData(el.id, idx + 1, el.avatar, el.name, el.games, el.wins));
  });

const createLabelDisplayedRows = (displayedRowsArgs: LabelDisplayedRowsArgs): string => {
  const { from, to, count } = displayedRowsArgs;
  return `${from}–${to} из ${count !== -1 ? count : `более чем ${to}`}`;
};

export const LeaderboardProfile = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 810 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    minWidth: column.minWidth,
                    fontSize: "1.2rem",
                    backgroundColor: "var(--primary-main-color)",
                    color: "var(--text-color)",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{
                          fontSize: "1.7rem",
                          backgroundColor: "var(--primary-light-color)",
                          color: "var(--text-color)",
                        }}
                      >
                        {column.id === "imgUrl" ? <Avatar alt="" src={value.toString()} /> : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        labelRowsPerPage="Строк на странице:"
        labelDisplayedRows={createLabelDisplayedRows}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          fontSize: "1.1rem",
          backgroundColor: "var(--primary-main-color)",
          color: "var(--text-color)",
        }}
      />
    </Paper>
  );
};
