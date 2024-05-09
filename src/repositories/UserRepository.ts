import { prisma } from "../database/prisma";

interface createUser {
    name: string,
    email: string,
    password: string
}

export class UserRepository {
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        return user;
    }

    async create({ name, email, password }: createUser) {
        const user = await prisma.user.create({ data: { name, email, password } });
        return user
    }
}