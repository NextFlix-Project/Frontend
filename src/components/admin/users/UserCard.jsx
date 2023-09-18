import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

import { InputLabel } from "@mui/material";

const UserCard = (props) => {
  if (props.data.user === null) return;

  const [email, setEmail] = useState(props.data.user.email);
  const [role, setRole] = useState(props.data.user.role);
  const [firstname, setFirstName] = useState(props.data.user.firstName);
  const [lastname, setLastName] = useState(props.data.user.lastName);

  const handleFirstNameChange = (e) => {
    e.preventDefault();
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    e.preventDefault();
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleRoleChange = (e) => {
    e.preventDefault();
    setRole(e.target.value);
  };

  const handleClose = () => {
    props.data.closeCard();
  };

  const handleSave = async () => {
    axios
      .put(
        process.env.server_base + "/api/v1/admin/user/update",
        {
          firstName: firstname,
          lastName: lastname,
          email: email,
          role: role,
        },
        { withCredentials: true }
      )
      .then((response) => {
        handleClose();
      })
      .catch((error) => {
        handleClose();
      });
  };

  const handleDelete = async () => {
    axios
      .post(
        process.env.server_base + "/api/v1/admin/user/deleteuser",
        {
          firstName: firstname,
          lastName: lastname,
          email: email,
          role: role,
        },
        { withCredentials: true }
      )
      .then((response) => {
        handleClose();
      })
      .catch((error) => {
        handleClose();
      });
  };

  return (
    <div>
      <Dialog open={props.data.opened} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            value={firstname}
            onChange={handleFirstNameChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            value={lastname}
            onChange={handleLastNameChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            spellCheck={false}
            fullWidth
            variant="standard"
            value={email}
            onChange={handleEmailChange}
          />

          <InputLabel sx={{ marginTop: "25px" }}> Role </InputLabel>
          <Select
            sx={{ marginTop: "5px" }}
            value={role}
            label="Role"
            onChange={handleRoleChange}
          >
            <MenuItem value={"USER"}>USER</MenuItem>
            <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserCard;
