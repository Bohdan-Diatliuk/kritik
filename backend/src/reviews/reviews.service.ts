import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByProduct(productId: number) {
    await this.ensureProductExists(productId);

    return this.prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(productId: number, dto: CreateReviewDto) {
    await this.ensureProductExists(productId);

    return this.prisma.review.create({
      data: { ...dto, productId },
    });
  }

  private async ensureProductExists(productId: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
  }
}
