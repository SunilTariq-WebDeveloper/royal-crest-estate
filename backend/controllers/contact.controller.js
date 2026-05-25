import Contact from '../models/contact.model.js'

const sendContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const contact = new Contact({
            name,
            email,
            subject,
            message
        });

        await contact.save();

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            contact
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Error sending message",
            error: error.message
        });

    }
};

// This code is used to get contacts
const getContacts = async (req, res) => {
    try {

        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            contacts
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Error fetching contacts"
        });

    }
};

export{
    sendContact,
    getContacts
}