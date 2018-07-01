import * as jwt from 'jsonwebtoken';
import * as config from 'config';

export const authCheck = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, config.get('JWT_SECRET'));
        // console.log("the decoded: ", decoded);
        req.userAuth = decoded;
        next();
    } catch (err) {
        res.status(403).json({
            error: 'Unauthorized request'
        });
    }
};