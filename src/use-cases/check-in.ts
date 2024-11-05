import { GymRepository } from "./../repositories/gym-repository";
import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
    userLatitude: number;
    userLogitude: number;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn;
}

export class CheckInUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
        private gymRepository: GymRepository
    ) {}

    async execute({
        userId,
        gymId,
        userLatitude,
        userLogitude
    }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const gym = await this.gymRepository.findById(gymId);

        if (!gym) {
            throw new ResourceNotFoundError();
        }
        console.log(userLatitude, userLogitude);
        const checkInOnSameDay =
            await this.checkInsRepository.findByUserIdOnDate(
                userId,
                new Date()
            );

        if (checkInOnSameDay) {
            throw new Error();
        }

        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId
        });

        return { checkIn };
    }
}
