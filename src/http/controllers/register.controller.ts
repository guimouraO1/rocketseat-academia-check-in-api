import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
        const usersRepository = new PrismaUsersRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);

        await registerUseCase.execute({ name, email, password });
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            reply.status(409).send({ message: error.message });
        }

        throw error;
    }

    reply.status(201).send({});
}
