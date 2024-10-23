import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: { 
        type: String, 
        unique: [true, 'Email already exists!'], 
        required: [true, 'Email is required!'] 
    },
    username: { 
        type: String, 
        required: [true, 'Username is required!'], 
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"] 
    },
    image: { 
        type: String 
    }
});

// The "models" object is provided by Mongoose and contains all the registered models.
// If a model named "User" already exists, it assigns that model to the "User" constant.
// This ensures that the "User" model is only created once and reused if it already exists.
// If no model named "User" exists, it creates a new model using the "UserSchema" and assigns it to the "User" constant.
const User = models.User || model('User', UserSchema);
export default User;