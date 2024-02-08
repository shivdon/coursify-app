import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { likeCourseAsync } from "../store/courseListSlice";

export default function CourseCard({
  id,
  image,
  title,
  description,
  instructor,
  likes,
  liked,
}) {
  const dispatch = useDispatch();
  const noOfLikes = likes;
  const courseLiked = liked;
  const [likeCourse, setLikeCourse] = React.useState(courseLiked);
  const [courseLikes, setCourseLikes] = React.useState(noOfLikes);

  const handleLike = () => {
    setLikeCourse((state) => {
      if (!state) {
        setCourseLikes((state) => state + 1);
      } else {
        setCourseLikes((state) => state - 1);
      }
      return !state;
    });
    dispatch(
      likeCourseAsync({
        courseId: id,
        courseLikes: !likeCourse ? courseLikes + 1 : courseLikes - 1,
        courseLiked: !likeCourse,
      })
    );
  };

  return (
    <Card sx={{ maxWidth: 345, minHeight: 400, position: "relative" }}>
      <CardMedia sx={{ height: 140 }} image={image} title={title} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ minHeight: 80 }}
        >
          {title}
        </Typography>
        <Typography
          gutterBottom
          variant="body1"
          component="div"
          color="text.tertiary"
        >
          by {instructor}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          position: "absolute",
          bottom: "5px",
        }}
      >
        <Button href={`/course/${id}`} variant="outlined" size="small">
          Learn More
        </Button>
        <IconButton aria-label="delete" size="small" onClick={handleLike}>
          {likeCourse ? (
            <Favorite fontSize="inherit" sx={{ marginRight: "4px" }} />
          ) : (
            <FavoriteBorderOutlined
              fontSize="inherit"
              sx={{ marginRight: "4px" }}
            />
          )}
          {`${courseLikes}`}
        </IconButton>
      </CardActions>
    </Card>
  );
}
