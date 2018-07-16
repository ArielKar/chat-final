import * as mongoose from 'mongoose';
import * as models from "../models";

(async function init() {
    console.log('here');
    mongoose.connect('mongodb://localhost:27017/chat')
        .then(() => {
                console.log('Database connection established.')
            },
            err => console.log(err)
        );

    const users = [
        {
            name: 'Ariel',
            age: 30,
            password: '123456'
        }
    ];

    await models.User.deleteMany({});

    await Promise.all(users.map(user => new models.User(user).save()));
    console.log('Admin user created, run the server now. disconnecting...');

    await mongoose.disconnect();
    console.log('disconnected');
})();
