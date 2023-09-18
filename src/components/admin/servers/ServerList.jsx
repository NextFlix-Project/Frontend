import * as React from "react";
import { useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
 
const ServerList = () => {
  const [servers, setServers] = useState(null);

  const [page, setPage] = useState(0);

  const columns = [
    { id: "url", label: "URL", minWidth: 170 },
    { id: "port", label: "Port", minWidth: 170 },
    { id: "failedHeartbeat", label: "Failed Heartbeats", minWidth: 200 },
    { id: "serverType", label: "Server Type", minWidth: 50 },
  ];
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const handleClick = (e, index) => {
    e.preventDefault();
  };

  useEffect(() => {
    axios
      .get(process.env.server_base + "/api/v1/server/getallservers", {
        withCredentials: true,
      })
      .then((response) => {
        setServers(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  if (servers === null) return;
  return ( 
    <div className="admin-dashboard">
     <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 'auto' }}>
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
            {servers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const originalIndex = page * rowsPerPage + index;
                return (
                  <TableRow
                    onClick={(e) => handleClick(e, originalIndex)}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                  >
                    {columns.map((column) => {
                      const value = row[column.id].toString();
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
        count={servers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  </div>
  );
};

export default ServerList;
