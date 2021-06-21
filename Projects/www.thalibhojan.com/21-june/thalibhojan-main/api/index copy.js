import axios from "axios";

const url = "http://localhost:5000/thaliOrder/";
// const thaliOrderURL = "http://localhost:5000/thaliOrder";
const feedbackURL = "http://localhost:5000/feedback";

export const serverStatus = () => {
  axios.get(url).catch(function (error) {
    if (error.response) {
      return error.response;
    } else if (error.request) {
      return error.request;
    } else {
      return error.message;
    }
  });
};

console.log(`${url}createThaliOrder`)
// export const fetchPosts = () => axios.get(url);
export const getThaliOrders = () => axios.get(url)
export const getOrders = (uid) => axios.post(`${url}getOrders/${uid}`)
export const createThaliOrder = (createThaliOrder) => axios.post(`${url}createThaliOrder`, createThaliOrder);
export const createFeedback = (createFeedback) => axios.post(feedbackURL, createFeedback);
