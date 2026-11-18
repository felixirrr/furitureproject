import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    const count = await this.prisma.user.count();
    if (count === 0) {
      const password = await bcrypt.hash('admin123', 10);
      await this.prisma.user.createMany({
        data: [
          { email: 'admin@furniture.ru', fullName: 'Администратор Салона', role: Role.ADMIN, password },
          { email: 'bank@furniture.ru', fullName: 'Кредитный Эксперт', role: Role.BANK_WORKER, password },
          { email: 'client@furniture.ru', fullName: 'Покупатель Иван', role: Role.CLIENT, password },
        ],
      });
    }
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}