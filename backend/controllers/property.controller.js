import { catchFunc } from "../helpers/errors.js"
import Property from "../models/property.model.js"

// This code show all the properties to admin
const fetchAllPropertiesAdmin = async (req, res) => {
    try {
        const properties = await Property.find()
            .populate("agent", "first_name last_name phone avatar");
        res.json({
            success: true,
            properties
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//This code show only approved properties
const fetchAllProperties = async (req, res) => {
    try {
        const properties = await Property.find({ status: "approved" }).sort({ createdAt: -1 })
            .populate("agent", "first_name last_name phone avatar");
        res.json({
            success: true,
            properties
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// This code show only agent propertise 
const fetchAgentProperties = async (req, res) => {
    try {
        // 🔹 req.user._id se agent ki properties filter karenge
        const agentId = req.user._id;

        const properties = await Property.find({ agent: agentId })
            .populate('agent', 'first_name last_name email')  // ✅ Agent details bhi lao
            .sort({ createdAt: -1 });
        return res.json({
            success: true,
            total: properties.length,
            properties
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
//This code is fetch single property
const getSingleProperty = async (req, res) => {
    try {
        const id = req.params.id
        const property = await Property.findById(id)
            .populate("agent", "first_name last_name email phone avatar");
        if (!property) {
            return res.json({
                error: `Property Not Found`
            })
        }
        else {
            return res.json({
                property
            })
        }
    } catch (err) {
        catchFunc(err, res)
    }

}


const newProperty = async (req, res) => {
    try {
        const {
            title, description, address, price, bedrooms, bathrooms,
            sqft, type, images, isNew, location, status, isFeatured,
            amenities, rating, yearBuilt
        } = req.body;

        // ✅ Required Fields Check
        if (!title || !description || !address || !price || !bedrooms || !bathrooms ||
            !sqft || !type || !images || isNew === undefined || !location ||
            isFeatured === undefined || !amenities || rating === undefined || !yearBuilt) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // ✅ Check if property already exists
        const existing = await Property.findOne({ title });
        if (existing) return res.status(400).json({ error: "Property already exists" });

        // 🔥 Determine status
        let finalStatus = "pending"; // default for normal users
        if (req.user.isAdmin && status) {
            finalStatus = status; // admin can set status directly
        }

        // ✅ Save Property
        const property = new Property({
            title,
            description,
            address,
            price,
            bedrooms,
            bathrooms,
            sqft,
            type,
            images,
            isNew,
            location,
            status: finalStatus,
            isFeatured,
            amenities,
            rating,
            yearBuilt,
            agent: req.user._id,
        });

        await property.save();

        return res.status(201).json({ message: "Property added successfully", property });

    } catch (err) {
        catchFunc(err, res);
    }
};


const editProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ error: "Property not found" });
        }

        if (
            req.user.role !== "admin" &&
            property.agent.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({ error: "Not authorized" });
        }

        req.body.agent = property.agent;

        Object.assign(property, req.body);
        await property.save();
        res.status(200).json({
            message: "Property updated successfully",
            property
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || "Server error" });
    }
};

//This code is used to delete property
const deleteProperty = async (req, res) => {
    try {
        const id = req.params.id;

        const property = await Property.findById(id);

        if (!property) {
            return res.status(404).json({ error: "Property not found" });
        }

        //  Owner OR Admin allowed
        if (
            property.agent.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({ error: "Not authorized" });
        }

        await property.deleteOne();

        return res.json({
            message: "Property has been deleted"
        });

    } catch (err) {
        catchFunc(err, res);
    }
};

//This code is used to approved the Property
const approvedProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ success: false, message: "Property not found" });
        }

        property.status = "approved";
        await property.save();

        return res.status(200).json({
            success: true,
            message: "Property approved",
            property,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

//This code is used to reject the property

const rejectProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ success: false, message: "Property not found" });
        }

        property.status = "rejected";
        await property.save();

        return res.status(200).json({
            success: true,
            message: "Property rejected",
            property,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
export {
    fetchAllPropertiesAdmin,
    fetchAllProperties,
    getSingleProperty,
    newProperty,
    editProperty,
    deleteProperty,
    fetchAgentProperties,
    approvedProperty,
    rejectProperty
}