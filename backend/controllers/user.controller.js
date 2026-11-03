import { catchFunc, warning, error, success, success_WITH_id } from "../helpers/errors.js";
import User from "../models/user.model.js";

import { CLIENT_URL } from "../config/awsses.js";
import evalidator from "email-validator";
import pvalidator from "password-validator";
import { nanoid } from "nanoid";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import EmailTemplate from "../helpers/sendEmail.js";
import generateTokenAndUser from "../helpers/generateTokenAndUserResponse.js";

var desiredLength = new pvalidator().is().min(8).is().max(30);

var uppercase = new pvalidator().has().uppercase(1);

var digit = new pvalidator().has().digits(1);

var special_character = new pvalidator().symbols(2);

const preSignup = async (req, res) => {
    try {
        const { first_name, last_name, email, password, confirm_password } =
            req.body;

        const emailFound = await User.findOne({ email });

        if (!first_name || !last_name || !email || !password || !confirm_password) {
            return warning("All Fields are required!", res);
        }

        if (!evalidator.validate(email)) {
            return error("Email is not valid!", res);
        }

        if (!desiredLength.validate(password)) {
            return warning("Password length must be btw 8 to 25 characters", res);
        }

        if (!uppercase.validate(password)) {
            return warning("Password must have at-least 1 capital letter", res);
        }

        if (!digit.validate(password)) {
            return warning("Password must have at-least 1 digit", res);
        }

        if (!special_character.validate(password)) {
            return warning("Password must have at-least 2 special characters", res);
        }
        if (password != confirm_password) {
            return error(`Password & Confirm Password must be match`, res);
        }

        if (emailFound) {
            return error(`This email "${email}" is already registered!`, res);
        }

        const token = jwt.sign(
            { first_name, last_name, email, password },
            process.env.JWT_SECRET,
            { expiresIn: "4h" },
        );

        console.log(`${CLIENT_URL}/activate/${token}`);

        // Nodemailer ke zariye email send karein
        await EmailTemplate(
            email,
            "Signup Verification Link",
            `
            <h2>Signup Verification Link</h2>
            <p>
                <a href='${CLIENT_URL}/auth/activate/${token}'> Create Account </a> 
            </p>
            `
        );

        return res.json({
            message: "We have sent you verification link, Please check your email address to complete signup process.",
        });

    } catch (err) {
        catchFunc(err, res);
    }
};

const signup = async (req, res) => {
    try {
        const token = req.body.token;

        const { first_name, last_name, email, password } = jwt.verify(
            token,
            process.env.JWT_SECRET,
        );

        const salt = await bcryptjs.genSalt(12);
        const hashPassword = await bcryptjs.hash(password, salt);

        console.log(hashPassword);

        const emailFound = await User.findOne({ email });
        if (emailFound) {
            return error(
                `You already used this verification link! means account already registered`,
                res,
            );
        }

        var r = nanoid(5).toUpperCase()

        const new_user = first_name.toUpperCase() + "-SL-" + r
        const newUser = new User({
            first_name,
            last_name,
            email,
            password: hashPassword,
            username: new_user
        });
        newUser.save();


        console.log(newUser._id)


        success(`${first_name} ${last_name}, your account have been created!`, res);

    } catch (err) {
        return catchFunc(err, res);

    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!email || !password) {
            return warning("Both Fields are required!", res);
        } else if (!evalidator.validate(email)) {
            return warning("Email is not valid!", res);
        } else if (!user) {
            return error(`This email ${email} is not registered`, res);
        }

        const isMatchedPassword = await bcryptjs.compare(password, user.password);

        if (!isMatchedPassword) {
            return error(`Wrong password`, res);
        }

        generateTokenAndUser(user, req, res, "You are succesfully logged in!");



    } catch (err) {
        catchFunc(err);
    }
};

const forgetPassword_otp = async (req, res) => {
    try {
        const email = req.body.email;
        console.log(email)
        const user = await User.findOne({ email });
        if (!email) {
            return warning("Please enter your email!", res);
        } else if (!evalidator.validate(email)) {
            return warning("Email is not valid!", res);
        } else if (!user) {
            return error(`This email ${email} is not registered`, res);
        }

        const otp = nanoid(5).toUpperCase();

        user.otp = otp;
        await user.save();

        // Nodemailer ke zariye OTP send karein
        await EmailTemplate(
            email,
            "Forget Password  OTP",
            `
            <h2>one Time Password</h2>
            <p>
               Below is your OTP , 
            </p>
            <span style='font-size: 45px; color: orange; letter-spacing: 8px'  >
               ${otp}
            </span>
            `
        );

        return res.json({
            message: "We have sent you OTP please check for password recovery.",
        });

    } catch (err) {
        catchFunc(err, res);
    }
};
const decodeOTP = async (req, res) => {
    try {
        const otp = req.body.otp
        const user = await User.findOne({ otp: otp })
        console.log(otp)
        if (!user) {
            return error("Wrong OTP", res)
        }

        user.otp = ""
        await user.save()

        success_WITH_id("OTP verified now you can set new password  " + user._id, res, user._id)




    } catch (err) {
        catchFunc(err, res);
    }
}

