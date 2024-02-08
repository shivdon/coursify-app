import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../store/courseListSlice";
import Grid from "@mui/material/Grid";
import CourseCard from "./CourseCard";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const CourseList = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state?.course?.courses);
  const loading = useSelector((state) => state?.course?.loading);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch courses from an API or a mock data source
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCourses = courses?.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return loading === "pending" ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <Typography
        gutterBottom
        variant="h2"
        component="div"
        sx={{ textAlign: "center" }}
      >
        Our Courses
      </Typography>
      <Paper
        component="form"
        sx={{
          p: "2px 8px",
          display: "flex",
          alignItems: "center",
          width: 300,
          margin: "40px 0px",
        }}
      >
        <InputBase
          sx={{ flex: 1 }}
          placeholder="Search Courses..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Grid container spacing={5}>
        {filteredCourses?.map((course) => (
          <Grid key={course.id} item xs={12} md={4} lg={3}>
            <CourseCard
              id={course.id}
              title={course.name}
              description={course.description}
              image={course.thumbnail}
              instructor={course.instructor}
              likes={course.likes}
              liked={course.liked}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CourseList;
