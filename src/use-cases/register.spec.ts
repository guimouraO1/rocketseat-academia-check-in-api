import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { describe } from "node:test";
import { expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";

describe("Register Use Case", () => {
    it("shoud hash user password uon registration", async () => {
        const prismaUserRepository = new PrismaUsersRepository();
        const registerUseCase = new RegisterUseCase(prismaUserRepository);

        const testUser = {
            name: "Jhon Doe",
            email: "Jhondoe@example.com",
            password: "123456"
        };

        const { user } = await registerUseCase.execute(testUser);

        const isPasswordCorrectlyHashed = await compare(
            user.password_hash,
            testUser.password
        );

        expect(isPasswordCorrectlyHashed).toBe(true);
    });
});
