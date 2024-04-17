import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import Slider from '../../../../models/Slider';
import db from '../../../../utils/db';

const handler = nc();

handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
    await db.connect();
    const slider = await Slider.find({});
    // await db.disconnect();
    res.send(slider);
  });

handler.post(async (req, res) => {
    const existingSlider = await Slider.countDocuments();
    if (existingSlider === 0) {
        await db.connect();
        
        const newSlider = new Slider({
            images: req.body.images,
        });
        const slider = await newSlider.save();
        //await db.disconnect();
        res.send({ message: "carousel images were successfully created.", slider });
    } else {
        res.send({ message: "carousel images already exist." });
    }
});



export default handler;