import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
  Box,
  ListItemIcon,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { enrollStudent, fetchCourse } from "../store/courseListSlice";
import {
  AccessTime,
  CalendarMonthOutlined,
  LocationCityOutlined,
  PeopleOutlined,
} from "@mui/icons-material";

const CourseDetail = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const course = useSelector((state) => state?.course?.selectedCourse);
  const loading = useSelector((state) => state?.course?.loading);

  useEffect(() => {
    // Fetch course data from an API or a mock data source based on the course ID
    dispatch(fetchCourse(courseId));
  }, [courseId, dispatch]);

  const handleEnrollment = () => {
    dispatch(enrollStudent(courseId));
  };

  if (!course || loading === "pending") {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4} sx={{ py: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardMedia
              component="img"
              height="250"
              image={course.thumbnail}
              alt="Course media"
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Typography variant="h4" component="h1" gutterBottom>
              {course.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {course.description}
            </Typography>
            <Stack spacing={1}>
              <Typography variant="caption" component="h3" gutterBottom>
                <strong>Instructor Name: </strong>
                {course.instructor}
              </Typography>
              <Typography
                variant="caption"
                component="h3"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <strong>Duration: </strong>
                {course.duration}{" "}
                <AccessTime sx={{ fontSize: "14px" }} color="primary" />
              </Typography>
              <Typography
                variant="caption"
                component="h3"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <strong>Schedule: </strong>
                {course.schedule}{" "}
                <CalendarMonthOutlined
                  sx={{ fontSize: "14px" }}
                  color="primary"
                />
              </Typography>
              <Typography
                variant="caption"
                component="h3"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <strong>Location: </strong>
                {course.location}{" "}
                <LocationCityOutlined
                  sx={{ fontSize: "14px" }}
                  color="primary"
                />
              </Typography>
              <Typography variant="caption" component="h3" gutterBottom>
                <strong>Syllabus: </strong>
                <List sx={{ paddingLeft: "10px" }}>
                  {course?.syllabus.map((item) => (
                    <Box key={item.week}>
                      <ListItem disablePadding>
                        <ListItemText
                          primary={item.week + ".  " + item.topic}
                        />
                      </ListItem>
                    </Box>
                  ))}
                </List>
              </Typography>
              <Typography
                variant="caption"
                component="h3"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <strong>Students Enrolled: </strong>
                {course.students.length}{" "}
                <PeopleOutlined sx={{ fontSize: "14px" }} color="primary" />
              </Typography>
            </Stack>

            <Button
              variant="contained"
              color={course.enrollmentStatus === "Open" ? "primary" : "success"}
              size="large"
              fullWidth
              onClick={handleEnrollment}
            >
              {course.enrollmentStatus === "Open" ? "Enroll Now" : "Enrolled"}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseDetail;
