import { Gym } from "@prisma/client";
import { GymRepository } from "../gym-repository";

export class InMemoryGymRepository implements GymRepository {
    public items: Gym[] = [];

    async findById(id: string) {
        const gym = this.items.find((item) => item.id === id);

        return gym ?? null;
    }
}
