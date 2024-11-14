import React, { useEffect } from 'react';
import { authService } from '../services';


const TestAPI = () => {

    let data = {
        userName: 'userName',
        password: 'password'
    }
    let result = authService.authenticateLogin(data);

    console.log(result);
    return <span>API Tested Successfully</span>
}

export default TestAPI;