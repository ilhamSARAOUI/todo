import {
    addUser
} from "./user_module";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const user = req.body;

            const result = await addUser(user);

            if (result.error) {
                res.status(409).json({
                    error: "Email already in use"
                });
                console.error('Error:', result.error);
            } else if (result.success) {
                res.status(200).json({
                    user: user
                });
            }
        } catch (error) {
            console.error("Error adding user:", error);
            res.status(500).json({
                error: "Unable to add user"
            });
        }
    } else {
        res.status(405).json({
            error: "Method not allowed"
        });
    }
}