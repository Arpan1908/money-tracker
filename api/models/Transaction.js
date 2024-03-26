const mongoose = require('mongoose');
const { Schema, model } = mongoose; // Assign mongoose object to Schema

const TSchema = new Schema({
    item: { type: String, required: true },
    price:{type:Number, required: true},
    description: { type: String, required: true },
    time: { type: Date, required: true }
});

const TModel = model('Transaction', TSchema);

module.exports = TModel;
