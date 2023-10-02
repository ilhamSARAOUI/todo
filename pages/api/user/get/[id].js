// pages/api/task/get/[id].js

import {
    getUser
} from '../user_module';

export default async function handler(req, res) {
    const {
        id
    } = req.query;

    if (!id) {
        res.status(400).json({
            error: 'Missing id parameter'
        });
        return;
    }

    if (req.method === 'GET') {
        try {

            const user = await getUser(id);

            return res.status(200).json(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({
                error: 'Unable to fetch user'
            });
        }
    } else {
        res.status(405).json({
            error: 'Method not allowed'
        });
    }
}