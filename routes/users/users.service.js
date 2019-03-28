const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../helpers/db');
const User = db.User;

module.exports = {
    authenticate,
    getById,
    create,
    update
};

async function authenticate({ email, password }) {
    console.log(email, password);
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
        const { password, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, process.env.SECRET);
        return {
            ...userWithoutHash,
            token
        };
    }
}

// async function getAll() {
//     return await User.find().select('-password');
// }

async function getById(id) {
    return await User.findById(id).select('-password');
}

async function create(params) {
    if (await User.findOne({ email: params.email })) {
        throw 'Email "' + params.email + '" is already taken';
    }

    console.log(params)

    const user = new User(params);
    console.log(user);

    if (params.password) {
        user.password = bcrypt.hashSync(params.password, 10);
    }

    await user.save();
}

async function update(id, params) {
    const user = await User.findById(id);

    if (!user) throw 'User not found';
    if (user.email !== params.email && await User.findOne({ email: params.email })) {
        throw 'Email "' + params.email + '" is already taken';
    }

    if (params.password) {
        params.password = bcrypt.hashSync(params.password, 10);
    }

    Object.assign(user, params);

    await user.save();
}