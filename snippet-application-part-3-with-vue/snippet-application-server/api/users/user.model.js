const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            lowercase: true,
            required: true
        },
        password: { type: String, required: true },
        years_experience: Number,
        programming_languages: [String]
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

// Define a virtual property to retrieve snippets associated with the user
UserSchema.virtual('snippets', {
    ref: 'Snippet',
    localField: '_id',
    foreignField: 'user_id'
});

// Define a virtual property to retrieve bookmarks associated with the user
UserSchema.virtual('bookmarks', {
    ref: 'Bookmark',
    localField: '_id',
    foreignField: 'user_id'
});

// .pre to validate the unique username before findOneAndUpdate
// next() hand off control to the next middleware or the controller

// NOTE: we only need this portion if we do not use unique: true AND lowercase: true
UserSchema.pre('findOneAndUpdate', async function (next) {
    //access the query object used in findOneAndUpdate
    const { _id } = this.getQuery();

    //access the update object used in findOneAndUpdate
    const { username } = this.getUpdate();

    if (username) {
        // the \b in regex is a word boundary
        // this ensures we search for the username a whole word and not as a portion of a word
        const user = await User.findOne({
            username: { $regex: `\\b${username}\\b`, $option: 'i' }
        });

        if (user && user._id.toString() !== _id) {
            const error = new Error(`Username ${username} is already taken.`);
            return next(error);
        }
    }
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
