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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import ToastAlert from "../../toastalert/ToastAlert";

const AddMovieCard = (props) => {
  if (props.data.movie === null) return;

  const [id, setId] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [url, setURL] = useState();
  const [boxArtUrl, setBoxArtURL] = useState();
  const [active, setActive] = useState();
  const [releaseDate, setReleaseDate] = useState();
  const [video, setVideo] = useState();
  const [image, setImage] = useState();
  const [toastAlert, setToastAlert] = useState({
    opened: false,
    message: null,
  });

  const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;

  const closeToast = () => {
    setToastAlert({ opened: false, message: null });
  };

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
        "http://127.0.0.1:8080/api/v1/admin/movie/addmovie",
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
        setToastAlert({ opened: true, message: "There was an error saving the movie.  Error: " + error.message });
    });
  };

  const uploadMovie = async (e) => {
    e.preventDefault();

    const mimeType = e.target.files[0].type;
    const videoType = mimeType.split("/")[0];
    if (videoType === "video") {
      setVideo(e.target.files[0]);
      console.log(e);
    } else {
      setToastAlert({ opened: true, message: "File is not a video" });
    }
  };
  const uploadImage = async (e) => {
    e.preventDefault();
    const mimeType = e.target.files[0].type;
    const videoType = mimeType.split("/")[0];
    if (videoType === "image") {
      setImage(e.target.files[0]);
    } else {
      setToastAlert({ opened: true, message: "File is not an image" });
    }
  };

  return (
    <div>
      <ToastAlert
        opened={toastAlert.opened}
        message={toastAlert.message}
        closeToast={closeToast}
      />
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15px",
            }}
          >
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              href="#file-upload"
              sx={{ width: "48%" }}
            >
              Movie
              <VisuallyHiddenInput type="file" onChange={uploadMovie} />
            </Button>

            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              href="#file-upload"
              sx={{ width: "48%" }}
            >
              Box Art Image
              <VisuallyHiddenInput type="file" onChange={uploadImage} />
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%" }}
                defaultValue={dayjs(releaseDate)}
                onChange={(newDate) => {
                  handleReleaseDateChange(newDate);
                }}
              />
            </LocalizationProvider>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "25px",
            }}
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={active}
                    onChange={handleActiveChange}
                  />
                }
                label="Active"
              />
            </FormGroup>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddMovieCard;
