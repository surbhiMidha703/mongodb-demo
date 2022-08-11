const mongoose = require("mongoose");

//first time the db is automatically created if that does not exists
// in real world app the connection string should come from config file
//return promise
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected to mongoDB"))
  .catch((e) => console.error("could not connect to DB", e));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// create a class
const Course = mongoose.model("Course", courseSchema);

//save is an async operation, result will be ready in futire , this returns a promise
const createCourse = async () => {
  //create instance (this object maps to a document in a mongoDB)
  const course = new Course({
    name: "angular course",
    author: "surbhi",
    tags: ["node", "frontend"],
    isPublished: true,
  });
  const result = await course.save();
  console.log("result=>", result);
};

// createCourse();

const getCourses = async () => {
  const courses = await Course.find({
    author: "surbhi",
    isPublished: true,
  })
    .limit(10) // only gets 10 documents
    .sort({ name: 1 }) //-1 for desc order
    .select({ name: 1, tags: 1 }); //selects only the props that we want to see
  console.log("courses=> ", courses);
};

// getCourses();

//approach 1 to update
const updateCourseApp1 = async (id) => {
  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = true;
  course.author = "another author";

  const result = await course.save();
  console.log("result=> ", result);
  //another approach to set the fields
  //   course.set({
  //     isPublished: true,
  //     author: "another author",
  //   });
};

// updateCourseApp1("62f334238bc43660fcf3a313");

//updating a doucmnet Approach 2.1

const updateCourseAppTwoOne = async (id) => {
  const result = await Course.updateOne(
    { _id: id },
    { $set: { author: "Surbhi", isPublished: false } }
  );

  console.log("result=> ", result);
};

// updateCourseAppTwoOne("62f334238bc43660fcf3a313");

// approach 2.2 - get the actual course, if new flag is not passed we get the old course not the updated one
const updateCourseAppTwoTwo = async (id) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      $set: { author: "Vipul", isPublished: true },
    },
    { new: true }
  );

  console.log("result=> ", result);
};

updateCourseAppTwoTwo("62f334238bc43660fcf3a313");
