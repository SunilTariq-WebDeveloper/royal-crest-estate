import Property from '../models/property.model.js';
import Inquiry from '../models/Inquiry.model.js'

const createInquiry = async (req, res) => {
    try {
        const { propertyId, name, email, phone, message } = req.body;
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found",
            });
        }

        const inquiry = new Inquiry({
            propertyId,
            agentId: property.agent, 
            name,
            email,
            phone,
            message,
        });

        await inquiry.save();

        res.status(201).json({
            success: true,
            message: "Inquiry sent successfully",
            inquiry,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error sending inquiry",
            error,
        });
    }
};
//This code is used to get Agent inquiries
const getAgentInquiries = async (req, res) => {
    try {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - token missing"
            })
        }

        const agentId = req.user._id;

        const inquiries = await Inquiry
            .find({ agentId })
            .populate("propertyId", "title location price");

        res.status(200).json({
            success: true,
            total: inquiries.length,
            inquiries,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error fetching inquiries",
            error: err.message,
        });
    }
};

export{
    createInquiry,
    getAgentInquiries
}