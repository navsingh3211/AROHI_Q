import bcrypt from 'bcrypt';
import User from '../../models/users.js';
import {apiresponse} from '../../utils/commonResponse.util.js';
import MESSAGES from '../../utils/commonMessage.util.js';
import {generateToken} from '../../utils/jwt.util.js'
/*
    ==>user registration api (STUDENT,ADMIN,SUPER-ADMIN)
    ==>steps:
        1.)existing user check
        2.)Hashed password
        3.)User creation
        4.)Token generation
*/
export const register = async (req, res,next)=>{
    try{
        let body=req.body;
        
        const isUserExit = await User.findOne({mobile:body.mobile});
        if(isUserExit){
            return res.json(await commonResponse.response(false, MESSAGES.USER_ALREADY_EXIT,401));
        }
        let hashedPassword = await bcrypt.hash(body.password, 10);
        const bodyData = {
            username:body.username,
            password:hashedPassword,
            mobile:body.mobile,
            optionalMob:body.optionalMob,
            name:body.name,
            school:body.school,
            userType:body.userType,
        };

        const result = await User.create(bodyData);
        const jwtToken = generateToken({
            id: account.id,
            userTypeId: account.userTypeId,
            userTypes: getUserTypes.userType,
            email: account.email,
          });
        console.log(result);
        process.exit(0);
    }catch(error){
        console.log(error);
        return res.status(500).json(await apiresponse(false, MESSAGES.SOMETHING_WRONG));
    }
}

