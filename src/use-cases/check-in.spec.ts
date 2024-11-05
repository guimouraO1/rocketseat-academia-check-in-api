import { describe } from "node:test";
import { beforeEach, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";

interface CheckInUserRequest {
    userId: string;
    gymId: string;
}

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;
let checkInRequest: CheckInUserRequest;

describe("Check-in use case", () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new CheckInUseCase(checkInsRepository);

        checkInRequest = {
            userId: "USER-01",
            gymId: "GYM-01"
        };
    });

    it("should be able to check in", async () => {
        const { checkIn } = await sut.execute(checkInRequest);

        expect(checkIn.id).toEqual(expect.any(String));
    });
});
