import { User } from '@prisma/client';
import { prisma } from '../../core/database/prisma.client';
import { AutoRegister } from '../../utils/auto-register.decorator';

@AutoRegister()
export class AuthRepository {

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { email },
        });
    }
}