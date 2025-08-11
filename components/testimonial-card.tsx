import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, CheckCircle } from "lucide-react"

interface Testimonial {
  name: string
  location: string
  rating: number
  comment: string
  verified: boolean
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-semibold text-gray-900">{testimonial.name}</div>
            <div className="text-sm text-gray-500">{testimonial.location}</div>
          </div>
          {testimonial.verified && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verificado
            </Badge>
          )}
        </div>

        <div className="flex items-center mb-3">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        <p className="text-gray-700 text-sm leading-relaxed">"{testimonial.comment}"</p>
      </CardContent>
    </Card>
  )
}
