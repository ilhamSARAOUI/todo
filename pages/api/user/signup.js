import {
    INSERT,
    SELECT
} from "@/utils/database_module";
export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const user = req.body;

            const columnsToSelect = ['*'];
            const conditions = [{
                column: ' email',
                operator: '=',
                value: user.email
            }];
            const existingUsers = await SELECT(`users`, columnsToSelect, conditions);

            if (existingUsers.length > 0) {
                return res.status(409).json({
                    error: "Email already in use"
                });
            }
            await INSERT('users', user);
            return res.status(200).json({
                user: user
            });

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