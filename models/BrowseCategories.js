import mongoose from 'mongoose';


const BrowseCategoriesSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const BrowseCategories = mongoose.models.BrowseCategories || mongoose.model('BrowseCategories', BrowseCategoriesSchema);
export default BrowseCategories;
