import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the fetchCourses action
export const fetchCourses = createAsyncThunk(
  "course/fetchCourses",
  async () => {
    // Make the API request
    const response = await fetch(
      "https://65c3bf724ac991e8059afe11.mockapi.io/api/v1/courses/list"
    );
    const data = await response.json();
    return data;
  }
);

export const fetchCourse = createAsyncThunk(
  "course/fetchCourse",
  async (courseId) => {
    // Make the API request
    const response = await fetch(
      `https://65c3bf724ac991e8059afe11.mockapi.io/api/v1/courses/list/${courseId}`
    );
    const data = await response.json();

    // Return the data
    return data;
  }
);

export const enrollStudent = createAsyncThunk(
  "course/enrollStudent",
  async (courseId) => {
    // Make the API request
    const response = await fetch(
      `https://65c3bf724ac991e8059afe11.mockapi.io/api/v1/courses/list/${courseId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enrollmentStatus: "Enrolled",
        }),
      }
    );
    const data = await response.json();

    // Return the data
    return data;
  }
);

export const completeCourse = createAsyncThunk(
  "course/completeCourse",
  async (courseId) => {
    // Make the API request
    const response = await fetch(
      `https://65c3bf724ac991e8059afe11.mockapi.io/api/v1/courses/list/${courseId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: true,
          progress: 100,
        }),
      }
    );
    const data = await response.json();

    // Return the data
    return data;
  }
);

export const likeCourseAsync = createAsyncThunk(
  "course/likeCourseAsync",
  async (courseDetails) => {
    // Make the API request
    const response = await fetch(
      `https://65c3bf724ac991e8059afe11.mockapi.io/api/v1/courses/list/${courseDetails.courseId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: courseDetails.courseLikes,
          liked: courseDetails.courseLiked,
        }),
      }
    );
    const data = await response.json();

    // Return the data
    return data;
  }
);

// Define the course slice
const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
    enrolledCourses: [],
    likedCourses: [],
    selectedCourse: null,
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle the fetchCourses.pending action
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = "idle";
        state.error = null;
        state.courses = action.payload;
        state.enrolledCourses = action.payload.filter(
          (item) => item.enrollmentStatus === "Enrolled"
        );
      })
      .addCase(fetchCourses.pending, (state, action) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.error = action.error;
        state.loading = "idle";
      })
      .addCase(fetchCourse.fulfilled, (state, action) => {
        state.loading = "idle";
        state.selectedCourse = action.payload;
      })
      .addCase(fetchCourse.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchCourse.rejected, (state, action) => {
        state.error = action.error;
        state.loading = "idle";
      })
      .addCase(enrollStudent.fulfilled, (state, action) => {
        state.loading = "idle";
        state.enrolledCourses.push(action.payload);
        state.selectedCourse = action.payload;
      })
      .addCase(enrollStudent.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(enrollStudent.rejected, (state, action) => {
        state.error = action.error;
        state.loading = "idle";
      })
      .addCase(completeCourse.fulfilled, (state, action) => {
        state.loading = "idle";
        state.enrolledCourses = state.enrolledCourses.map((course) => {
          if (course.id === action.payload.id) {
            return {
              ...course,
              completed: action.payload.completed,
              progress: action.payload.progress,
            };
          }
          return course;
        });
      })
      .addCase(completeCourse.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(completeCourse.rejected, (state, action) => {
        state.error = action.error;
        state.loading = "idle";
      })
      .addCase(likeCourseAsync.fulfilled, (state, action) => {
        state.likedCourses.push(action.payload);
      })
      .addCase(likeCourseAsync.pending, (state, action) => {})
      .addCase(likeCourseAsync.rejected, (state, action) => {});
  },
});

// Export the course reducer
export default courseSlice.reducer;
