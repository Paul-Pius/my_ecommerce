const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongodbId = require("../utils/validateMongodbId");

const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email:email });
    if(!findUser) {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error("user already exist");
    }
});

const loginUserControl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });
    if(findUser && (await findUser.isPasswordMatched(password))) {
        res.json({
            _id: findUser._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id)
        });
    } else {
        throw new Error("Invalid credentials");
    }
});

const updatedUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id)
       
    try {
        const updateUser = await User.findByIdAndUpdate( _id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
        }, 
        {
            new: true
        }
    )
    res.json(updateUser)
    } catch (error) {
        throw new Error(error);
    }
})

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error("error")
    }
});

const getAUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id)

    try {
        const getUser = await User.findById(id);
        res.json(getUser);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteAUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id)

    try {
        const deleteUser = await User.findByIdAndDelete(id);
        res.json(deleteUser);
    } catch (error) {
        throw new Error(error);
    }
});

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id)
    try {
        const block = await User.findByIdAndUpdate(id, 
            {
                isBlocked: true
            },
            {
                new: true
            }
            );
    } catch(error) {
        throw new Error(error);
    }
    res.json({
        message: "user Blocked"
    })
})
 
const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id)
    try {
        const unblock = await User.findByIdAndUpdate(id, 
            {
                isBlocked: false
            },
            {
                new: true
            }
            );
    } catch(error) {
        throw new Error(error);
    }
    res.json({
        message: "user Unblocked"
    })
})

module.exports = { 
    createUser, 
    loginUserControl, 
    getAllUsers, 
    getAUser, 
    deleteAUser, 
    updatedUser,
    blockUser,
    unblockUser 
};