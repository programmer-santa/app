import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star } from "lucide-react"

interface Bill {
  denomination: number
  quantity: number
}

interface Package {
  id: number
  name: string
  price: number
  originalPrice: number
  bills: Bill[]
  totalValue: number
  description: string
  features: string[]
  popular?: boolean
}

interface PackageCardProps {
  package: Package
}

export function PackageCard({ package: pkg }: PackageCardProps) {
  const savings = pkg.originalPrice - pkg.price
  const savingsPercentage = Math.round((savings / pkg.originalPrice) * 100)
  const profit = pkg.totalValue - pkg.price

  return (
    <Card className={`relative ${pkg.popular ? "border-2 border-green-500 shadow-lg" : ""}`}>
      {pkg.popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-white">
          <Star className="w-3 h-3 mr-1" />
          Más Popular
        </Badge>
      )}

      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">{pkg.name}</CardTitle>
        <CardDescription>{pkg.description}</CardDescription>

        <div className="space-y-2">
          <div className="text-3xl font-bold text-green-600">${pkg.price.toLocaleString()}</div>
          <div className="text-sm text-gray-500 line-through">Antes: ${pkg.originalPrice.toLocaleString()}</div>
          <Badge variant="destructive" className="text-xs">
            Ahorras ${savings.toLocaleString()} ({savingsPercentage}%)
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <h4 className="font-semibold text-sm mb-2 text-center">📸 Imágenes de los Billetes</h4>
          <div className="grid grid-cols-2 gap-2">
            {/* AQUÍ PUEDES AGREGAR LAS IMÁGENES DE LOS BILLETES */}
            <div className="bg-white rounded border-2 border-dashed border-gray-300 h-20 flex items-center justify-center">
              <span className="text-xs text-gray-500">Imagen Billete 1</span>
            </div>
            <div className="bg-white rounded border-2 border-dashed border-gray-300 h-20 flex items-center justify-center">
              <span className="text-xs text-gray-500">Imagen Billete 2</span>
            </div>
          </div>
          <p className="text-xs text-center text-blue-600 mt-2">Ver detalles de seguridad</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-sm mb-2">Contenido del paquete:</h4>
          {pkg.bills.map((bill, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>
                {bill.quantity}x Billetes de ${bill.denomination.toLocaleString()}
              </span>
              <span className="font-medium">${(bill.denomination * bill.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2 font-bold text-green-600">
            Valor total: ${pkg.totalValue.toLocaleString()}
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
          <h4 className="font-semibold text-sm mb-2 text-center">🔍 Prueba de Calidad</h4>
          <div className="space-y-2">
            <div className="bg-white rounded p-2 border-2 border-dashed border-gray-300 h-16 flex items-center justify-center">
              {/* AQUÍ PUEDES AGREGAR EL VIDEO DE PRUEBA DE CALIDAD */}
              <span className="text-xs text-gray-500">Video: Prueba de Calidad</span>
            </div>
            <p className="text-xs text-center text-yellow-700">▶️ Ver cómo verificamos cada billete</p>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
          <div className="text-center">
            <div className="text-lg font-bold text-green-700">Ganancia: ${profit.toLocaleString()}</div>
            <div className="text-xs text-green-600">Retorno de {Math.round((profit / pkg.price) * 100)}%</div>
          </div>
        </div>

        <ul className="space-y-2">
          {pkg.features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm">
              <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        <Button className={`w-full ${pkg.popular ? "bg-green-600 hover:bg-green-700" : ""}`} size="lg">
          Comprar {pkg.name}
        </Button>

        <p className="text-xs text-center text-gray-500">Envío gratis • Pago seguro • Garantía incluida</p>
      </CardContent>
    </Card>
  )
}
