import { Star } from "lucide-react";
import cn from 'classnames';

type Props = {
    className?: string;
}

export const StarIcon = ({ className }: Props) => {
    return <Star className={cn("text-star-cart", className)}/>
}