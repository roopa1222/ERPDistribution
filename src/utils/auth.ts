import jwt from 'jsonwebtoken';
import { IUser } from '../types/user';

const generateToken = (user: IUser): string => {
    const secretKey = process.env.ACCESS_TOKEN_SECRET as string; // Type assertion
    const accessToken = jwt.sign({ id: user.id, role: user.role }, secretKey, {
        // You can specify the expiration time if needed
        // expiresIn: '7d',
    });

    return accessToken;
};

export default generateToken;
