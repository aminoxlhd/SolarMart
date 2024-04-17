import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../../utils/auth';
import Slider from '../../../../../models/Slider';
import db from '../../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
    await db.connect();
    const slider = await Slider.findById(req.query.id);
    // await db.disconnect();
    res.send(slider);
});

handler.put(async (req, res) => {
    await db.connect();
    const slider = await Slider.findById(req.query.id);
    if (slider) {
        slider.images = req.body.images;
   
        await slider.save();
        // await db.disconnect();
        res.send({ message:  "Carousel images have been successfully changed." });
    } else {
        // await db.disconnect();
        res.status(404).send({ message: "Carousel images not found." });
    }
});

handler.delete(async (req, res) => {
    await db.connect();
    const slider = await Slider.findById(req.query.id);
    if (slider) {
        await slider.remove();
        // await db.disconnect();
        res.send({ message: "Carousel Images Removed Successfully." });
    } else {
        // await db.disconnect();
        res.status(404).send({ message: "Carousel images not found" });
    }
});

export default handler;
