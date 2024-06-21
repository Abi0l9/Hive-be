// import { User } from "../../../models/User";

// const getMyCompanyJobApplications = async (req, res) => {
//   const { id } = req.user;
//   const body = req.body;

//   try {
//     const userExists = await User.findById(id).populate("jobs");
//     if (!userExists) {
//       return res.status(404).json({ error: "User not found." });
//     }

//     return res.status(200).json(userExists);
//   } catch (e) {
//     return res.status(400).json({ error: e.message });
//   }
// };
