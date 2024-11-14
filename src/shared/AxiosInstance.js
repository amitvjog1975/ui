import Axios from 'axios';


//const getBaseURL = () => {
//    //Debugging
//    return "http://localhost:5149/api/";
//    //Live
//    //return "https://api.resumecareer.in/api/";
//    //console.log(' BaseUrl ' + `${window.location.origin}`);
//    //return `${window.location.origin}`
//    //return `${process.env.REACT_APP_API_URL}api/`
//}


const axiosInstance = Axios.create({
    baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
    headers: {
        'Accept': 'application/json',
    },
    timeout: 300000,
});

export default axiosInstance;  