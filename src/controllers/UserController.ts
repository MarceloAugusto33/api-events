import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { hash } from "bcryptjs";

export class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(401).json({ message: "name, email and password is required" });
        }

        try {
            const userExists = await prisma.user.findUnique({ where: { email } });

            if (userExists) {
                return res.status(401).json({ message: "Email in use" });
            }

            const hashPassword = await hash(password, 8);

            const user = await prisma.user.create({ data: { name, email, password: hashPassword } });

            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}