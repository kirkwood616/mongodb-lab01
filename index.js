// MONGODB LAB 1 (PART 1 - QUERIES)

// 1. List all people. (200)
db.people.find();

// 2. Count all people. (200)
db.people.find().count();

// 3. List all people in Arizona. (6)
db.people.find({ state: "Arizona" });

// 4. List all males in Arizona. (2)
db.people.find({ gender: "Male", state: "Arizona" });

// 5. List all people in Arizona plus New Mexico. (8)
db.people.find({ state: { $in: ["Arizona", "New Mexico"] } });

// 6. List all people under age 40. (90)
db.people.find({ age: { $lt: 40 } });

// 7. List all females in Florida between the ages of 40 and 45 (inclusive). (4)
db.people.find({
  $and: [
    { age: { $gte: 40 } },
    { age: { $lte: 45 } },
    { state: "Florida" },
    { gender: "Female" },
  ],
});
///// EASIER EXAMPLE WAY
db.people.find({
  age: { $gte: 40, $lte: 45 },
  state: "Florida",
  gender: "Female",
});

// 8. List people whose first name starts with "H". (2)
db.people.find({ first_name: /^H/ });

// 9. List all people in Michigan, sorted by first name. (6)
db.people.find({ state: "Michigan" }).sort({ first_name: 1 });

// 10. List all people who live in Virginia or are named Virginia.
db.people.find({ $or: [{ state: "Virginia" }, { first_name: "Virginia" }] });

// 11. List the names of people under age 30. Only display their first and last name. (38)
db.people.find({ age: { $lt: 30 } }, { first_name: true, last_name: true });
// OR
db.people.find({ age: { $lt: 30 } }, { first_name: 1, last_name: 1 });

// 12. List all people in Montana. Display all information except age. (2)
db.people.find({ state: "Montana" }, { age: false });

// 13. List the email addresses of people with a ".edu" email. Only display the email. (12)
db.people.find({ email: /.edu$/ }, { email: true });
// OR
db.people.find({ email: /\.edu$/ }, { email: true });

// MONGODB LAB 1 (PART 2 - DATA MANIPULATION)

// 1. Add a person to the collection. You pick the data, but they should have an empty array for children.
db.people.insertOne({
  first_name: "Cody",
  last_name: "Milquetoast",
  email: "codymilquetoast@hotmail.com",
  gender: "Male",
  age: 27,
  state: "Georgia",
  children: [],
});

// 2. Add another person. They should have at least two children.
db.people.insertOne({
  first_name: "Skeeter",
  last_name: "Redman",
  email: "skeeter@yahoo.com",
  gender: "Male",
  age: 32,
  state: "Alabama",
  children: [
    { name: "Bubba", age: 12 },
    { name: "Pauline", age: 7 },
  ],
});

// 3. Update one person named Clarence. He moved from North Dakota to South Dakota.
db.people.updateOne(
  { first_name: "Clarence" },
  { $set: { state: "South Dakota" } }
);

// 4. Update Rebecca Hayes. Remove her email address.
db.people.updateOne(
  { first_name: "Rebecca", last_name: "Hayes" },
  { $set: { email: null } }
);

// 5. Update everyone from Missouri. They all had a birthday today, so add one to their age. (expect 4 matches)
db.people.updateMany({ state: "Missouri" }, { $inc: { age: 1 } });

// 6. Jerry Baker has updated information. Replace with a new document:
// { first_name: "Jerry", last_name: "Baker-Mendez", email:
// "jerry@classic.ly", gender:"Male", age: 28, state: "Vermont",
// "children": [{name: "Alan", age: 18}, {name: "Jenny", age: 3}] }
db.people.replaceOne(
  { first_name: "Jerry", last_name: "Baker" },
  {
    first_name: "Jerry",
    last_name: "Baker-Mendez",
    email: "jerry@classic.ly",
    gender: "Male",
    age: 28,
    state: "Vermont",
    children: [
      { name: "Alan", age: 18 },
      { name: "Jenny", age: 3 },
    ],
  }
);

// 7. Delete Wanda Bowman.
db.people.deleteOne({ first_name: "Wanda", last_name: "Bowman" });

// 8. Delete everyone who does not have an email address specified. (expect 36 matches -maybe more depending what you added above)
db.people.deleteMany({ email: null });

// 9. Add several documents to a new submissions collection. Do it all in one command.
db.submissions.insertMany([
  {
    title: "The River Bend",
    upvotes: 10,
    downvotes: 2,
    artist: ObjectId("61f3fae030bbc92d8e11ceb6"),
  },
  {
    title: "Nine Lives",
    upvotes: 7,
    downvotes: 0,
    artist: ObjectId("61f3fae030bbc92d8e11cee4"),
  },
  {
    title: "Star Bright",
    upvotes: 19,
    downvotes: 3,
    artist: ObjectId("61f3fae030bbc92d8e11cf67"),
  },
  {
    title: "Why Like This?",
    upvotes: 1,
    downvotes: 5,
    artist: ObjectId("61f3fae030bbc92d8e11ceed"),
  },
  {
    title: "Non Sequitur",
    upvotes: 11,
    downvotes: 1,
    artist: ObjectId("61f3fae030bbc92d8e11ceb4"),
  },
]);

// 10. Add 2 upvotes for "The River Bend".
db.submissions.updateOne({ title: "The River Bend" }, { $inc: { upvotes: 2 } });

// 11. Add a field round2 = true to all submissions with at least 10 upvotes. (expect 3 matches)
db.submissions.updateMany(
  { upvotes: { $gte: 10 } },
  { $set: { round2: true } }
);
