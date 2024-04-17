import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import Banner from '../../../../models/Banner';
import db from '../../../../utils/db';

const handler = nc();

handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
    await db.connect();
    const banner = await Banner.find({});
    // await db.disconnect();
    res.send(banner);
  });

handler.post(async (req, res) => {
    const existingBanner = await Banner.countDocuments();
    if (existingBanner === 0) {
        await db.connect();
        const newBanner = new Banner({
            image: req.body.image,
        });
        const banner = await newBanner.save();
        //await db.disconnect();
        res.send({ message: "Banner image created successfully.", banner });
    } else {
        res.send({ message: "Banner image already exists." });
    }
});



export default handler;