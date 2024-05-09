import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export class EventController {
    async create(req: Request, res: Response) {
        const { name, description, date } = req.body;
        const userId = req.user.id;

        if (!name || !description || !date) {
            return res.status(401).json({ error: true, message: "Name, description and date is required." });
        }

        try {
            const event = await prisma.event.create({
                data: {
                    name,
                    description,
                    date: new Date(date),
                    userId
                }
            });

            return res.status(201).json(event);
        } catch (error) {
            return res.status(500).json({ error: true, message: "Internal server error." });
        }
    }

    async read(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const event = await prisma.event.findUnique({
                where: {
                    id: Number(id),
                },
                include: {
                    author: {
                        select: {
                            name: true,
                            email: true,
                            id: true
                        }
                    }
                }
            });

            if (!event) {
                return res.status(401).json({ error: true, message: "Event not found." });
            }

            return res.status(200).json(event);
        } catch (error) {
            return res.status(500).json({ error: true, message: "Internal server error." });
        }
    }

    async update(req: Request, res: Response) {
        const { name, description, date } = req.body;
        const { id } = req.params;
        const userId = req.user.id;

        try {
            const event = await prisma.event.update({
                where: {
                    id: Number(id),
                    userId
                },
                data: {
                    name,
                    description,
                    date
                }
            });

            return res.status(200).json(event)
        } catch (error) {
            return res.status(500).json({ error: true, message: "Internal server error." });
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const userId = req.user.id;

        try {
            await prisma.event.delete({
                where: {
                    id: Number(id),
                    userId
                }
            });

            return res.status(200).json({ message: "Event deleted." });
        } catch (error) {
            return res.status(500).json({ error: true, message: "Internal server error." })
        }
    }
}