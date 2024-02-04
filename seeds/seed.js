// use sequelize, user and blog model
const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

// Import the json data for users and blogs
const userData = require('./userData.json');
const blogData = require('./blogData.json');

// seedData function
const seedData = async () => {
    // sync the models with the database and force recreation of tables
    await sequelize.sync({ force: true });

    // bulkcreate users using userData, with individualHooks and returning options
    const allUsers = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    // loop through each blog in the blogdata
    for (const blog of blogData) {
        // randomly select the user from the allUsers array and assign to blog 
        const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
        // create blogs with the data from the blog array and assign random user to them
        await Blog.create({
            ...blog,
            user_id: randomUser.id,
        });
    }

    // exit process after seeding the data successfully
    process.exit(0);
};

// call the seeddata function
seedData();