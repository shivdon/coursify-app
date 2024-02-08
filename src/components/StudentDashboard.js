import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  LinearProgress,
  styled,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { completeCourse, fetchCourses } from "../store/courseListSlice";
import { getDate } from "../helper";

const ProgressWrapper = styled(Box)({
  width: "100%",
  marginTop: "8px",
  padding: "40px",
});

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector((state) => state?.course.enrolledCourses);
  const loading = useSelector((state) => state?.course?.loading);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleMarkAsCompleted = (courseId) => {
    dispatch(completeCourse(courseId));
  };

  return loading === "pending" ? (
    <h2>Loading...</h2>
  ) : (
    <Box>
      <Typography variant="h4" gutterBottom>
        Enrolled Courses
      </Typography>
      <List>
        {enrolledCourses.map((course, index) => (
          <React.Fragment key={course.index}>
            <ListItem
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: { xs: "column", sm: "column", md: "row" },
              }}
            >
              <ListItemAvatar>
                <Avatar alt={course.name} src={course.thumbnail} />
              </ListItemAvatar>
              <ListItemText
                primary={course.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Instructor: {course.instructor}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textSecondary"
                    >
                      Due Date: {getDate()}
                    </Typography>
                  </React.Fragment>
                }
              />
              <ProgressWrapper>
                <LinearProgress variant="determinate" value={course.progress} />
                <span>{`  ${course.progress}%`}</span>
              </ProgressWrapper>
              <Button
                variant="contained"
                color={course?.completed ? "success" : "primary"}
                onClick={() => handleMarkAsCompleted(course.id)}
                disabled={course.completed}
              >
                {course?.completed ? "Completed" : "Mark as Completed"}
              </Button>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default StudentDashboard;
