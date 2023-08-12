import { useRecoilValue, useSetRecoilState } from "recoil";
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
import { atomCourse } from "../store/atoms/course";
import { useState } from "react";
import { z } from "zod";
import axios from "axios";
import { BASE_URL } from "../config";
import "../style/editCourse.css";

//Backend Validation with zod
const CourseData = z.object({
  title: z.string().min(1).max(20),
  description: z.string().min(1).max(50),
  price: z.number().min(0),
  image: z.string().min(1),
  published: z.boolean(),
});
type CourseType = z.infer<typeof CourseData>;

export function EditCourse() {
  return (
    <div className="edit-main-div">
      <Update />
      <UpdateResult />
    </div>
  );
}

function Update() {
  const courseInfo = useRecoilValue(atomCourse);
  const setCourse = useSetRecoilState(atomCourse);
  const course = courseInfo.course;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [publish, setPublish] = useState("");

  async function handleUpdate() {
    var val: boolean = false;
    if (publish == "1") val = true;

    const requestBody = CourseData.safeParse({
      title: title || course.title,
      description: description || course.description,
      price: price || course.price,
      image: image || course.image,
      published: val,
    });
    if (requestBody.success) {
      const body: CourseType = requestBody.data;
      const response = await axios.put(
        `${BASE_URL}/admin/updateCourse/${course._id}`,
        body,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.data) {
        alert(response.data.message);
        setCourse({
          isLoading: false,
          course: response.data.updatedCourse,
        });
      }
    } else alert(requestBody.error);
  }
  return (
    <div
      className="main-div-addcourse update-course"
      style={{ display: "flex", alignItems: "center" }}
    >
      <div className="main-container-addcourse">
        <Card className="sub-container-addcourse">
          <Typography className="title-addcourse" variant="h4">
            Edit Course
          </Typography>

          <TextField
            fullWidth
            defaultValue={course.title}
            type="text"
            variant="outlined"
            label="Title"
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            fullWidth
            defaultValue={course.description}
            type="text"
            variant="outlined"
            label="Description"
            onChange={(event) => setDescription(event.target.value)}
          />
          <TextField
            fullWidth
            defaultValue={course.image}
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
              defaultValue={course.price}
              type="number"
              variant="outlined"
              label="Price"
              onChange={(event) => setPrice(Number(event.target.value))}
            />
            <FormControl sx={{ width: "240px" }}>
              <InputLabel>Publish</InputLabel>
              <Select
                value={publish}
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
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Card>
      </div>
    </div>
  );
}

function UpdateResult() {
  const courseInfo = useRecoilValue(atomCourse);
  const course = courseInfo.course;
  return (
    <div className="edit-result updatedcourse">
      <Card className="course-card" variant="elevation">
        <img className="card-image" alt="course-image" src={course.image} />
        <Typography className="card-title">{course.title}</Typography>
        <Typography className="card-description">
          {course.description}
        </Typography>

        <Button variant="contained" color="warning" className="card-button">
          BUY
        </Button>
      </Card>
    </div>
  );
}
