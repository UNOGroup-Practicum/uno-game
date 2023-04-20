import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

import { ChangeEvent, useEffect, useState } from "react";

import { LeaderboardUserData, UserToLeboardData } from "services/api/types";
import { useSelector } from "services/hooks";
import { leaderboardSelect } from "services/slices/leaderboardSlice";
import { createData } from "utils/createDataForLeaderboard";

import { RATING_FIELD_NAME } from "../../constants";

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

const createLabelDisplayedRows = (displayedRowsArgs: LabelDisplayedRowsArgs): string => {
  const { from, to, count } = displayedRowsArgs;
  return `${from}–${to} из ${count !== -1 ? count : `более чем ${to}`}`;
};

export const LeaderboardProfile = () => {
  const [rows, setRows] = useState<LeaderboardUserData[]>([]);
  const { data } = useSelector(leaderboardSelect);

  useEffect(() => {
    const res: LeaderboardUserData[] = [];
    data.forEach((el: UserToLeboardData, idx: number) => {
      res.push(createData(idx + 1, el?.avatar, el.name, el[RATING_FIELD_NAME], el.winsAmount));
    });
    setRows(res);
  }, [data]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
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
                    backgroundColor: "var(--primary-main-dark)",
                    color: "var(--text-color)",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                  {columns.map((column, index) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={index}
                        align={column.align}
                        sx={{
                          fontSize: "1.7rem",
                          backgroundColor: "var(--primary-light-color)",
                          color: "var(--text-color)",
                        }}
                      >
                        {column.id === "imgUrl" ? (
                          <Avatar alt="" src={`${__API_ENDPOINT__}/resources/${value}`} />
                        ) : (
                          value
                        )}
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
          backgroundColor: "var(--primary-main-dark)",
          color: "var(--text-color)",
        }}
      />
    </Paper>
  );
};
