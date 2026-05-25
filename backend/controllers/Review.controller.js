import Review from "../models/Review.js";
import Property from "../models/property.model.js";

export const createReview = async (req, res) => {
    const { propertyId, rating, comment } = req.body;
    await Review.create({
        property: propertyId,
        user: req.user._id,
        rating,
        comment,
    });

    const reviews = await Review.find({ property: propertyId }).populate("user", "first_name last_name email avatar");
    const existingReview = await Review.findOne({ user: req.user._id, property: req.body.property });

    if (existingReview) {
        return res.status(400).json({
            message: "You already reviewed this property"
        });
    }
    const avg =
        reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;
    await Property.findByIdAndUpdate(propertyId, {
        rating: avg,
        numReviews: reviews.length,
    });

    res.json({ success: true });
};
export const getReviewsByProperty = async (req, res) => {
    try {
        const reviews = await Review.find({
            property: req.params.propertyId,
        }).populate("user", "first_name last_name email avatar");

        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Error fetching reviews" });
    }
};