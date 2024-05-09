import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { hash } from "bcryptjs";

export class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(401).json({ error: true, message: "name, email and password is required" });
        }

        try {
            const userExists = await prisma.user.findUnique({ where: { email } });

            if (userExists) {
                return res.status(401).json({ error: true, message: "Email in use" });
            }

            const hashPassword = await hash(password, 8);

            const user = await prisma.user.create({ data: { name, email, password: hashPassword } });

            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ error: true, message: "Internal server error." });
        }
    }

    async read(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const user = await prisma.user.findUnique({ where: { id: Number(id) } });

            if (!user) {
                return res.status(400).json({ error: true, message: "User not found." })
            }

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async update(req: Request, res: Response) {
        const { name, password } = req.body;
        const { id } = req.params;

        const hashPassword = await hash(password, 8)

        try {
            const user = await prisma.user.update({ where: { id: Number(id) }, data: { name, password: hashPassword } });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}