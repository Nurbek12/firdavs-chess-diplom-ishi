const { Schema, model, Types } = require('mongoose')

module.exports = {
    UserModel: model('chess-users', new Schema({
        name: String,
        email: String,
        password: String,
        exp: Number,
        age: Number,
        image: String,
        gender: String,
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    }, {
        timestamps: true
    })),
    GameModel: model('chess-game', new Schema({
        users: [{
            type: Types.ObjectId,
            ref: 'chess-users'
        }],
        winner: {
            type: Types.ObjectId,
            ref: 'chess-users'
        },
        tournament: {
            type: Types.ObjectId,
            ref: 'chess-tournaments'
        },
        colors: Object,
        date: {
            type: Date
        },
        time: Number,
        history: {
            type: Array,
        },
        level: {
            type: Number,
            enum: [32,16,8,4,2,1],
            default: 32
        }
    }, {
        timestamps: true
    })),
    Tournament: model('chess-tournaments', new Schema({
        users: [{
            type: Types.ObjectId,
            ref: 'chess-users'
        }],
        winner: {
            type: Types.ObjectId,
            ref: 'chess-users'
        },
        image: String,
        reward: Number,
        max_users: Number,
        title: String,
        description: String,
        status: {
            type: String,
            enum: ['casting', 'process', 'finish'],
            default: 'casting'
        },
        type: {
            type: String,
            enum: ['tournament', 'season'],
            default: 'tournament'
        },
        date: {
            type: Date
        },
    }, {
        timestamps: true
    })),
}