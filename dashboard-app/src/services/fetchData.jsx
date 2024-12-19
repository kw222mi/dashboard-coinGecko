import axios from "axios";

const fetchData = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  ); // För teständamål
  return response.data;
};

export default fetchData;
