
const  User = require('../../../../models/user');
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

const userObj = {

  create: async (req, res) => {
    try {
     
      let user = await User.create(req.body);
      res.success({
        message:"User created",
        user,
      });
    } catch (error) {
        console.log('error',e)
      res.serverError(error)
    }
  },
  
  login: async (req, res) => {
    try {
      let existingUser = await User.findOne({ email: req.body.email });
      console.log('your found', existingUser);
      if (
        existingUser &&
        (await existingUser.isPasswordMatch(req.body.password))
      ) {
        existingUser.lastLoginAt = Date.now();
        await existingUser.save();

      let token=existingUser.genToken();

      return res.success({
        user:existingUser,
        token:token
      })
        
      } else {
        console.log('You dont pass the test');
       return res.badRequest("Invalid Credentials")
      }
    } catch (e) {
        return res.serverError({success:false,message:"INTERNAL SERVER ERROR"})
    }
  },




//   getUserProfile: async (req, res) => {
//     try {
//       let existingUser = await UserRepository.findUserByCondition(
//         {
//           _id: req.params.id,
//         },
//         UserHelper.getUserAttributes({
//           isMobileNumberVerified: 1,
//           isEmailVerified: 1,
//           token: 1,
//         })
//       );
//       if (existingUser) {
//         return res.success(UserHelper.modifyOutputData(existingUser));
//       } else {
//         const error = MESSAGES.apiErrorStrings.INVALID_REQUEST;
//         return res.preconditionFailed(error);
//       }
//     } catch (e) {
//       const errors = MESSAGES.apiErrorStrings.SERVER_ERROR;
//       res.serverError(errors);
//       throw new Error(e);
//     }
//   },

//   update: async (req, res) => {
//     try {
//       let user = await User.findByIdAndUpdate(req.params.id, req.body, {
//         upsert: true,
//         new: true,
//         rawResult: true,
//       });
//       if (!user) {
//         const errors = MESSAGES.apiErrorStrings.INVALID_REQUEST;
//         return res.preconditionFailed(errors);
//       }
//       return res.success({
//         message: MESSAGES.apiSuccessStrings.UPDATE('User profile has been'),
//       });
//     } catch (e) {
//       const errors = MESSAGES.apiErrorStrings.SERVER_ERROR;
//       res.serverError(errors);
//       console.error(e);
//     }
//   },

//   changeStatus: async (req, res) => {
//     try {
//       let existingUser = await User.findOne({ _id: req.params.id });
//       if (!existingUser) {
//         let errors = MESSAGES.apiSuccessStrings.DATA_NOT_EXISTS('The User');
//         return res.MESSAGES(errors);
//       }
//       existingUser.status =
//         existingUser.status === OPTIONS.defaultStatus.ACTIVE
//           ? OPTIONS.defaultStatus.INACTIVE
//           : OPTIONS.defaultStatus.ACTIVE;
//       await existingUser.save();
//       return res.success({
//         message: MESSAGES.apiSuccessStrings.STATUS_CHANGE('User'),
//       });
//     } catch (e) {
//       const errors = MESSAGES.apiErrorStrings.SERVER_ERROR;
//       res.serverError(errors);
//       throw new Error(e);
//     }
//   },

//   delete: async (req, res) => {
//     try {
//       let existingUser = await UserRepository.findUserByCondition(
//         {
//           _id: new mongoose.Types.ObjectId(req.params.id),
//           status: { $ne: OPTIONS.defaultStatus.DELETED },
//         },
//         {
//           _id: 1,
//           id: '$_id',
//           firstName: 1,
//           lastName: 1,
//           email: 1,
//           phone: 1,
//           gender: 1,
//           status: 1,
//           isDelete: 1,
//         }
//       );
//       if (existingUser) {
//         const { message } = await UserRepository.patchStatus(
//           existingUser,
//           OPTIONS.defaultStatus.DELETED
//         );
//         res.success({ message });
//       } else {
//         let errors = MESSAGES.apiSuccessStrings.DATA_NOT_EXISTS('User');
//         return res.unprocessableEntity(errors);
//       }
//     } catch (e) {
//       const errors = MESSAGES.apiErrorStrings.SERVER_ERROR;
//       res.serverError(errors);
//       throw new Error(e);
//     }
//   },

//   emailVerify: async (req, res) => {
//     try {
//       if (!req.params.token) {
//         let error = MESSAGES.apiErrorStrings.INVALID_REQUEST;
//         return res.preconditionFailed(error);
//       }

//       let query = {
//         status: OPTIONS.defaultStatus.ACTIVE,
//         verificationTokenExpireAt: req.params.token,
//         role: OPTIONS.usersRoles.USER,
//       };

//       let existingUser = await User.findOne(query);

//       if (!existingUser) {
//         const message = MESSAGES.apiErrorStrings.INVALID_TOKEN;
//         return res
//           .status(resCode.HTTP_BAD_REQUEST)
//           .json(
//             generateResponse(
//               resCode.HTTP_BAD_REQUEST,
//               message,
//               MESSAGES.errorTypes.INPUT_VALIDATION
//             )
//           );
//       } else {
//         let emailChange = false;
//         if (existingUser.isEmailVerified && existingUser.changeEmail) {
//           existingUser.email = existingUser.changeEmail;
//           existingUser.changeEmail = null;
//           emailChange = true;
//         }

//         existingUser.isEmailVerified = true;
//         existingUser.verificationTokenExpireAt = null;

//         await existingUser.save();

//         let message = MESSAGES.apiSuccessStrings.EMAIL_UPDATE;
//         if (!emailChange) {
//           message = MESSAGES.apiSuccessStrings.UPDATE('User profile');
//           await EmailRepository.sendWelcomeEmail(existingUser);
//         }
//         return res.success(existingUser);
//         return res
//           .status(resCode.HTTP_OK)
//           .json(generateResponse(resCode.HTTP_OK, { message }));
//       }
//     } catch (e) {
//       const errors = MESSAGES.apiErrorStrings.SERVER_ERROR;
//       res.serverError(errors);
//       throw new Error(e);
//     }
//   },
//   forgetPassword: async (req, res) => {
//     try {
//       if (!req.body.email) {
//         let error = MESSAGES.apiErrorStrings.INVALID_REQUEST;
//         return res.preconditionFailed(error);
//       }

//       let query = {
//         email: req.body.email,
//       };

//       let existingUser = await User.findOne(query);
//       if (!existingUser) {
//         const error = MESSAGES.apiErrorStrings.USER_DOES_NOT_EXIST;
//         return res.preconditionFailed(error);
//       } else {
//         existingUser.RESET_PIN = Math.floor(Math.random() * 899999 + 100000);
//         let user = await existingUser.save();
//         let data = {
//           name: `${user.firstName} ${user.lastName}`,
//           email: user.email,
//           url: `${process.env.REQ_URL}#/auth/change-pwd?sub=${user._id}&pin=${user.RESET_PIN}`,
//         };
//         let message = MESSAGES.apiSuccessStrings.EMAIL_FORGOT;
//         mail.sendForgetMail(req, data);
//         return res.success({ message: message });
//       }
//     } catch (e) {
//       const errors = MESSAGES.apiErrorStrings.SERVER_ERROR;
//       res.serverError(errors);
//       throw new Error(e);
//     }
//   },
//   //** send token for  */
//   sendToken: async (req, res) => {
//     try {
//       req.assert('email', 'Email cannot be blank').notEmpty();

//       let errors = req.validationErrors();

//       if (errors) {
//         return res
//           .status(resCode.HTTP_BAD_REQUEST)
//           .json(
//             generateResponse(
//               resCode.HTTP_BAD_REQUEST,
//               errors,
//               MESSAGES.errorTypes.INPUT_VALIDATION
//             )
//           );
//       }

//       let query = {
//         where: {
//           status: OPTIONS.defaultStatus.ACTIVE,
//           email: req.body.email,
//         },
//       };

//       let existingUser = await User.findOne(query);

//       if (!existingUser) {
//         const message = MESSAGES.apiErrorStrings.USER_EXISTS('email address');
//         return res
//           .status(resCode.HTTP_BAD_REQUEST)
//           .json(
//             generateResponse(
//               resCode.HTTP_BAD_REQUEST,
//               message,
//               MESSAGES.errorTypes.INPUT_VALIDATION
//             )
//           );
//       } else {
//         let today = Date.now();
//         today.setDate(today.getDate() + OPTIONS.otpExpireInDays);
//         existingUser.verificationToken = generateOTP(5);
//         existingUser.verificationTokenExpireAt = today;
//         let token = existingUser.genToken();
//         await existingUser.save();

//         return res.success(existingUser);
//         return res.status(resCode.HTTP_OK).json(
//           generateResponse(resCode.HTTP_OK, {
//             token: token,
//           })
//         );
//       }
//     } catch (e) {
//       const errors = MESSAGES.apiErrorStrings.SERVER_ERROR;
//       res.serverError(errors);
//     }
//   },
//   //** verify the token */
//   verifyToken: async (req, res) => {
//     try {
//       req.assert('otp', 'Please enter a valid otp.').notEmpty();
//       req.assert('email', 'Email cannot be blank').notEmpty();

//       let errors = req.validationErrors();
//       if (errors) {
//         return res
//           .status(resCode.HTTP_BAD_REQUEST)
//           .json(
//             generateResponse(
//               resCode.HTTP_BAD_REQUEST,
//               errors,
//               MESSAGES.errorTypes.INPUT_VALIDATION
//             )
//           );
//       }
//       let query = {
//         where: {
//           status: OPTIONS.defaultStatus.ACTIVE,
//           role: [roles.SUPER_ADMIN, roles.ADMIN],
//           verificationToken: req.body.otp,
//           email: req.body.email,
//           verificationTokenExpireAt: { [Op.gte]: new Date() },
//         },
//       };

//       let existingUser = await User.findOne(query);
//       if (!existingUser) {
//         let error = MESSAGES.apiErrorStrings.OTP_EXPIRED;
//         return res
//           .status(resCode.HTTP_BAD_REQUEST)
//           .json(
//             generateResponse(
//               resCode.HTTP_BAD_REQUEST,
//               error,
//               MESSAGES.errorTypes.INPUT_VALIDATION
//             )
//           );
//       }
//       existingUser.isEmailVerified = true;
//       existingUser.verificationToken = null;
//       existingUser.verificationTokenExpireAt = null;

//       await existingUser.save();
//       const message = MESSAGES.apiSuccessStrings.OTP_VERIFIED;
//       return res.success(existingUser);
//       return res
//         .status(resCode.HTTP_OK)
//         .json(generateResponse(resCode.HTTP_OK, { message }));
//     } catch (e) {
//       const errors = MESSAGES.apiErrorStrings.SERVER_ERROR;
//       res.serverError(errors);
//       throw new Error(e);
//     }
//   },
//   //** reset the password */
//   resetPassword: async (req, res) => {
//     try {
//       let query = {
//         _id: req.params.id,
//       };
//       let user = await User.findOne(query);
//       if (!user) {
//         let error = MESSAGES.apiErrorStrings.USER_DOES_NOT_EXIST;
//         return res.preconditionFailed(error);
//       } else {
//         let isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
//         if (isMatch) {
//           user.password = await bcrypt.hash(
//             req.body.newPassword,
//             bcrypt.genSaltSync(8)
//           );
//           user.LAST_UPDATED_DATE = Date.now();
//           let users = await user.save();
//           const message = MESSAGES.apiSuccessStrings.PASSWORD('reset');
//           return res.success({ message: message });
//         } else {
//           let errors = MESSAGES.apiErrorStrings.INVALID_CREDENTIALS;
//           return res.preconditionFailed(errors);
//         }
//       }
//     } catch (e) {
//       const errors = MESSAGES.apiErrorStrings.SERVER_ERROR;
//       res.serverError(errors);

//       throw new Error(e);
//     }
//   },
//   //** reset the password */
//   setPassword: async (req, res) => {
//     try {
//       let query = {
//         _id: req.body._id,
//       };
//       let user = await User.findOne(query);
//       if (!user) {
//         let error = MESSAGES.apiErrorStrings.USER_DOES_NOT_EXIST;
//         return res.preconditionFailed(error);
//       } else {
//         if (user.RESET_PIN === req.body.RESET_PIN) {
//           user.password = await bcrypt.hash(
//             req.body.NEW_PASSWORD,
//             bcrypt.genSaltSync(8)
//           );
//           user.LAST_UPDATED_DATE = Date.now();
//           user.IS_VERIFY = true;
//           user.RESET_PIN = null;
//           let users = await user.save();
//           const message = MESSAGES.apiSuccessStrings.password('set');
//           return res.success({ message: message });
//         } else {
//           let errors = MESSAGES.apiErrorStrings.INVALID_TOKEN;
//           return res.preconditionFailed(errors);
//         }
//       }
//     } catch (e) {
//       const errors = MESSAGES.apiErrorStrings.SERVER_ERROR;
//       res.serverError(errors);

//       throw new Error(e);
//     }
//   },
};

module.exports = userObj;