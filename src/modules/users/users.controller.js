import { 
  getAllUsers, 
  createUser, 
  getUserByEmail,
  updateUserRole, 
  deleteUser, 
  updateUser, 
  updateUserPassword,
  authenticateUser
} from './users.model.js';
import { success, error } from "../../utils/response.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// ✅ Get all user
export async function getUsersHandler(req, res) {
  try {
    const users = await getAllUsers();
    return success(res, users, "Users fetched successfully", 200)
  } catch (err) {
    return error(res, "Failed to fetched users", 500, err.message)
  }
}

// ✅ Register
export async function createUserHandler(req, res) {
  try {
    const { username, password, email, fullName } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await createUser({ 
      username, 
      passwordHash, 
      email, 
      fullName, 
      role: "client" 
    });

    return success(res, newUser, "Users register successfully", 200)
  } catch (err) {
    return error(res, "Failed to register", 500, err.message)
  }
}

// ✅ Login
export async function loginHandler(req, res) {
  try {
    const { identifier, password } = req.body; 
    // identifier = username atau email

    const user = await authenticateUser(identifier, password);

    // generate JWT
    const token = jwt.sign(
      { userId: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return success(res, token, "Login successfully", 200)
  } catch (err) {
    return error(res, "Failed to login", 500, err.message)
  }
}

// ✅ Login with Google
export async function googleLoginHandler(req, res) {
  try {
    const profile = req.user; 
    if (!profile) return res.status(401).json({ error: 'Google user tidak ditemukan' });

    let user = await getUserByEmail(profile.email);

    if (!user) {
      const username = profile.displayName ? profile.displayName.replace(/\s+/g, '') : profile.email.split('@')[0];
      user = await createUser({
        username,
        email: profile.email,
        fullName: profile.displayName || username,
        role: 'client',
        passwordHash: null
      });
    }

    const token = jwt.sign(
      { userId: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return success(res, token, "Login successfully", 200)
  } catch (err) {
    return error(res, "Failed to login", 500, err.message)
  }
}

// ✅ Update Role
export async function updateUserRoleHandler(req, res) {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const validRoles = ['super_admin', 'partner', 'client'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Role tidak valid' });
    }

    const updatedUser = await updateUserRole(id, role);
    if (!updatedUser) {
      return error(res, "Users not found", 404, err.message)
    }

    return success(res, updatedUser, "Update role successfully", 200)
  } catch (err) {
    return error(res, "Failed to update role", 500, err.message)
  }
}

// ✅ Delete User
export async function deleteUserHandler(req, res) {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUser(id);
    if (!deletedUser) {
      return error(res, "Users not found", 404, err.message)
    }
    return success(res, deletedUser, "Deleted users successfully", 200)
  } catch (err) {
    return error(res, "Failed to deleted", 500, err.message)
  }
}

// ✅ Update User
export async function updateUserHandler(req, res) {
  try {
    const { id } = req.params;
    const { username, fullName, email } = req.body;

    const updatedUser = await updateUser({ 
      userId: id, 
      username, 
      fullName, 
      email 
    });

    if (!updatedUser) {
      return error(res, "Users not found", 404, err.message)
    }

    return success(res, updatedUser, "Update succesfully", 200)
  } catch (err) {
    return error(res, "Faled to update", 500, err.message)
  }
}

// ✅ Update Password
export async function updateUserPasswordHandler(req, res) {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return error(res, "Wrong Paswword", 400, err.message);
    }

    const updatedUser = await updateUserPassword({ 
      userId: id, 
      oldPassword, 
      newPassword 
    });

    return success(res, updatedUser, "Update password successfully", 200);
  } catch (err) {
    return error(res, "failed to change password", 500, err.message);
  }
}
