import { getAllUsers, createUser , getUserByUsername , updateUserRole , deleteUser} from './users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function getUsersHandler(req, res) {   // get all user
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createUserHandler(req, res) {     // register handler
  try {
    const { username, password, email, role, fullName } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await createUser({ username, passwordHash, email, role, fullName });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function loginHandler(req, res) {  // login handler
  try {
    const { username, password } = req.body;

    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'User tidak ditemukan' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Password salah' });
    }

    const token = jwt.sign(
      { userId: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login berhasil', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


//login with google
export async function googleLoginHandler(req, res) {
  try {
    const profile = req.user; // Passport taruh data Google di req.user
    if (!profile) return res.status(401).json({ error: 'Google user tidak ditemukan' });

    // Cek di DB apakah user sudah ada
    let user = await getUserByEmail(profile.email);

    if (!user) {
      // Kalau belum ada, buat user baru otomatis dengan role client
      const username = profile.displayName ? profile.displayName.replace(/\s+/g, '') : profile.email.split('@')[0];
      user = await createUser({
        username,
        email: profile.email,
        fullName: profile.displayName || username,
        role: 'client',
        passwordHash: null // Google login tidak pakai password
      });
    }

    // Buat JWT
    const token = jwt.sign(
      { userId: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login Google berhasil',
      token,
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
        fullName: user.fullname
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}




//change role for super admin
export async function updateUserRoleHandler(req, res) {
    try {
        const { id } = req.params;
        const { role } = req.body;

        const validRoles = ['super_admin', 'admin', 'partner', 'client'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Role tidak valid' });
        }

        const updatedUser = await updateUserRole(id, role);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }

        res.json({ message: 'Role berhasil diperbarui', user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// deleted user
export async function deleteUserHandler(req, res) {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }
    res.json({ message: 'User berhasil dihapus', userId: deletedUser.user_id , usernameDeleted: deletedUser.username });
  }
 catch (err) {
  res.status(500).json({ error: err.message });
  }
}