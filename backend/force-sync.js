const sequelize = require('./config/db');
const User = require('./models/user.model');
const Antrian = require('./models/antrian.model');
const Setting = require('./models/setting.model');
const DateQuota = require('./models/dateQuota.model');
const Review = require('./models/review.model');

async function forceSync() {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB.');
        await sequelize.sync({ force: true });
        console.log('All tables dropped and recreated cleanly!');
        
        // Buat admin default
        const adminEmail = process.env.ADMIN_EMAIL || 'adminmessa@gmail.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'messagarage24!';
        
        await User.create({
            name: 'Admin Messa',
            email: adminEmail,
            password: adminPassword,
            role: 'admin'
        });
        console.log(`Admin account created: ${adminEmail}`);

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

forceSync();
