import bcrypt from "bcryptjs";

async function run() {
  const password = "2233445566";
  const hash = await bcrypt.hash(password, 10);
  console.log("Hash:", hash);
}

run();