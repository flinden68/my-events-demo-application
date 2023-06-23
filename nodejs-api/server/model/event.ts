import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const EventSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    userId: {
        type: String,
    },
    location: {
        type: String,
    },
    start: {
        type: Number,
    },
    end: {
        type: Number,
    },
    created: {
        type: Date,
    },
    modified: {
        type: Date,
    }
});

const Event = model("Event", EventSchema);

export default Event;
