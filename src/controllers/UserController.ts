import { hash } from "bcryptjs";
import { prisma } from "../database/prisma";
import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";

export class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const userRepository = new UserRepository()

        if (!name || !email || !password) {
            return res.status(401).json({ error: true, message: "name, email and password is required" });
        }

        try {
            const userExists = await userRepository.findByEmail(email);

            if (userExists) {
                return res.status(401).json({ error: true, message: "Email in use" });
            }

            const hashPassword = await hash(password, 8);

            const user = await userRepository.create({ name, email, password: hashPassword });

            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ error: true, message: "Internal server error." });
        }
    }

    async read(req: Request, res: Response) {
        const { id } = req.user;

        try {
            const user = await prisma.user.findUnique({ where: { id: Number(id) }, include: { event: true } });

            if (!user) {
                return res.status(400).json({ error: true, message: "User not found." })
            }

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: true, message: "Internal server error" });
        }
    }

    async update(req: Request, res: Response) {
        const { name } = req.body;
        const { id } = req.user;


        try {
            const user = await prisma.user.update({ where: { id: Number(id) }, data: { name } });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: true, message: "Internal server error" });
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.user;

        try {
            await prisma.user.delete({ where: { id: Number(id) } });

            return res.status(200).json({ message: "User deleted success!" })
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}