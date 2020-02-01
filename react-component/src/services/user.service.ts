import axios from 'axios';

import {User, UserResults} from '../../../common/models/index';

export const getUser = async ():Promise<User> => {
    let userResponse;
    
    try{
        userResponse = await axios.get<UserResults>('https://randomuser.me/api/');
        const user:User = userResponse.data.results[0];
        return user;
    }
    catch(err){
        throw err;
    }

}