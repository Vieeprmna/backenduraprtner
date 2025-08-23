import jwt from 'jsonwebtoken';

export function verifySuperAdmin(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token tidak valid' });

        if (decoded.role !== 'super_admin') {
            return res.status(403).json({ message: 'Akses hanya untuk super_admin' });
        }
        req.user = decoded;
        next();
    });
}
