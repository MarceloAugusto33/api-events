import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export class EventController {
    async create(req: Request, res: Response) {
        const { name, description, date } = req.body;
        const { id } = req.user;

        if (!name || !description || !date) {
            return res.status(401).json({ error: true, message: "Name, description and date is required." });
        }

        try {
            const event = await prisma.event.create({
                data: {
                    name,
                    description,
                    date: new Date(date),
                    userId: id
                }
            });

            return res.status(201).json(event);
        } catch (error) {
            return res.status(500).json({ error: true, message: "Internal server error." });
        }
    }
}