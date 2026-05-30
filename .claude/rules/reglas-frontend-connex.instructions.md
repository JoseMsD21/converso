---
description: Reglas específicas para todo el código frontend de CONNEX
paths:
  - "frontend/**"
---

Los componentes nunca llaman directamente a apiClient. Siempre usan los servicios de frontend/src/services/.

El flujo de autenticación es: Landing → Login → Dashboard. Landing llama setShowLanding(false). Login llama POST /api/auth/login, guarda el token con localStorage.setItem('connex_token', token) y luego llama setIsAuthenticated(true).

Todos los componentes son functional components con hooks. Nunca uses class components.

Los useEffect que hacen llamadas async siempre incluyen una variable cancelled para evitar setState en componentes desmontados:
let cancelled = false;
const load = async () => { const data = await service.get(); if (!cancelled) setState(data); };
load();
return () => { cancelled = true; };

Los errores de API siempre se muestran al usuario en pantalla. Nunca solo en console.error().

El diseño usa dark theme con estas clases base: bg-gray-900 (fondo), bg-gray-800 (superficies), border-gray-700 (bordes), text-white (texto principal), text-gray-400 (texto secundario), bg-blue-600 (acción primaria).

Los iconos siempre son de lucide-react. Nunca uses emojis como iconos en la interfaz.

Los formularios validan los inputs antes de hacer cualquier llamada a la API. Muestra mensajes de error claros al usuario, no solo alerts del navegador.

Los estados de carga siempre muestran un indicador visual. Nunca dejes la pantalla en blanco mientras carga.

Cuando agregues un servicio nuevo en services/, también crea o actualiza el hook correspondiente en hooks/ si el servicio tiene estado complejo.

Nunca uses localStorage para guardar datos sensibles más allá del token JWT. No guardes contraseñas, datos de tarjetas ni información personal.