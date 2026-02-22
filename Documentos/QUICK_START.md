# ⚡ Quick Start - Converso

## Iniciar la Aplicación (Windows)

### Terminal 1 - Backend
```powershell
cd backend
& ".\node_modules\.bin\nodemon.cmd" "src\index.js"
```
✅ Backend disponible en: `http://localhost:4000`

### Terminal 2 - Frontend
```powershell
cd frontend
npm run dev
```
✅ Frontend disponible en: `http://localhost:5173`

---

## Verificar que todo funciona

### Backend Health Check
```powershell
curl http://localhost:4000/api/health
```
Respuesta esperada:
```json
{
  "status": "OK",
  "service": "Converso Backend",
  "timestamp": "2026-02-22T22:00:00.000Z",
  "environment": "development"
}
```

### Conversaciones
```powershell
curl http://localhost:4000/api/chat/conversations
```
Respuesta esperada:
```json
{
  "success": true,
  "data": {
    "total": 0,
    "conversations": []
  },
  "timestamp": "2026-02-22T22:00:00.000Z"
}
```

---

## 📁 Archivos Importantes

| Archivo | Descripción |
|---------|-------------|
| [README.md](README.md) | Documentación completa |
| [CAMBIOS.md](CAMBIOS.md) | Resumen de todos los cambios |
| `backend/.env` | Variables de entorno del backend |
| `frontend/.env` | Variables de entorno del frontend |
| `backend/src/index.js` | Punto de entrada del backend |
| `frontend/src/App.jsx` | Componente principal del frontend |

---

## 🔧 Troubleshooting

### Error: "Port 4000 already in use"
```powershell
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

### Error: "Cannot find module"
```powershell
cd backend
rm -r node_modules -Force
npm install

cd ../frontend
rm -r node_modules -Force
npm install
```

### Frontend no conecta al backend
Verificar que `VITE_API_URL` en `frontend/.env` sea correcto:
```
VITE_API_URL=http://localhost:4000/api
```

---

## 💡 Tips

- El backend recarga automáticamente con **nodemon** al editar archivos
- El frontend recarga en tiempo real con **Vite**
- Los estilos en `index.css` se aplican automáticamente
- Los hooks en `src/hooks/` pueden reutilizarse en varios componentes

---

## 📝 Próximo Paso

Ver [CAMBIOS.md](CAMBIOS.md) para entender todas las mejoras realizadas.

