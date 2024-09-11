import { compare, hash } from "bcryptjs";

const hashPassword = async (pass) => {
  try {
    const result = await hash(pass, 12);

    return result;
  } catch (error) {
    console.log("can not hash password in hashPassword function\n", error);
  }
};

const verifyPassword = async (pass, hashPass) => {
  try {
    const result = await compare(pass, hashPass);

    return result;
  } catch (error) {
    console.log("can not compare password in verifyPassword function\n", error);
  }
};

export { hashPassword, verifyPassword };
