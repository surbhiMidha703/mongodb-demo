const mongoose = require("mongoose");

//first time the db is automatically created if that does not exists
// in real world app the connection string should come from config file
//return promise
mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("connected to mongoDB"))
  .catch((e) => console.error("could not connect to DB", e));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
});

// create a class
const Course = mongoose.model("Course", courseSchema);

const getPublishedCourses = async () => {
  const courses = await Course.find({ isPublished: true, tags: "backend" })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
  console.log("courses => ", courses);
};

// getPublishedCourses();

const getPublishedFEBECourses = async () => {
  const courses = await Course.find({
    isPublished: true,
    tags: { $in: ["backend", "frontend"] },
  })
    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 });
  console.log("courses => ", courses);
};

// getPublishedFEBECourses();

const filterProductsByPriceAndTitle = async () => {
  const course = await Course.find({
    isPublished: true,
  }).or([{ name: /.*by.*/i }, { price: { $gte: 15 } }]);

  console.log(course);
};

filterProductsByPriceAndTitle();
