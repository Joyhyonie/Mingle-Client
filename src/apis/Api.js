import axios from 'axios';

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const DOMAIN = `http://${SERVER_IP}:${SERVER_PORT}`; 

export const request = async (method, url, headers, data) => {
    
    return await axios({
        method,
        url : `${DOMAIN}${url}`,
        headers,
        data
    })
    .then(res => res.data)
    .catch(error => console.log(error));

}