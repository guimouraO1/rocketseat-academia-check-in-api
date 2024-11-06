import { Gym, Prisma } from "@prisma/client";
import { GymRepository } from "../gym-repository";
import { randomUUID } from "crypto";

export class InMemoryGymRepository implements GymRepository {
    public items: Gym[] = [];

    async findById(id: string) {
        const gym = this.items.find((item) => item.id === id);

        return gym ?? null;
    }

    async create(data: Prisma.GymCreateInput) {
        const gym = {
            id: data.id ?? randomUUID(),
            tittle: data.tittle,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            created_at: new Date()
        };

        this.items.push(gym);

        return gym;
    }
}
