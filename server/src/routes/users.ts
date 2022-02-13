import express from 'express';
import { getConnection } from 'typeorm';
import { User } from '../database/entity/user.entity';
const router = express.Router();

router.post('/', async function (req: any, res, next: any) {

    const userRepository = getConnection().getRepository(User);
    const userToAdd: User = req.body;
    if (userToAdd.firstName && userToAdd.lastName && userToAdd.password) {
        await userRepository.save(userToAdd);
        res.json({
            message: 'User created',
            data: userToAdd
        });
    } else {
        res.json({
            error: 'Firstname, lastName and password are required.'
        });
    }
});

router.get('/', async function (req: any, res, next: any) {
    const userRepository = getConnection().getRepository(User);
    const users = userRepository.find();
    res.json({
        message: 'Users fetched',
        data: users
    });
});

module.exports = router;