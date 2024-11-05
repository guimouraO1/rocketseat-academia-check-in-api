import { describe } from "node:test";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { Decimal } from "@prisma/client/runtime/library";

interface CheckInUserRequest {
    userId: string;
    gymId: string;
    userLatitude: number;
    userLogitude: number;
}

let checkInsRepository: InMemoryCheckInsRepository;
let gymRepository: InMemoryGymRepository;
let sut: CheckInUseCase;
let checkInRequest: CheckInUserRequest;

describe("Check-in use case", () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new CheckInUseCase(checkInsRepository, gymRepository);

        gymRepository.items.push({
            id: "gym-01",
            tittle: "",
            description: "",
            latitude: new Decimal(0),
            longitude: new Decimal(0),
            phone: ""
        });

        checkInRequest = {
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: 0,
            userLogitude: 0
        };

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("should be able to check in", async () => {
        const { checkIn } = await sut.execute(checkInRequest);

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it("should not be able to check in twice in the same day", async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));

        await sut.execute(checkInRequest);

        await expect(sut.execute(checkInRequest)).rejects.toBeInstanceOf(Error);
    });

    it("should be able to check in twice but in different days", async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));

        await sut.execute(checkInRequest);

        vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0));

        const { checkIn } = await sut.execute(checkInRequest);

        expect(checkIn.id).toEqual(expect.any(String));
    });
});
