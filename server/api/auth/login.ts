import {okResponse, errorResponse } from "~/utils/apiResponse";
import jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody<{
      email: string;
      password: string;
    }>(event);

    // VALIDATE
    // - Empty
    if (!email || !password) {
      return errorResponse("Email and Password are required");
    }

    // GET USER
    const tUser = await prisma.employee.findFirst({
      where: { email: email.toLowerCase() },
    });

    // CHECK USER
    if (!tUser) {
      return errorResponse("Invalid Email or Password");
    }

    // CHECK PASSWORD
    // const isPasswordValid = await comparePassword(password, tUser.uPassword);
    if (password?.startsWith("0x")) {
      // COMPARE PLAIN PASSWORD
      if (password !== "0x" + password) {
        return errorResponse("Invalid Email or Password!");
      }
    } else {
      // COMPARE HASHED PASSWORD
      // if (tUser.uPassword !== password) {
      //   return errorResponse("Invalid Email or Password");
      // }
      return errorResponse("Hashed password not implemented");
    }

    // landlordClient.tBackOfficeUsers.findFirst().then((res) => { res.

    // CREATE TOKEN
    const token = await createToken(tUser);
    const user: any = tUser;
    delete user.password;
    return okResponse({ token, user });
  } catch (error) {
    console.error(error);

    return errorResponse(error);
  }
});

const createToken = async (tUser: any) => {
  const privateKey = useRuntimeConfig().RS256_PRIVATE_KEY;

  const token = await jwt.sign(
    { id: tUser.uId, email: tUser.uEmail },
    privateKey,
    {
      expiresIn: "1h",
      algorithm: "RS256",
    }
  );
  return token;
};