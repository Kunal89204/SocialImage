const data = [
  {
    "_id": "6627bdd59aff9d226299b3c8",
    "totalLikes": 1
  },
  {
    "_id": "6623ae502c100d9a74e22925",
    "totalLikes": 1
  }
]


const desiredId = "6627bdd59aff9d226299b3c8"; // The _id you want to find

// Use the find() method to search for the object with the desired _id
const desiredObject = data.find(item => item._id === desiredId);

// Check if the desired object was found
if (desiredObject) {
  console.log("Desired object found:", desiredObject.totalLikes);
} else {
  console.log("Desired object not found.");
}


