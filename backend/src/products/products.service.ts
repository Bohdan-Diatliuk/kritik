import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page = 1, limit = 20, category?: string) {
    const safePage = Math.max(page, 1);
    const safeLimit = Math.min(Math.max(limit, 1), 50);
    const where = category ? { category: { name: category } } : {};

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: { category: true, reviews: { select: { rating: true } } },
        skip: (safePage - 1) * safeLimit,
        take: safeLimit,
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: products.map((product: (typeof products)[number]) =>
        this.withRatingSummary(product),
      ),
      total,
      page: safePage,
      limit: safeLimit,
    };
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true, reviews: { select: { rating: true } } },
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return this.withRatingSummary(product);
  }

  private withRatingSummary<T extends { reviews: { rating: number }[] }>(
    product: T,
  ) {
    const { reviews, ...rest } = product;
    const reviewsCount = reviews.length;
    const averageRating = reviewsCount
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviewsCount
      : null;
    return { ...rest, averageRating, reviewsCount };
  }

  async create(dto: CreateProductDto) {
    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    });
    if (!category) {
      throw new NotFoundException(`Category #${dto.categoryId} not found`);
    }
    return this.prisma.product.create({
      data: dto,
      include: { category: true },
    });
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data: dto,
      include: { category: true },
    });
  }

  async remove(id: number) {
    await this.prisma.product.delete({
      where: { id },
    });
  }
}
