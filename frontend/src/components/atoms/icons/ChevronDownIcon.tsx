import { ChevronDown } from "lucide-react";
import cn from 'classnames';

type Props = {
    className?: string;
}

export const ChevronDownIcon = ({ className }: Props) => {
    return <ChevronDown className={cn("text-main-text", className)}/>
}