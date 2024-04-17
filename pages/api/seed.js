import nc from 'next-connect';
import User from '../../models/User';
import data from '../../utils/data';
import db from '../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  try {
    await db.connect();

    const existingUsersCount = await User.countDocuments();

    if (existingUsersCount === 0) {
      await User.insertMany(data.users);
    }

    // await db.disconnect();
    if(existingUsersCount!==0){
      res.send({ message: "Data already seeded ." });
    }else{
      res.send({ message: "Data seeded successfully." });
    }

  } catch (error) {
    console.error("Error seeding data:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

export default handler;