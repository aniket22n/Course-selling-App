import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./../config.ts";
import "../style/createCourse.css";
import { CourseParams, CourseType } from "@aniket22n/common/dist/zod";

//Main Function
export function CreateCourse() {
  const redirect = useNavigate();

  //Initial State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [published, setPublish] = useState("");
  //Function to hit admin/login Route on backend servers
  async function createCourse() {
    var val: boolean = published == "1" ? true : false;
    const requestBody = CourseParams.safeParse({
      title: title,
      description: description,
      price: price,
      image: image,
      published: val,
    });
    if (requestBody.success) {
      const body: CourseType = requestBody.data;
      await axios.post(`${BASE_URL}/admin/createCourse`, body, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      redirect("/admin/courses");
    } else return alert("Invalid Details...");
  }

  //Login Component
  return (
    <div className="main-div-addcourse">
      <div className="main-container-addcourse">
        <Card className="sub-container-addcourse">
          <Typography className="title-addcourse" variant="h4">
            New Course
          </Typography>

          <TextField
            fullWidth
            type="text"
            variant="outlined"
            label="Title"
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            fullWidth
            type="text"
            variant="outlined"
            label="Description"
            onChange={(event) => setDescription(event.target.value)}
          />
          <TextField
            fullWidth
            type="url"
            variant="outlined"
            label="Image URL"
            onChange={(event) => setImage(event.target.value)}
          />
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "flex-start",
            }}
          >
            <TextField
              type="number"
              variant="outlined"
              label="Price"
              onChange={(event) => setPrice(Number(event.target.value))}
            />
            <FormControl sx={{ width: "240px" }}>
              <InputLabel>Publish</InputLabel>
              <Select
                value={published}
                onChange={(event) => setPublish(event.target.value)}
              >
                <MenuItem value={1}>Yes</MenuItem>
                <MenuItem value={0}>No</MenuItem>
              </Select>
            </FormControl>
          </div>

          <Button
            className="button-addcourse"
            variant="contained"
            onClick={createCourse}
          >
            Launch
          </Button>
        </Card>
      </div>
    </div>
  );
}
