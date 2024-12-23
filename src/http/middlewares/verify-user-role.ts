import { FastifyRequest, FastifyReply } from "fastify";

export function varifyUserRole(roleToVerify: "ADMIN" | "MEMBER") {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        const { role } = request.user;

        if (role !== roleToVerify) {
            reply.status(401).send({ message: "Unauthorized" });
        }
    };
}
