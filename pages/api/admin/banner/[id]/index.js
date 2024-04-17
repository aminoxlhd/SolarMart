import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../../utils/auth';
import Banner from '../../../../../models/Banner';
import db from '../../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
    await db.connect();
    const banner = await Banner.findById(req.query.id);
    // await db.disconnect();
    res.send(banner);
});

handler.put(async (req, res) => {
    await db.connect();
    const banner = await Banner.findById(req.query.id);
    if (banner) {
        banner.image = req.body.image;
   
        await banner.save();
        // await db.disconnect();
        res.send({ message:  "The banner image has been successfully modified" });
    } else {
        // await db.disconnect();
        res.status(404).send({ message: "Banner image not found" });
    }
});

handler.delete(async (req, res) => {
    await db.connect();
    const banner = await Banner.findById(req.query.id);
    if (banner) {
        await banner.remove();
        // await db.disconnect();
        res.send({ message: "Banner image has been removed" });
    } else {
        // await db.disconnect();
        res.status(404).send({ message: "Banner image not found" });
    }
});

export default handler;
