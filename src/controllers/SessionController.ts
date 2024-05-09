import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { compare } from "bcryptjs";
import { sign, JwtPayload } from "jsonwebtoken";

export class SessionController {
    async create(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const user = await prisma.user.findUnique({ where: { email } });

            if (!user) {
                return res.status(401).json({ error: true, message: "Email and/or password invalid." });
            }

            const passwordMatched = await compare(password, user.password);

            if (!passwordMatched) {
                return res.status(401).json({ error: true, message: "Email and/or password invalid." });
            }

            const secret = process.env.JWT_SECRET

            if (!secret) {
                return res.status(500).json({ error: true, message: "JWT secret not found." });
            }

            const token = sign({ id: Number(user.id) }, secret, { expiresIn: "1d" });

            return res.status(201).json({ user, token });
        } catch (error) {
            return res.status(500).json({ error: true, message: "Internal server error" });
        }
    }
}