const resetPassword = async (req, res) => {
    try {

        const { id, newPassword, confirmPassword } = req.body;

        if (!newPassword || !confirmPassword) {
            return warning("Please enter both passwords!", res);
        }

        if (newPassword !== confirmPassword) {
            return warning("Passwords must be match!", res);
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);


        await User.findByIdAndUpdate(req.params.id, { password: hashedPassword }, { new: true })

        return success("Password reset successfully!", res);

    } catch (err) {
        catchFunc(err, res);
    }
};



const changePassword = async (req, res) => {
    try {

    } catch (err) {
        catchFunc(err, res);
    }
};


const fetchAllUsers = async (req, res) => {
    try {
        const users = await User.find()

        if (users.length > 0) {
            return res.json({ users })
        }
        else {
            return error('No User Found', res)
        }
    }
    catch (err) {
        return catchFunc(err, res);
    }
}


const fetchLoggedUser = async (req, res) => {
    try {
    } catch (err) {
        catchFunc(err, res);
    }
};
export const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        if (!["user", "agent", "admin"].includes(role)) {
            return res.status(400).json({ error: "Invalid role" });
        }

        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "Only admin can update roles" });
        }

        const user = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true }
        );

        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({ message: "Role updated successfully", user });
    } catch (err) {
        catchFunc(err, res);
    }
};
export const uploadAvatar = async (req, res) => {

    const userId = req.user._id

    const user = await User.findByIdAndUpdate(
        userId,
        { avatar: req.file.path },
        { new: true }
    )

    res.json({
        success: true,
        user
    })

}
export const deleteUser = async (req, res) => {
    try {

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
export const addToWishlist = async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user.wishlist.includes(req.body.propertyId)) {
        return res.json({ message: "Already added" });
    }

    user.wishlist.push(req.body.propertyId);
    await user.save();

    res.json({ success: "Added to Wishlist" });
};
export const getWishlist = async (req, res) => {
    const user = await User.findById(req.user.id)
        .populate("wishlist");

    res.json({ wishlist: user.wishlist });
};
export const removeWishlist = async (req, res) => {
    const user = await User.findById(req.user.id);

    user.wishlist = user.wishlist.filter(
        (id) => id.toString() !== req.body.propertyId
    );

    await user.save();

    res.json({ success: true });
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            user: user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        console.log("=== UPDATE PROFILE DEBUG ===");
        console.log("Request Body:", req.body);
        console.log("Request File:", req.file);

        const name = req.body.name;
        const phone = req.body.phone;
        const bio = req.body.bio;

        let avatar = undefined;
        if (req.file && req.file.path) {
            avatar = req.file.path; // Local file path
        }

        const updateData = {
            phone: phone,
            bio: bio,
            updatedAt: Date.now()
        };

        if (name) {
            const nameParts = name.split(' ');
            updateData.first_name = nameParts[0] || "";
            updateData.last_name = nameParts.slice(1).join(' ') || "";
        }
        if (avatar) {
            updateData.avatar = avatar;
        }

        console.log("Updating with data:", updateData);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        ).select('-password');

        console.log("Updated user:", updatedUser);
        console.log("Updated user avatar:", updatedUser?.avatar);

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.json({
            success: true,
            user: {
                _id: updatedUser._id,
                name: `${updatedUser.first_name} ${updatedUser.last_name}`,
                first_name: updatedUser.first_name,
                last_name: updatedUser.last_name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                bio: updatedUser.bio,
                avatar: updatedUser.avatar || "",
                role: updatedUser.role,
                isVerified: updatedUser.isVerified,
                createdAt: updatedUser.createdAt,
                wishlist: updatedUser.wishlist
            }
        });

    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export {
    preSignup,
    signup,
    login,
    forgetPassword_otp,
    decodeOTP,
    resetPassword,
    changePassword,
    fetchLoggedUser,
    fetchAllUsers
};