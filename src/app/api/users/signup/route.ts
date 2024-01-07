import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);
    // check user exist
    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json(
        { error: "User already Exist" },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);
    const createUser = new User({
      username,
      password: hashpassword,
      email,
    });
    const saveUser = await createUser.save();
    return NextResponse.json(
      {
        success: true,
        message: "successfully saved",
        saveUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
