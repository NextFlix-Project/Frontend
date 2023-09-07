import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const MovieCard = (props) => {
  if (props.data.movie === null) return;

  const [id, setId] = useState(props.data.movie.id);
  const [title, setTitle] = useState(props.data.movie.title);
  const [description, setDescription] = useState(props.data.movie.description);
  const [url, setURL] = useState(props.data.movie.url);
  const [boxArtUrl, setBoxArtURL] = useState(props.data.movie.boxArtUrl);
  const [active, setActive] = useState(props.data.movie.active);
  const [releaseDate, setReleaseDate] = useState(props.data.movie.releaseDate);

  const handleTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const handleURLChange = (e) => {
    e.preventDefault();
    setURL(e.target.value);
  };

  const handleBoxArtURLChange = (e) => {
    e.preventDefault();
    setBoxArtURL(e.target.value);
  };

  const handleActiveChange = (e) => {
    e.preventDefault();
    setActive(e.target.checked);
  };

  const handleReleaseDateChange = (e) => {
    const date = new Date(e);
    setReleaseDate(dayjs(date));
  };

  const handleClose = () => {
    props.data.closeCard();
  };

  const handleSave = async () => {
    axios
      .put(
        "http://127.0.0.1:8080/api/v1/admin/movie/updatemovie",
        {
          id: id,
          title: title,
          description: description,
          url: url,
          boxArtUrl: boxArtUrl,
          active: active,
          releaseDate: releaseDate,
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
        "http://127.0.0.1:8080/api/v1/admin/movie/deletemovie",
        {
          id: id,
          title: title,
          description: description,
          url: url,
          boxArtUrl: boxArtUrl,
          active: active,
          releaseDate: releaseDate,
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
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={handleTitleChange}
          />

          <TextField
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={handleDescriptionChange}
          />

          <TextField
            autoFocus
            margin="dense"
            label="URL"
            type="text"
            spellCheck={false}
            fullWidth
            variant="standard"
            value={url}
            onChange={handleURLChange}
          />

          <TextField
            autoFocus
            margin="dense"
            label="Box Art URL"
            type="text"
            spellCheck={false}
            fullWidth
            variant="standard"
            value={boxArtUrl}
            onChange={handleBoxArtURLChange}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              defaultValue={dayjs(releaseDate)}
              onChange={(newDate) => {
                handleReleaseDateChange(newDate);
              }}
            />
          </LocalizationProvider>

          <FormGroup>
            <FormControlLabel
              control={
                <Switch defaultChecked={active} onChange={handleActiveChange} />
              }
              label="Active"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MovieCard;
