import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../../utils/auth';
import BrowseCategories from '../../../../../models/BrowseCategories';
import db from '../../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
    await db.connect();
    const featuredCategory = await BrowseCategories.findById(req.query.id);
    // await db.disconnect();
    res.send(featuredCategory);
});

handler.put(async (req, res) => {
    await db.connect();
    const featuredCategory = await BrowseCategories.findById(req.query.id);
    if (featuredCategory) {
        featuredCategory.image = req.body.image;
        featuredCategory.category = req.body.category;
        featuredCategory.description = req.body.description;

        await featuredCategory.save();
        // await db.disconnect();
        res.send({ message: 'The category has been successfully modified' });
    } else {
        // await db.disconnect();
        res.status(404).send({ message: 'Category not found' });
    }
});

handler.delete(async (req, res) => {
    await db.connect();
    const featuredCategory = await BrowseCategories.findById(req.query.id);
    if (featuredCategory) {
        await featuredCategory.remove();
        // await db.disconnect();
        res.send({ message: 'The category has been deleted' });
    } else {
        // await db.disconnect();
        res.status(404).send({ message: 'Category not found' });
    }
});

export default handler;
