import { model, models, Schema } from "mongoose"; // Import `models`

const UserSchema = new Schema({
    name: {
        type: String,
        required: true, // Fix typo `require` -> `required`
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure emails are unique
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
    },
});

// Check if model exists to prevent overwriting
const User = models.EcommerseUser || model("EcommerseUser", UserSchema);

export default User;
