import React, { useEffect, useState } from 'react';
import { userService } from '../../services';
import UserInformation from '../../components/UserInformation';

const ProfileHome = () => {
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        userService.getUserInformation().then(result => {
            if(result != null && result.data != null) {
                setUserInfo(result.data);
            }   
        });
    },[])

    return (
        <div>
            <UserInformation userInfo={userInfo} />
        </div>
    );
}

export default ProfileHome;