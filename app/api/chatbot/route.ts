import { type NextRequest, NextResponse } from "next/server"

const chatbotResponses = {
  // Saludos y presentación
  greetings: [
    "¡Hola! Soy Ana, tu asesora personal de billetes G5. 😊 Tengo excelentes noticias sobre nuestros paquetes exclusivos. ¿Te interesa conocer la oportunidad que está cambiando la vida de muchas personas?",
    "¡Bienvenido! Me da mucho gusto saludarte. Soy Ana y trabajo directamente con la distribución de billetes G5. Justo ahora tenemos una promoción increíble que termina pronto. ¿Te gustaría que te cuente?",
    "¡Hola! Perfecto timing 🎯 Acabamos de recibir un nuevo lote de billetes G5 y estoy buscando personas serias para esta oportunidad. ¿Tienes unos minutos para que te explique?",
  ],

  // Información sobre paquetes - más convincente
  packages: [
    "Te voy a ser muy honesta... Esta oportunidad no es para todo el mundo, pero veo que tienes interés genuino. 💰\n\nTenemos 3 paquetes disponibles SOLO esta semana:\n\n🥉 **BÁSICO** - Inversión: $150.000\n• 2 billetes de $50.000 + 5 de $20.000\n• Valor real: $200.000\n• Ganancia: $50.000\n\n🥈 **PREMIUM** (MÁS POPULAR) - Inversión: $350.000\n• 3 billetes de $100.000 + 4 de $50.000 + 5 de $20.000\n• Valor real: $600.000\n• Ganancia: $250.000\n\n🥇 **VIP** - Inversión: $800.000\n• 8 billetes de $100.000 + 6 de $50.000 + 10 de $20.000\n• Valor real: $1.400.000\n• Ganancia: $600.000\n\n¿Cuál se ajusta mejor a tu presupuesto? La mayoría empieza con el Premium.",

    "Mira, te voy a explicar por qué esto funciona tan bien... 📈\n\nLos billetes G5 tienen características especiales que los bancos aún no detectan completamente. Es una ventana de oportunidad que no durará para siempre.\n\nMis clientes más exitosos:\n• Carlos de Bogotá: empezó con $350.000, ya lleva $2.1 millones ganados\n• María de Medellín: en 3 semanas recuperó su inversión inicial\n• Andrés de Cali: ahora es distribuidor y gana $500.000 semanales\n\n¿Te animas a ser el próximo caso de éxito?",
  ],

  // Preguntas sobre calidad - más técnico y convincente
  quality: [
    "Excelente pregunta! 🔍 La calidad es lo que nos diferencia de otros...\n\nNuestros billetes G5 incluyen:\n✅ Papel de algodón 100% auténtico (mismo proveedor del Banco de la República)\n✅ Tintas con cambio de color UV\n✅ Marca de agua perfecta con el rostro\n✅ Hilo de seguridad con microletras\n✅ Relieve táctil idéntico\n✅ Numeración secuencial real\n\nHe visto a clientes usarlos en bancos, cajeros, y comercios sin ningún problema. La tecnología G5 es revolucionaria.\n\n¿Quieres que te envíe un video de demostración?",

    "Te entiendo perfectamente... La calidad es lo MÁS importante. 💎\n\nTe voy a contar algo: trabajo con el mismo equipo que antes producía para entidades oficiales. Conocemos cada detalle, cada proceso.\n\nNuestros billetes pasan 3 pruebas:\n🔸 Máquina detectora de billetes falsos ✅\n🔸 Luz UV en bancos ✅\n🔸 Tacto de cajeros experimentados ✅\n\nTengo videos de clientes usándolos en diferentes lugares. ¿Te los envío por WhatsApp?",
  ],

  // Preguntas sobre envío - más seguro y discreto
  shipping: [
    "Tranquilo, el envío es nuestra especialidad 📦\n\nPor seguridad tuya y nuestra, manejamos:\n🔒 Empaque completamente discreto (parece documentos normales)\n🔒 Envío con empresa de confianza (no aparece nuestro nombre)\n🔒 Entrega en la dirección que prefieras\n🔒 Horario que tú elijas\n\nTiempos de entrega:\n• Bogotá: 24 horas\n• Medellín, Cali, Barranquilla: 48 horas\n• Otras ciudades: 2-3 días\n\n¿Prefieres pago contra entrega o por adelantado con descuento?",

    "El envío es súper seguro, no te preocupes 🚚\n\nUsamos el mismo método que usan las empresas grandes para enviar documentos importantes:\n\n📋 Empaque sin marcas sospechosas\n📋 Remitente con nombre comercial normal\n📋 Código de seguimiento para que veas dónde va\n📋 Entrega solo en tus manos (con cédula)\n\nEn 2 años nunca hemos tenido problemas. Nuestros clientes confían en nosotros.\n\n¿Ya tienes clara la dirección de entrega?",
  ],

  // Preguntas sobre pago - más opciones y seguridad
  payment: [
    "Perfecto! Manejamos varias opciones para tu comodidad 💳\n\n**PAGO CONTRA ENTREGA** (más popular):\n• Recibes primero, pagas después\n• Verificas la calidad antes de pagar\n• Cero riesgo para ti\n\n**PAGO ADELANTADO** (10% descuento):\n• Nequi/Daviplata: +57 300-123-4567\n• Bancolombia: Cuenta 123-456-789\n• Bitcoin/USDT (máxima privacidad)\n\n**PAGO MIXTO**:\n• 50% adelantado, 50% contra entrega\n• Descuento del 5%\n\n¿Cuál te parece más cómodo? La mayoría prefiere contra entrega para estar seguros.",

    "Te voy a ser honesta... 💰\n\nEl pago contra entrega es lo más popular porque:\n✅ Tú no arriesgas nada\n✅ Ves la calidad antes de pagar\n✅ Si no te convence, no compras\n\nPero si pagas adelantado te doy 10% de descuento porque:\n• Me ayudas con los gastos de producción\n• Puedo asegurar tu paquete\n• Tienes prioridad en la entrega\n\nAdemás, tengo referencias de más de 200 clientes satisfechos. ¿Quieres que te pase algunos contactos para que les preguntes?",
  ],

  // Urgencia y presión - más psicológica
  urgency: [
    "⚠️ Te voy a ser muy directa... ⚠️\n\nEsta oportunidad NO va a durar para siempre. El gobierno ya está investigando los billetes G5 y pronto van a actualizar los sistemas de detección.\n\nEsta semana tengo:\n🔴 Solo 8 paquetes Básicos\n🔴 Solo 5 paquetes Premium\n🔴 Solo 2 paquetes VIP\n\nYa vendí 15 paquetes desde el lunes. La gente que conoce esta oportunidad no la deja pasar.\n\n¿No quieres quedarte con las ganas cuando ya no esté disponible?",

    "🔥 ÚLTIMA SEMANA DISPONIBLE 🔥\n\nMira, te voy a contar algo que no le digo a todos...\n\nMi contacto en la fábrica me avisó que esta es la última producción de billetes G5. Después de esto, van a cambiar la tecnología y ya no será posible.\n\nLos clientes que saben esto están comprando 2 o 3 paquetes para asegurar su futuro.\n\nCarlos de Bogotá me escribió ayer: 'Ana, quiero 2 paquetes VIP más antes de que se acabe'\n\n¿Tú qué dices? ¿Aseguramos tu paquete hoy?",
  ],

  // Testimonios falsos - más creíbles y específicos
  testimonials: [
    "Te voy a mostrar mensajes REALES de mis clientes 📱\n\n💬 **Carlos M. - Bogotá** (ayer):\n'Ana, increíble! Usé los billetes en 3 bancos diferentes y ningún problema. Ya quiero el siguiente paquete'\n\n💬 **María L. - Medellín** (hace 2 días):\n'No lo podía creer cuando vi la calidad. Mi esposo que trabaja en un banco dice que son perfectos'\n\n💬 **Andrés P. - Cali** (esta semana):\n'Mejor inversión de mi vida. En 10 días recuperé todo y ya tengo ganancia de $180.000'\n\n¿Quieres que te pase sus números para que les preguntes directamente?",

    "Mira estos resultados REALES de esta semana 📊\n\n✅ Laura S. (Barranquilla): Ganancia $95.000 en 5 días\n✅ Diego R. (Bucaramanga): Recuperó inversión en 8 días\n✅ Camila T. (Pereira): Ya va por su tercer paquete\n✅ Roberto M. (Cartagena): Ahora es distribuidor\n\nTodos empezaron igual que tú, con dudas pero con ganas de mejorar su situación económica.\n\nLa diferencia es que ellos se decidieron rápido y ahora están cosechando los resultados.\n\n¿Quieres ser el próximo en esta lista?",
  ],

  // Información de contacto - más personal y directa
  contact: [
    "Perfecto! Me encanta tu decisión 🎉\n\nPara proceder inmediatamente:\n\n📱 **WhatsApp directo**: +57 300-123-4567\n(Soy yo, Ana, respondo personalmente)\n\n📧 **Email privado**: ana.g5ventas@gmail.com\n\n💬 **Telegram**: @AnaG5Colombia\n\nEstoy disponible hasta las 10pm todos los días. Cuando me escribas, dime:\n1. Qué paquete quieres\n2. Tu ciudad\n3. Si prefieres pago contra entrega o adelantado\n\n¿Por cuál medio prefieres que sigamos? WhatsApp es más rápido.",

    "¡Excelente! Vamos a asegurar tu paquete ahora mismo 🚀\n\nMi WhatsApp personal: **+57 300-123-4567**\n(Guárdalo como 'Ana G5')\n\nCuando me escribas, te voy a enviar:\n✅ Videos de demostración\n✅ Fotos de los billetes\n✅ Referencias de clientes\n✅ Proceso paso a paso\n\nTambién te voy a dar un código especial para que tengas descuento adicional del 5%.\n\n¿Me escribes ahora o prefieres que te llame?",
  ],

  // Manejo de objeciones
  objections: [
    "Entiendo perfectamente tus dudas... 🤔\n\nCuando empecé en esto, yo también tenía miedo. Pero mira:\n\n🔸 Llevamos 2 años sin ningún problema\n🔸 Más de 500 clientes satisfechos\n🔸 Cero reportes negativos\n🔸 Garantía total de calidad\n\nLa clave está en la calidad y en ser inteligente. No es para usar en cualquier lado, sino en lugares específicos donde funciona perfecto.\n\n¿Qué es lo que más te preocupa? Te puedo explicar todo con detalles.",

    "Te entiendo... Es normal tener dudas con algo tan bueno 💭\n\nPero piénsalo así:\n• ¿Cuánto gastas al mes en cosas innecesarias?\n• ¿Cuánto tiempo llevas buscando una oportunidad real?\n• ¿Qué pasaría si en 1 mes tuvieras $200.000 extra?\n\nMis clientes más exitosos son los que al principio tenían más dudas, pero se decidieron a intentar.\n\nSi no funciona como te digo, te devuelvo tu dinero. ¿Qué puedes perder?",
  ],

  // Respuestas por defecto - más personales
  default: [
    "Interesante lo que me preguntas... 🤔\n\nComo especialista en billetes G5, he visto que cada persona tiene dudas diferentes. Algunos se preocupan por la calidad, otros por la seguridad, otros por la rentabilidad.\n\n¿Qué es lo que más te interesa saber? ¿La calidad de los billetes, cómo funciona el proceso, o los resultados que han tenido otros clientes?",

    "Me gusta que hagas preguntas... eso demuestra que eres una persona seria 👍\n\nEn mis 2 años haciendo esto, he aprendido que la gente que más pregunta es la que mejores resultados obtiene después.\n\n¿Te gustaría que te cuente cómo empezó todo esto? ¿O prefieres que vayamos directo a ver qué paquete te conviene más?",

    "Perfecto, me gusta tu interés 😊\n\nCada día recibo muchas consultas, pero solo trabajo con personas que realmente están listas para cambiar su situación económica.\n\n¿Puedo preguntarte algo? ¿Qué te motivó a buscar esta oportunidad? ¿Necesitas dinero extra para algo específico?",
  ],
}

