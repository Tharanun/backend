const createError = require('../utils/createError');
const userService = require('../services/user-service');

const isAdmin = async (req, res, next) => {
  try {
    // ตรวจสอบว่า req.user ถูกตั้งค่าและเป็น object ที่มีคุณสมบัติ 'id'
    if (req.user && typeof req.user === 'object' && req.user.id) {
      const userId = req.user.id;
      
      const user = await userService.getUserById(userId, 'Admin');
      if (!user) {
        return createError(403, 'Permission denied. User is not an admin.');
      }

      // ถ้าผู้ใช้เป็น admin ให้ผ่านไปยัง middleware ถัดไป
      next();
    } else {
      return createError(403, 'Permission denied. User is not authenticated.');
    }
  } catch (err) {
    next(err);
  }
};

module.exports = isAdmin;
