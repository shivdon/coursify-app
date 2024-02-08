import { configureStore } from "@reduxjs/toolkit";
import CourseListReducer from "./courseListSlice";

export default configureStore({
  reducer: {
    course: CourseListReducer,
  },
});
