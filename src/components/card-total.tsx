import { type LucideIcon } from 'lucide-react'
import { Card, CardContent } from "~/components/ui/card"

interface CardTotalProps {
  title: string
  value: number | string
  icon: LucideIcon
  color: "violet" | "blue" | "green" | "amber" | "rose"
  trend?: {
    value: number
    isPositive: boolean
  }
}

const colorVariants = {
  violet: {
    bg: "bg-violet-100",
    text: "text-violet-600",
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
  },
  amber: {
    bg: "bg-amber-100",
    text: "text-amber-600",
  },
  rose: {
    bg: "bg-rose-100",
    text: "text-rose-600",
  }
}

export default function CardTotal({ 
  title, 
  value, 
  icon: Icon, 
  color = "violet",
  trend
}: CardTotalProps) {
  const colorClasses = colorVariants[color]
  
  return (
    <Card className="w-full overflow-hidden transition-all hover:shadow-md h-full ">
      <CardContent className="p-0">
        <div className={`flex items-center gap-4 p-5  border-b`}>
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${colorClasses.bg}`}>
            <Icon className={`h-6 w-6 ${colorClasses.text}`} />
          </div>
          <div>
            <p className="text-sm font-medium ">{title}</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{value}</p>
              {trend && (
                <span className={`text-xs font-medium ${trend.isPositive ? 'text-green-600' : 'text-rose-600'}`}>
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="p-4 ">
          <div className="flex justify-between items-center">
            <span className="text-xs ">Last updated today</span>
            <button className="text-xs font-medium hover:underline">
              View details
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
