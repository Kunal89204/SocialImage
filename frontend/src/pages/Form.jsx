import React, { useEffect, useState } from "react";
import axios from "axios"

const Form = () => {


  const [userId, setUserId] = useState(localStorage.getItem("userId"))
  const [fullname, setFullname] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/user/userinfoid/${userId}`)
      .then((response) => {
        setAge(response.data.age);
        setFacebook(response.data.socialMedia.facebook);
        setFullname(response.data.fullName);
        setBio(response.data.bio);
        setLocation(response.data.location);
        setWebsite(response.data.website);
        setTwitter(response.data.socialMedia.twitter);
        setLinkedin(response.data.socialMedia.linkedIn);
        setInstagram(response.data.socialMedia.instagram);
      })
      .catch((error) => {
        console.error('Error fetching user info:', error);
      });
  }, [userId]);

  const handleFile1 = (e) => {
    setFile1(e.target.files[0]);
  };
  const handleFile2 = (e) => {
    setFile2(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("fullname", fullname); // Append fullname with key "fullname"
    formData.append("age", age); // Append age with key "age"
    formData.append("bio", bio); // Append age with key "age"
    formData.append("location", location); // Append age with key "age"
    formData.append("website", website); // Append age with key "age"
    formData.append("facebook", facebook); // Append age with key "age"
    formData.append("twitter", twitter); // Append age with key "age"
    formData.append("linkedin", linkedin); // Append age with key "age"
    formData.append("instagram", instagram); // Append age with key "age"
    formData.append("file1", file1); // Append file1 with key "file1"
    formData.append("file2", file2); // Append file2 with key "file2"

    try {
      const response = await fetch(`http://localhost:3000/user/editprofile/${userId}`, {
        method: "POST",
        body: formData
      });
      const data = await response.json(); // Parsing response data if it's JSON
      console.log(data); // Logging the response data for verification
    } catch (error) {
      console.log(error);
    }

    
  };
  
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md flex flex-col space-y-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
          <label
            htmlFor="file1"
            className="block text-sm font-medium text-gray-700"
          >
            Profile
          </label>
          <input
            type="file"
            id="file1"
            className="mt-1 p-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            onChange={handleFile1}
          />
        </div>
        <div>
          <label
            htmlFor="file2"
            className="block text-sm font-medium text-gray-700"
          >
            Banner
          </label>
          <input
            type="file"
            id="file2"
            className="mt-1 p-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            onChange={handleFile2}
          />
        </div>
        <div>
          <label
            htmlFor="fullname"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            className="mt-1 p-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
          />
        </div>
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <input
            type="text"
            id="age"
            className="mt-1 p-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />
        </div>
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            bio
          </label>
          <input
            type="text"
            id="bio"
            className="mt-1 p-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            location
          </label>
          <input
            type="text"
            id="location"
            className="mt-1 p-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
        </div>
        <div>
          <label
            htmlFor="website"
            className="block text-sm font-medium text-gray-700"
          >
            website
          </label>
          <input
            type="text"
            id="website"
            className="mt-1 p-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            onChange={(e) => setWebsite(e.target.value)}
            value={website}
          />
        </div>
        <div>
          <label
            htmlFor="facebook"
            className="block text-sm font-medium text-gray-700"
          >
            facebook
          </label>
          <input
            type="text"
            id="facebook"
            className="mt-1 p-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            onChange={(e) => setFacebook(e.target.value)}
            value={facebook}
          />
        </div>
        <div>
          <label
            htmlFor="twitter"
            className="block text-sm font-medium text-gray-700"
          >
            twitter
          </label>
          <input
            type="text"
            id="twitter"
            className="mt-1 p-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            onChange={(e) => setTwitter(e.target.value)}
            value={twitter}
          />
        </div>
        <div>
          <label
            htmlFor="linkedin"
            className="block text-sm font-medium text-gray-700"
          >
            linkedin
          </label>
          <input
            type="text"
            id="linkedin"
            className="mt-1 p-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            onChange={(e) => setLinkedin(e.target.value)}
            value={linkedin}
          />
        </div>
        <div>
          <label
            htmlFor="instagram"
            className="block text-sm font-medium text-gray-700"
          >
            instagram
          </label>
          <input
            type="text"
            id="instagram"
            className="mt-1 p-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            onChange={(e) => setInstagram(e.target.value)}
            value={instagram}
          />
        </div>
        
        <button type="submit" className=" py-2 px-6 rounded-lg bg-green-500 text-white">Submit</button>
      </form>
    </div>
  );
};

export default Form;
