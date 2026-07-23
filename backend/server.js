const app = require('./app');
const sequelize = require('./config/db');
const User = require('./models/user.model');
const bcrypt = require('bcryptjs');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET wajib diisi pada file .env");
        }
        await sequelize.authenticate();
        console.log('Database connected successfully');
        await sequelize.sync({
            force: false,
            alter: process.env.DB_SYNC_ALTER === "true",
        });

        console.log('Database synchronized successfully');

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (adminEmail && adminPassword) {
            try {
                const existingAdmin = await User.scope('withPassword').findOne({ where: { email: adminEmail.trim().toLowerCase() } });
                if (!existingAdmin) {
                    await User.create({
                        name: 'Admin Messa',
                        email: adminEmail,
                        password: adminPassword,
                        role: 'admin'
                    });
                    console.log(`Admin account created: ${adminEmail}`);
                } else if (existingAdmin.role !== 'admin') {
                    existingAdmin.role = 'admin';
                    await existingAdmin.save();
                    console.log(`User ${adminEmail} upgraded to Admin`);
                }
            } catch (err) {
                console.error("Gagal membuat admin seeder:", err);
            }
        }

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log('Unable to start server : ', error);
        process.exitCode = 1;
    }
};

startServer();