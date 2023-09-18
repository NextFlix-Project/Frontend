import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState(null);

  const [usersData, setUsersData] = useState(null);
  const [userCard, setUserCard] = useState({ opened: false, user: null });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 200 },
    { id: "active", label: "Active", minWidth: 50 },
    { id: "autoRenew", label: "Auto Renew", minWidth: 50 },
    { id: "endDate", label: "End date", minWidth: 100 },
    { id: "role", label: "Role", minWidth: 50 },
  ];

  const closeCard = () => {
    axios
      .get(process.env.server_base + "/api/v1/admin/user/getallusers", {
        withCredentials: true,
      })
      .then((response) => {
        setUsersData(response.data);
        setUsers(
          response.data.map((user) => {
            return {
              name: user.firstName + " " + user.lastName,
              email: user.email,
              active:
                user.subscription !== null
                  ? user.subscription.active.toString()
                  : "false",
              autoRenew:
                user.subscription !== null
                  ? user.subscription.autoRenew.toString()
                  : "false",
              endDate:
                user.subscription !== null
                  ? formatDate(user.subscription.endDate)
                  : "NA",
              role: user.role,
            };
          })
        );
        setUserCard({ opened: false, user: null });
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (e, index) => {
    e.preventDefault();
    setUserCard({ opened: true, user: usersData[index], closeCard: closeCard });
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const timestamp = new Date(date).toLocaleDateString(undefined, options);

    return timestamp;
  };
  useEffect(() => {
    axios
      .get(process.env.server_base + "/api/v1/admin/user/getallusers", {
        withCredentials: true,
      })
      .then((response) => {
        setUsersData(response.data);

        setUsers(
          response.data.map((user) => {
            return {
              name: user.firstName + " " + user.lastName,
              email: user.email,
              active:
                user.subscription !== null
                  ? user.subscription.active.toString()
                  : "false",
              autoRenew:
                user.subscription !== null
                  ? user.subscription.autoRenew.toString()
                  : "false",
              endDate:
                user.subscription !== null
                  ? formatDate(user.subscription.endDate)
                  : "NA",
              role: user.role,
            };
          })
        );
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  if (users === null) return;

  return (
    <div className="admin-dashboard">
      <UserCard data={userCard} />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "auto" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      onClick={(e) => handleClick(e, index)}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
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
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default UserList;
