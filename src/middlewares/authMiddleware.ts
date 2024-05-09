import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const jwt = req.headers.authorization;

        if (!jwt || !jwt.startsWith("Bearer ")) {
            return res.status(401).json({ error: true, message: "Token not found" })
        }

        const [, token] = jwt.split(" ");

        const jwtSecret = process.env.JWT_SECRET

        if (!jwtSecret) {
            return res.status(200).json({ error: true, message: "JWT secret not found" });
        }

        const decoded = verify(token, jwtSecret) as JwtPayload & { id: number };

        const { id } = decoded

        req.user = {
            id
        }

        next()
    } catch (error) {
        return res.status(500).json({ error: true, message: "Token not provided." })
    }
}