import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        url: {type: String, required: true},
        public_id: {type: String, required: true}
    }
}, {
    timestamps: true
});

const TokenModel = mongoose.model('token', tokenSchema);

export default TokenModel;