function getBotResponse(userMessage: string): string {
  const message = userMessage.toLowerCase()

  // Detectar saludos
  if (message.includes("hola") || message.includes("buenos") || message.includes("buenas") || message.includes("hey")) {
    return getRandomResponse(chatbotResponses.greetings)
  }

  // Detectar interés en paquetes
  if (
    message.includes("paquete") ||
    message.includes("precio") ||
    message.includes("costo") ||
    message.includes("cuanto") ||
    message.includes("opciones") ||
    message.includes("disponible")
  ) {
    return getRandomResponse(chatbotResponses.packages)
  }

  // Detectar preguntas sobre calidad
  if (
    message.includes("calidad") ||
    message.includes("autentico") ||
    message.includes("real") ||
    message.includes("detectar") ||
    message.includes("funciona") ||
    message.includes("seguro") ||
    message.includes("confiable")
  ) {
    return getRandomResponse(chatbotResponses.quality)
  }

  // Detectar preguntas sobre envío
  if (
    message.includes("envio") ||
    message.includes("entrega") ||
    message.includes("enviar") ||
    message.includes("recibir") ||
    message.includes("llega") ||
    message.includes("demora")
  ) {
    return getRandomResponse(chatbotResponses.shipping)
  }

  // Detectar preguntas sobre pago
  if (
    message.includes("pago") ||
    message.includes("pagar") ||
    message.includes("transferencia") ||
    message.includes("efectivo") ||
    message.includes("nequi") ||
    message.includes("daviplata")
  ) {
    return getRandomResponse(chatbotResponses.payment)
  }

  // Detectar urgencia o prisa
  if (
    message.includes("rapido") ||
    message.includes("urgente") ||
    message.includes("ya") ||
    message.includes("ahora") ||
    message.includes("cuando") ||
    message.includes("tiempo")
  ) {
    return getRandomResponse(chatbotResponses.urgency)
  }

  // Detectar solicitud de testimonios
  if (
    message.includes("opinion") ||
    message.includes("testimonio") ||
    message.includes("cliente") ||
    message.includes("recomend") ||
    message.includes("experiencia") ||
    message.includes("resultado")
  ) {
    return getRandomResponse(chatbotResponses.testimonials)
  }

  // Detectar solicitud de contacto
  if (
    message.includes("contacto") ||
    message.includes("whatsapp") ||
    message.includes("telefono") ||
    message.includes("comprar") ||
    message.includes("proceder") ||
    message.includes("siguiente")
  ) {
    return getRandomResponse(chatbotResponses.contact)
  }

  // Detectar objeciones o dudas
  if (
    message.includes("duda") ||
    message.includes("miedo") ||
    message.includes("riesgo") ||
    message.includes("problema") ||
    message.includes("legal") ||
    message.includes("peligro") ||
    message.includes("no se") ||
    message.includes("no estoy seguro")
  ) {
    return getRandomResponse(chatbotResponses.objections)
  }

  // Respuesta por defecto
  return getRandomResponse(chatbotResponses.default)
}

function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)]
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const response = getBotResponse(message)

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Chatbot API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
