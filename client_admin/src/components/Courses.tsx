import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { z } from "zod"; // Import zod module
import { Button, Card, Typography } from "@mui/material";
import "../style/courses.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userUsername } from "../store/selectors/user";
import { useNavigate } from "react-router-dom";
import { atomCourse } from "../store/atoms/course";
import { CourseParams } from "@aniket22n/common/dist/zod";

// Define your validation schema and type
const CourseInput = CourseParams.extend({
  _id: z.string(),
});
type CourseType = z.infer<typeof CourseInput>;

export function Courses() {
  const redirect = useNavigate();
  const loggedin = useRecoilValue(userUsername);
  const setCourse = useSetRecoilState(atomCourse);
  const [courses, setCourses] = useState<CourseType[]>([]);
  async function getCourses() {
    try {
      const headers = {
        authorization: localStorage.getItem("token"),
      };
      const response = await axios.get(`${BASE_URL}/admin/courses`, {
        headers,
      });
      if (response.data.courses) {
        setCourses(response.data.courses);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }
  useEffect(() => {
    getCourses();
  }, []);

  if (courses.length == 0)
    return (
      <div className="course-cards">
        <h1>Loading....</h1>
      </div>
    );

  return (
    <div className="course-cards">
      {courses.map((course: CourseType) => (
        <Card className="course-card" variant="elevation">
          <img className="card-image" alt="course-image" src={course.image} />
          <Typography className="card-title">{course.title}</Typography>
          <Typography className="card-description">
            {course.description}
          </Typography>
          {loggedin != "" && (
            <Button
              variant="contained"
              color="warning"
              className="card-button"
              onClick={() => {
                setCourse({
                  isLoading: false,
                  course: course,
                });
                redirect(`/admin/editcourse/${course._id}`);
              }}
            >
              EDIT
            </Button>
          )}
        </Card>
      ))}
    </div>
  );
}
