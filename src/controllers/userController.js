import User from "../models/userModel.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

const filterObject = (obj, allowedList) =>{
  let newObj = {};
  Object.keys(obj).forEach((key)=>{
    if (allowedList.includes(key)){
      newObj[key] = obj[key]
    }
  })
  return newObj;
}
export const getAllUsers = async(req, res) => {
    const users = await User.find();
    if(!users){
      return next(new AppError('No Users found'),404);
    }
    res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
    });
};
export const getUser = catchAsync( async(req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(!user){
      return next(new AppError('No Tour found with the given ID'),404);
    }
      res.status(200).json({
        status: 'success',
        results: TourVal,
        data: TourVal,
      });
  
});

export const updateme = catchAsync(async (req, res, next)  => {

  //1. Create an error if the user tries to invoke this API for updating the password
    if(req.body.password || req.body.passwordConfirm) {
      return next(new AppError('This route is not for password updates please use updatepassword API', 400));
    }
  //2. Update the document
    const user = await User.findByIdAndUpdate(req.user.id, filterObject(req.body, ['name', 'email']), {
      new: true,
      runValidators:true
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Updated Successflly',
      user
    })

});

export const deleteMe = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndUpdate(req.user.id,{active:false});
  res.send(204).json({
    status: 'success',
    message: "you account deleted successfully"
  })
});
export const createUser = (req, res) => {};
export const updateUser = (req, res)  => {};
export const deleteUser = (req, res) => {};