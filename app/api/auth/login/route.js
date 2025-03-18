import connectDb from "@/app/lib/dbConnect";
import User from "@/app/models/User"; // ✅ Import User model
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDb();

    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "Please fill all fields" },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return NextResponse.json(
                { success: false, message: "Email doesn't exist" },
                { status: 400 }
            );
        }

        const checkPasswordMatch = await bcrypt.compare(password, existingUser.password);

        if (!checkPasswordMatch) {
            return NextResponse.json(
                { success: false, message: "Incorrect password! Please try again" },
                { status: 400 }
            );
        }

        const token = jwt.sign(
            {
                id: existingUser._id,
                role: existingUser.role,
                email: existingUser.email,
                name: existingUser.name,
            },
            process.env.SECRET_KEY,
            { expiresIn: "7d" } // Token expires in 7 days
        );

        // Set token as HTTP-only cookie (More secure)
        const response = NextResponse.json({
            success: true,
            message: "User logged in successfully",
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
            }
        });

        response.cookies.set("authToken", token, {
            httpOnly: true, // Prevents frontend JavaScript access
            secure: process.env.NODE_ENV === "production", // Secure in production
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60, // 7 days
        });

        return response;
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
