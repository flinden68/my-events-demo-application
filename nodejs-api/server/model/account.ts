import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const schema = new Schema({
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    language: {
        type: String,
    },
    created: {
        type: Date,
    },
    modified: {
        type: Date,
    }
});

const Account = model("Account", schema);

export default Account;
