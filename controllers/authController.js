const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { allowedRoles } = require("../middelwares/verifyRoles");
const upload = require("../middlewares/upload");

// Register a new user
const register = async (req, res) => {
    const { first_name, last_name, email, password, role } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    if (!allowedRoles.includes(role)) {
        return res.status(400).json({ message: "Role does not exist." });
    }

    try {
        const duplicatedEmail = await User.findOne({ email }).exec();
        if (duplicatedEmail) {
            return res.status(409).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role,
            verified: false, 
        });


        const verificationToken = jwt.sign(
            { email: newUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "7d" }
        );


        const verificationLink = `http://localhost:5000/auth/verify-email?token=${verificationToken}`;
        // const verificationLink = ${process.env.BASE_URL}/verify-email/${verificationToken};


        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, 
            },
        });

        const mailOptions = {
            from: 'eclinic@gmail.com',
            to: email,
            subject: "Verify your email",
            html: `
                <p>Welcome, ${first_name}!</p>
                <p>Click <a href="${verificationLink}" target="_blank">here</a> to verify your email.</p>
            `,
        };
        

        // Send email
        await transporter.sendMail(mailOptions);

        return res
            .status(201)
            .json({ message: "User created successfully. Please check your email to verify your account." });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Server error." });
    }
};

// Login a user
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res.status(401).json({ message: "User does not exist." });
            //post url front
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Wrong password." });
        }

        if (!user.verified) {
            return res.status(403).json({ message: "Please verify your email first." });
        }

        const accessToken = jwt.sign(
            {
                userInfo: {
                    id: user._id,
                    role: user.role,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            accessToken,
            id: user._id,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Server error." });
    }
};

// Verify email
const verifyEmail = async (req, res) => {
    const { token } = req.query;

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findOne({ email: decoded.email }).exec();

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (user.verified) {
            return res.status(400).json({ message: "Email already verified." });
        }

        user.verified = true;
        await user.save();

        return res.status(200).json({ message: "Email verified successfully " });
        //return res.redirect("/login");
    } catch (error) {
        console.error("Error:", error);
        return res.status(400).json({ message: "Invalid or expired token." });
    }
};

module.exports = { register, login, verifyEmail };
