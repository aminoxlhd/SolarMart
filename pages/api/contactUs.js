import nc from 'next-connect';
import ContactUs from '../../models/ContactUs';
import db from '../../utils/db';
import { onError } from '../../utils/error';


const handler = nc({
  onError,
});

handler.post(async (req, res) => {
  await db.connect();
  try {
    const { fullName, email, phoneNumber, subject, message } = req.body;
    const contactSubmission = new ContactUs({ fullName, email, phoneNumber, subject, message });
    await contactSubmission.save();
    // await db.disconnect();
    res.status(201).json({ message: "Thank you for taking the time to contact us!" }); 
  } catch (error) {
    // await db.disconnect();
    res.status(500).json({ message: "Failed to send message" }); 
  }
});


export default handler;
