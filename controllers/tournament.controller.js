const { Tournament, GameModel, UserModel } = require('../models/all.models')
const { Types } = require('mongoose')
const t_logic = require('../logics/tournament.logic')
const s_logic = require('../logics/season.logic')

module.exports = {
    get_all: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            // const search = req.query.search || '';

            const skip = (page - 1) * limit;

            let searchQuery = { }
            // if(search) searchQuery = {
            //     $or: [
            //         { name: { $regex: search, $options: 'i' } },
            //         { email: { $regex: search, $options: 'i' } }
            //     ],
            //     role: 'user'
            // }

            const [count, result] = await Promise.all([
                Tournament.countDocuments(searchQuery),
                Tournament.aggregate([
                    {
                        $match: searchQuery
                    },
                    {
                        $skip: skip,
                    },
                    {
                        $limit: limit
                    }
                ])
            ])

            res.json({ count, result });
        } catch (error) {
            console.log(error)
        }
    },
    create: async (req, res) => {
        try {
            if(req.file) req.body.image = req.file.filename
            const result = await Tournament.create(req.body)
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
        }
    },
    attend: async (req, res) => {
        try {
            await Tournament.findByIdAndUpdate(req.params.id, { $push: { users: req.user._id } })
            res.status(200).json(true)
        } catch (error) {
            console.log(error)
        }
    },
    start: async (req, res) => {
        try {
            const t = await Tournament.findByIdAndUpdate(req.params.id, { status: 'process' })
            const games = t.type === 'season' ? s_logic(t.users, t._id) : t_logic(t.users, t._id)
            await GameModel.create(games)
            res.status(200).json(true)
        } catch (error) {
            console.log(error)
        }
    },
    get_time_line: async (req, res) => {
        try {
            console.log(req.user)
            const results = await GameModel
                .find({ users: { $in: [req.user._id] } })
                .populate('winner', 'name image email')
                .populate('users', 'name image email')
            res.status(200).json(results)
        } catch (error) {
            console.log(error)
        }
    },
    get_games: async (req, res) => {
        try {
            const results = await GameModel.find()
                .populate('winner', 'name')
                .populate('users', 'name')
            res.status(200).json(results)
        } catch (error) {
            console.log(error)
        }
    },
    get_game: async (req, res) => {
        try {
            const results = await GameModel.findById(req.params.id)
                .populate('winner', 'name')
            res.status(200).json(results)
        } catch (error) {
            console.log(error)
        }
    },
    win_game: async (req, res) => {
        try {
            console.log(req.params.user);
            await UserModel.findByIdAndUpdate(req.params.user, { $inc: { exp: 3 } })
            const result = await GameModel.findByIdAndUpdate(req.params.id, { $set: { winner: req.params.user } }, { new: true })
                .populate('winner', 'name email')
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
        }
    },
}