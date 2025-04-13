import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.models.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import ApiResponse from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken'; 
import { HealthProfile } from '../models/healthProfile.models.js';

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.getAccessToken();
    const refreshToken = user.getRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, 'Internal server error');
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;


  //   ek bhi empty to return true and error throw
  if (
    [fullname, email, username, password].some((field) => field?.trim() === '')
  ) {
    throw new ApiError(400, 'Fullname is required');
  }

  //   check user exist or not
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, 'User with email or username already exists');
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  // console.log("Avatar Path:", avatarLocalPath);
  // const coverimageLocalPath = req.files?.coverimage[0]?.path;   ye error de rha tha cant read property of undefined

  let coverimageLocalPath;
  // now check if coverimage is present or not
  // avatar is required to use dusri tarah se check kra hai
  if (
    req.files &&
    Array.isArray(req.files.coverimage) &&
    req.files.coverimage.length > 0
  ) {
    coverimageLocalPath = req.files.coverimage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, 'Avatar is required');
  }

  //   upload on cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverimage = await uploadOnCloudinary(coverimageLocalPath);

  if (!avatar) {
    throw new ApiError(400, 'Avatar is required');
  }

  //    create user
  const user = await User.create({
    fullname,
    email,
    username: username.toLowerCase(),
    password,
    avatar: avatar.url,
    coverimage: coverimage?.url || '',
    role: req.body.role || 'user', // default role is user
  });

  // check ki user bna hai ya nhi
  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );
  // password and refreshToken ko hide krne k liye

  //  Linking health profile with user
  // ye health profile create karne se pehle user ko create karna padega warna user id nahi milegi
  await HealthProfile.create({
    user: createdUser._id
  });

  if (!createdUser) {
    throw new ApiError(500, 'User not created');
  }

  // sending response
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, 'User created successfully'));
  // res.status(201) achi practice hai aur postman bhi yhi prefer krti hai

  // validation - ya to ek ek karke karo
  // if( fullname === ""){
  // throw new ApiError(400, "Fullname is required");
  // }
});

const loginUser = asyncHandler(async (req, res) => {
  //1. req.body->details (username/email, password)
  //2. validate details
  //3. check if user exists (username/email)
  // 4. if user exists, check password
  //5. if password is correct, create access token and refresh token
  // send cookies to browser (access token, refresh token)

  const { username, email, password } = req.body;

  const identifier = username || email;
  // yha pr username ya email dono me se koi bhi ho sakta hai

  console.log('Request Body:', req.body);

  if (!password || !identifier) {
    throw new ApiError(
      400,
      'Either username or email, and password are required'
    );
  }

  // yha pr iska refresh token empty hai
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    throw new ApiError(400, 'User not found');
  }

  const isPasswordValid = await user.isPasswordMatched(password);
  if (!isPasswordValid) {
    throw new ApiError(400, 'Invalid password');
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  // yha firse user ko database me call krege taki uska refresh token update ho jaye
  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  const isProduction = process.env.NODE_ENV === 'production';

  const options = {
    httpOnly: true,
    secure: isProduction, // only true in production
    sameSite: isProduction ? 'none' : 'lax', // needed for cross-origin cookies
  };

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        'User logged in successfully'
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, //1 is used to delete the field from the db
      },
    },
    {
      new: true,
    }
  );

  const isProduction = process.env.NODE_ENV === 'production';

  const options = {
    httpOnly: true,
    secure: isProduction, // only true in production
    sameSite: isProduction ? 'none' : 'lax', // needed for cross-origin cookies
  };

  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200, {}, 'User logged out successfully'));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, 'Unauthorized request');
  }
  try {
    const decodeToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodeToken?._id);
    console.log('Decoded Token:', decodeToken);
    console.log('User:', user);

    if (!user) {
      throw new ApiError(401, 'Unauthorized request, user not found');
    }

    if (user.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, 'Refresh token not matched');
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken,
          },
          'Access token refreshed successfully'
        )
      );
  } catch (error) {
    throw new ApiError(
      401,
      error?.message || 'error while refreshing access token'
    );
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  // ye confirm password field rakhne ke liye

  // const { oldPassword , newPassword , confirmPassword } = req.body;

  // if( !oldPassword || !newPassword || !confirmPassword ){
  //   throw new ApiError(400 , "All fields are required ")
  // }

  // if( newPassword !== confirmPassword ){
  //   throw new ApiError(400 , "New password and confirm password do not match ")
  // }

  const { oldPassword, newPassword } = req.body;

  console.log('Request Body:', req.body);

  // req.user mai user object aya hua hai ( middleware se )
  const user = await User.findById(req.user?._id);

  console.log("User from DB:", user);


  const isPasswordCorrect = await user.isPasswordMatched(oldPassword);
  // isPasswordCorrect is made inside user model

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid old password");
  }

  user.password = newPassword;

  await user.save({ validateBeforeSave: false });
  // save is called to save the properties and call the pre save hook

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully "));
});

export { registerUser, loginUser, logoutUser, refreshAccessToken , changeCurrentPassword };
