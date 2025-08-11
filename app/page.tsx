import { PackageCard } from "@/components/package-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Shield, Clock, Truck, Star, MessageCircle, Phone, Mail } from "lucide-react"
import Chatbot from "@/components/chatbot"

export default function HomePage() {
  const packages = [
    {
      id: 1,
      name: "Paquete Básico",
      price: 150000,
      originalPrice: 300000,
      bills: [
        { denomination: 50000, quantity: 2 },
        { denomination: 20000, quantity: 5 },
      ],
      totalValue: 200000,
      description: "Perfecto para principiantes. Billetes de alta calidad con todas las características de seguridad.",
      features: [
        "Billetes con todas las medidas de seguridad",
        "Envío discreto y seguro",
        "Garantía de calidad 100%",
        "Soporte técnico incluido",
      ],
    },
    {
      id: 2,
      name: "Paquete Premium",
      price: 350000,
      originalPrice: 700000,
      bills: [
        { denomination: 100000, quantity: 3 },
        { denomination: 50000, quantity: 4 },
        { denomination: 20000, quantity: 5 },
      ],
      totalValue: 600000,
      description: "La opción más popular. Máxima rentabilidad garantizada.",
      features: [
        "Máxima calidad y precisión",
        "Envío express gratuito",
        "Garantía extendida",
        "Asesoría personalizada",
        "Kit de herramientas incluido",
      ],
      popular: true,
    },
    {
      id: 3,
      name: "Paquete VIP",
      price: 800000,
      originalPrice: 1600000,
      bills: [
        { denomination: 100000, quantity: 8 },
        { denomination: 50000, quantity: 6 },
        { denomination: 20000, quantity: 10 },
      ],
      totalValue: 1400000,
      description: "Para inversores serios. El paquete con mayor retorno de inversión.",
      features: [
        "Calidad premium garantizada",
        "Envío prioritario 24h",
        "Garantía de por vida",
        "Consultoría especializada",
        "Kit profesional completo",
        "Acceso a grupo VIP",
      ],
    },
  ]

  const testimonials = [
    {
      name: "Carlos M.",
      location: "Bogotá",
      rating: 5,
      comment:
        "Increíble! Compré el paquete premium y en una semana ya había recuperado mi inversión. Los billetes son perfectos.",
      verified: true,
    },
    {
      name: "María L.",
      location: "Medellín",
      rating: 5,
      comment: "Al principio tenía dudas, pero el proceso fue súper fácil. Ya voy por mi tercer paquete!",
      verified: true,
    },
    {
      name: "Andrés P.",
      location: "Cali",
      rating: 5,
      comment: "Excelente calidad y servicio. El envío llegó súper rápido y discreto. 100% recomendado.",
      verified: true,
    },
    {
      name: "Laura S.",
      location: "Barranquilla",
      rating: 5,
      comment: "No lo podía creer cuando vi la calidad. Parecen completamente reales. Muy satisfecha.",
      verified: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header con urgencia */}
      <div className="bg-red-600 text-white py-2 px-4 text-center">
        <div className="flex items-center justify-center space-x-2">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">¡OFERTA LIMITADA! Solo quedan 48 horas - Stock limitado</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <div className="mb-6">
            <Badge className="bg-green-600 text-white text-lg px-4 py-2 mb-4">⚡ NUEVO BILLETE G5 DISPONIBLE ⚡</Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Billetes G5 Colombianos</h1>
            <p className="text-xl text-gray-600 mb-6">
              La nueva generación de billetes con tecnología avanzada.
              <span className="text-green-600 font-semibold"> Aprovecha esta oportunidad única</span>
            </p>
          </div>

          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-8 text-left max-w-2xl mx-auto">
            <div className="flex items-center mb-2">
              <Shield className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="font-semibold text-yellow-800">Información Importante</span>
            </div>
            <p className="text-yellow-700 text-sm">
              Los billetes G5 son una edición especial con características únicas de seguridad. Disponibilidad limitada
              por regulaciones del Banco de la República.
            </p>
          </div>
        </header>

        {/* Características destacadas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6">
            <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">100% Seguros</h3>
            <p className="text-gray-600 text-sm">Todas las medidas de seguridad incluidas</p>
          </Card>
          <Card className="text-center p-6">
            <Truck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Envío Discreto</h3>
            <p className="text-gray-600 text-sm">Empaque especial y entrega confidencial</p>
          </Card>
          <Card className="text-center p-6">
            <Star className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Garantía Total</h3>
            <p className="text-gray-600 text-sm">Satisfacción garantizada o devolución</p>
          </Card>
        </div>

        {/* Paquetes */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Paquetes Disponibles</h2>
          <p className="text-center text-gray-600 mb-8">
            Elige el paquete que mejor se adapte a tus necesidades.
            <span className="text-red-600 font-semibold">¡Precios especiales por tiempo limitado!</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        </div>

        {/* Testimonios */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Lo que dicen nuestros clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Urgencia y contacto */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-8 text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">⏰ ¡No te quedes sin el tuyo!</h2>
          <p className="text-xl mb-6">Stock limitado - Solo 15 paquetes disponibles esta semana</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              <Phone className="w-5 h-5 mr-2" />
              Llamar Ahora: +57 300-123-4567
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-red-600 bg-transparent"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-gray-200">
          <div className="flex justify-center space-x-6 mb-4">
            <div className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              <span>+57 300-123-4567</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <span>info@billetesG5.com</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm">© 2024 Billetes G5 Colombia - Todos los derechos reservados</p>
          <p className="text-xs text-gray-400 mt-2">
            *Este sitio es solo para fines educativos sobre técnicas de estafa online
          </p>
        </footer>
      </div>

      <Chatbot />
    </div>
  )
}
