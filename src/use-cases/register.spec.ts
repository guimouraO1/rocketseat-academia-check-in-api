import { describe } from "node:test";
import { beforeEach, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
}

let usersRepository: InMemoryUsersRepository;
let registerUseCase: RegisterUseCase;
let mockUser: CreateUserRequest;

describe("Register Use Case", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        registerUseCase = new RegisterUseCase(usersRepository);

        mockUser = {
            name: "Jhon Doe",
            email: "Jhondoe@example.com",
            password: "123456"
        };
    });

    it("should be able to register", async () => {
        const { user } = await registerUseCase.execute(mockUser);

        expect(user.id).toEqual(expect.any(String));
    });

    it("should hash user password upon registration", async () => {
        const { user } = await registerUseCase.execute(mockUser);

        const isPasswordCorrectlyHashed = await compare(
            mockUser.password,
            user.password_hash
        );

        expect(isPasswordCorrectlyHashed).toBe(true);
    });

    it("should not be able to register with same email twice", async () => {
        await registerUseCase.execute(mockUser);

        await expect(() =>
            registerUseCase.execute(mockUser)
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
});
