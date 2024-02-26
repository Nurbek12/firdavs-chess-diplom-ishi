const { UserModel } = require('../models/all.models')
const bcrypt = require('bcrypt')

module.exports = {
    get_all_users: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || '';

            const skip = (page - 1) * limit;

            let searchQuery = { role: 'user' }
            if(search) searchQuery = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } }
                ],
                role: 'user'
            }

            const [count, result] = await Promise.all([
                UserModel.countDocuments(searchQuery),
                UserModel.find(searchQuery)
                    .select('-password -__v')
                    .skip(skip)
                    .limit(limit)
            ])

            res.json({ count, result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    get_user_id: async (req, res) => {
        try {
            const user = await UserModel.findById(req.params.id);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    create_user: async (req, res) => {
        try {
            if(req.body.password) req.body.password = await bcrypt.hash(req.body.password, 10)
            const newUser = await UserModel.create(req.body);
            res.json(newUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    update_user: async (req, res) => {
        try {
            if(req.body.password) req.body.password = await bcrypt.hash(req.body.password, 10)
            const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedUser) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete_user: async (req, res) => {
        try {
            await UserModel.findByIdAndDelete(req.params.id);
            res.json(true);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}