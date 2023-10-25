import bcrypt from 'bcrypt';
import User from '../../models/users.js';
import {apiresponse,authenticationResponse} from '../../utils/commonResponse.util.js';
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
        
        const isUserExit = await User.findOne({mobile:body.mobile,status:true});
        if(isUserExit){
            return res.json(await apiresponse(false, MESSAGES.USER_ALREADY_EXIT,401));
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

        const account = await User.create(bodyData);
        const jwtToken = generateToken({
            id: account._id,
            userType: account.userType,
            mobile: account.mobile
        });
        return res.send(
            await authenticationResponse(true, MESSAGES.USER_SIGNUP_COMPLETE, {}, {
              accessToken: jwtToken,
              userName: account.name ? account.name : "",
              userId: account._id,
              userType:account.userType
            })
        );
    }catch(error){
        console.log(error);
        return res.status(500).json(await apiresponse(false, MESSAGES.SOMETHING_WRONG));
    }
}

export const login = async (req, res,next)=>{
    try{
        let body=req.body;
        
        const isUserExit = await User.findOne({username:body.username,mobile:body.mobile,status:true});
        if(!isUserExit){
            return res.json(await apiresponse(false, MESSAGES.NO_USER_FOUND,401));
        }
    
        let matchedPassword = await bcrypt.compare(body.password, isUserExit.password);
        if(!matchedPassword){
            return res.json(await authenticationResponse(false, MESSAGES.INVALID_CRED, {}));
        }
        const jwtToken = generateToken({
            id: isUserExit._id,
            userType: isUserExit.userType,
            mobile: isUserExit.mobile
        });
        return res.send(
            await authenticationResponse(true, MESSAGES.LOGIN_SUCCESS, {}, {
              accessToken: jwtToken,
              userName: isUserExit.name ? isUserExit.name : "",
              userId: isUserExit._id,
              userType:isUserExit.userType
            })
        );
    }catch(error){
        console.log(error);
        return res.status(500).json(await apiresponse(false, MESSAGES.SOMETHING_WRONG));
    }
}

export const forgetPassword = async (req, res,next)=>{
    try{
        let body = req.body;
        const isUserExit = await User.findOne({mobile:body.mobile,userType:body.userType,status:true});
        if(!isUserExit){
            return res.json(await apiresponse(false, MESSAGES.NO_USER_FOUND,401));
        }
        const filterData = {
            mobile:body.mobile,
            userType:body.userType,
            status:true
        }
        const updatedata = {
            username:body.username,
            password:body.password
        };
        const updatedResult = await User.updateOne(filterData,updatedata);
        // console.log(updatedResult,'updatedResult');
        if (updatedResult.modifiedCount > 0) {
            const jwtToken = generateToken({
                id: isUserExit._id,
                userType: isUserExit.userType,
                mobile: isUserExit.mobile
            });
            return res.send(
                await authenticationResponse(true, MESSAGES.DATA_UPDATED, {}, {
                  accessToken: jwtToken,
                  userName: isUserExit.name ? isUserExit.name : "",
                  userId: isUserExit._id,
                  userType:isUserExit.userType
                })
            );
        } else {
            return res.json(await apiresponse(false, MESSAGES.DATA_NOT_UPDATED,401));
        }
        
    }catch(error){
        console.log(error);
        return res.status(500).json(await apiresponse(false, MESSAGES.SOMETHING_WRONG));
    }
}

