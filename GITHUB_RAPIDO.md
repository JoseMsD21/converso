# 🚀 INSTRUCCIONES RÁPIDAS: Subir a GitHub en 3 Pasos

## Paso 1️⃣: Crear Repositorio en GitHub (2 minutos)

1. Ve a: **https://github.com/new**
2. Completa:
   - **Repository name**: `converso`
   - **Description**: `Chat application with Fastify and React`
   - **Visibility**: `Public` (o `Private` si prefieres)
3. Click en **"Create repository"**

---

## Paso 2️⃣: Copiar URL del Repositorio

Después de crear el repo, GitHub te mostrará una URL así:

```
https://github.com/TU_USUARIO/converso.git
```

**O si usas SSH:**

```
git@github.com:TU_USUARIO/converso.git
```

---

## Paso 3️⃣: Ejecutar en PowerShell (Windows)

**Reemplaza `TU_USUARIO` por tu usuario de GitHub**

```powershell
cd "c:\Users\USER\OneDrive\Documents\CODIGO-PORTAFOLIO-PAGINAS-APP-CREACIONES\CONVERSO"

git remote add origin https://github.com/JoseMsD21/converso.git

git branch -M main

git push -u origin main
```

---

## ✅ Confirmación

Si todo salió bien, verás:

```
Enumerating objects: 34, done.
...
To https://github.com/TU_USUARIO/converso.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## 🔓 Si GitHub Pide Contraseña

### Opción 1: Personal Access Token (Recomendado)

1. Ve a: https://github.com/settings/tokens/new
2. Crea un token con permisos: `repo`, `workflow`
3. Copia el token
4. Cuando Git pida contraseña, **pega el token**

### Opción 2: SSH Key

```bash
ssh-keygen -t ed25519 -C "tu@email.com"
# Acepta todo presionando Enter

# Copiar clave pública
cat ~/.ssh/id_ed25519.pub | clip

# En GitHub: Settings → SSH Keys → New SSH Key → Pegar
```

---

## 🎉 ¡Listo!

Tu proyecto está en GitHub en:

```
https://github.com/TU_USUARIO/converso
```

---

## 📚 Para Más Detalles

Lee estos archivos:
- **GITHUB_SETUP.md** - Guía completa con opciones
- **GIT_CONFIG.md** - Configuración local de Git

---

*¡Éxito! Tu proyecto ya está en la nube 🚀*
