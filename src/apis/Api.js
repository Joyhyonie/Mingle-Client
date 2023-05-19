import axios from 'axios';

const DOMAIN = 'http://localhost:8001';

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