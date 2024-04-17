import mongoose from 'mongoose';

const contactUsSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String
        },
        subject: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const ContactUs = mongoose.models.ContactUs || mongoose.model('ContactUs', contactUsSchema);
export default ContactUs;
