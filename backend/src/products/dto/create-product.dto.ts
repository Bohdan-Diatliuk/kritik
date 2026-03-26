import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  brand?: string;

  @IsString()
  @IsOptional()
  flavour?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  volume?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  proteins?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  fats?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  omega3?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  calories?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  fiber?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  vuhl?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  sugar?: number;

  @IsString()
  type: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  weight?: number;

  @IsString()
  @IsOptional()
  speciality?: string;

  @IsString()
  @IsOptional()
  info?: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsNumber()
  @Min(0)
  items: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  cost: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  discount?: number;

  @IsArray()
  @IsString({ each: true })
  description: string[];

  @IsArray()
  @IsString({ each: true })
  information: string[];

  @IsArray()
  @IsString({ each: true })
  color: string[];

  @IsNumber()
  categoryId: number;
}
