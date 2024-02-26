const prisma = require("../models/prisma");

exports.getUserByUsername = (user, role) => {
    return prisma[role].findFirst({
        where: {
            username: user,
        }
    })
}

exports.getUserByPassword = (userPassword, role) => {
    return prisma[role].findFirst({
      where: {
        password: userPassword,
      }
    })
}

exports.createAccount = (username, password, tel, email, role) => {
  return prisma[role].create({
    data: {
      username,
      password,
      tel,
      email
    }
  })
}