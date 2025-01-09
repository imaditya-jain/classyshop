import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const usersSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        firstName: {
            type: String,
            default: null,
        },
        lastName: {
            type: String,
            default: null,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            default: null,
        },
        displayProfile: {
            type: String,
            default: null,
        },
        password: {
            type: String,
            required: true,
        },
        addresses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Address",
            },
        ],
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order",
            },
        ],
        cart: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Cart",
            },
        ],
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"],
        },
        otp: {
            type: String,
            default: null,
        },
        refreshToken: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

usersSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

usersSchema.pre("save", async function (next) {
    if (this.isModified("otp") && this.otp) {
        this.otp = await bcrypt.hash(this.otp, 10);
    }
    next();
});

usersSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

usersSchema.methods.matchOTP = async function (enteredOTP) {
    return await bcrypt.compare(enteredOTP, this.otp);
};

usersSchema.methods.generateRefreshToken = function () {
    try {
        return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "7d",
        });
    } catch (error) {
        throw new Error("Error generating refresh token");
    }
};

usersSchema.methods.generateAccessToken = function () {
    try {
        return jwt.sign(
            { _id: this._id, email: this.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
    } catch (error) {
        throw new Error("Error generating access token");
    }
};

const Users = mongoose.model("User", usersSchema);

export default Users;
