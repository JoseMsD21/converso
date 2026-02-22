# 🚀 GUÍA: Subir Converso a GitHub

Tu proyecto ya ha sido inicializado con Git localmente. Ahora sigue estos pasos para subirlo a GitHub:

---

## 📝 Paso 1: Crear un Repositorio en GitHub

### Opción A: GitHub Web (Recomendado)

1. Ve a [github.com/new](https://github.com/new)
2. Llena los campos:
   - **Repository name**: `converso` (o el nombre que prefieras)
   - **Description**: `Chat application built with Fastify and React`
   - **Visibility**: Elige `Public` o `Private` según necesites
   - **Initialize this repository with**: Deja todo sin marcar (ya tenemos archivos)

3. Click en **"Create repository"**

### Opción B: GitHub CLI

```bash
gh repo create converso --public --source=. --remote=origin --push
```

---

## 🔗 Paso 2: Conectar Repositorio Local con GitHub

### En PowerShell (Windows):

```powershell
cd "c:\Users\USER\OneDrive\Documents\CODIGO-PORTAFOLIO-PAGINAS-APP-CREACIONES\CONVERSO"

# Agregar remoto (reemplaza USERNAME por tu usuario de GitHub)
git remote add origin https://github.com/USERNAME/converso.git

# Cambiar rama a main (GitHub usa main por defecto)
git branch -M main

# Hacer push del primer commit
git push -u origin main
```

### En Bash/Mac/Linux:

```bash
cd CONVERSO

git remote add origin https://github.com/USERNAME/converso.git
git branch -M main
git push -u origin main
```

---

## 🔐 Paso 3: Autenticación (Si es necesario)

Si GitHub te pide autenticación:

### Opción A: Personal Access Token (PAT)

1. Ve a [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Click en **"Generate new token"**
3. Dale estos permisos:
   - `repo` (Acceso completo a repositorios)
   - `workflow` (Acceso a GitHub Actions)
4. Click en **"Generate token"** y **copia el token**
5. Cuando Git te pida contraseña, pega el token

### Opción B: SSH Key (Recomendado a largo plazo)

```bash
# Generar SSH key (si no lo has hecho)
ssh-keygen -t ed25519 -C "tu-email@example.com"

# En Windows: Copiar la clave pública
cat ~/.ssh/id_ed25519.pub | clip

# En Mac/Linux: Copiar la clave pública
cat ~/.ssh/id_ed25519.pub | pbcopy

# Ir a GitHub → Settings → SSH and GPG keys → New SSH key
# Pegar la clave pública

# Luego usar SSH en lugar de HTTPS
git remote set-url origin git@github.com:USERNAME/converso.git
```

---

## 📤 Paso 4: Hacer Push

```bash
# Si ya configuraste el remoto anterior
git push -u origin main

# Confirmación esperada:
# ✓ Todo enviado a GitHub
```

---

## ✅ Verificar que está en GitHub

1. Ve a `https://github.com/USERNAME/converso`
2. Verifica que todos los archivos estén ahí
3. Navega por el código

---

## 📊 Resumen del Commit

**Archivos incluidos en el primer commit:**

```
✅ 8 archivos de documentación (README, CAMBIOS, GUIA_DESARROLLADORES, etc)
✅ Backend: 8 archivos (controllers, services, middleware, utils, routes)
✅ Frontend: 10 archivos (componentes, servicios, hooks, config)
✅ Configuración: package.json, vite.config.js, tailwind.config.js, etc
✅ .gitignore configurado
```

**Total**: 34 archivos, 5448 líneas de código

---

## 🔄 Próximos Comandos Útiles

### Después de hacer cambios:

```bash
# Ver estado
git status

# Ver cambios específicos
git diff

# Agregar archivos (opción 1: todos)
git add .

# Agregar archivos (opción 2: específico)
git add src/

# Hacer commit
git commit -m "feat: Descripción del cambio"

# Hacer push
git push
```

### Ver historial:

```bash
# Ver commits
git log --oneline

# Ver rama actual
git branch

# Ver remoto
git remote -v
```

---

## 🌿 Crear Ramas para Desarrollo

```bash
# Crear rama de feature
git checkout -b feature/nueva-funcionalidad

# Hacer cambios y commit
git add .
git commit -m "feat: Agregar nueva funcionalidad"

# Hacer push de la rama
git push -u origin feature/nueva-funcionalidad

# En GitHub: Crear Pull Request (PR)
```

---

## 📋 Estructura de Commits Recomendada

```
feat: Agregar autenticación con JWT
fix: Corregir validación de emails
docs: Actualizar README
refactor: Simplificar chatService.js
test: Agregar tests para login
chore: Actualizar dependencias
```

---

## 🚨 Si Algo Sale Mal

### Error: "fatal: not a git repository"
```bash
cd "c:\Users\USER\OneDrive\Documents\CODIGO-PORTAFOLIO-PAGINAS-APP-CREACIONES\CONVERSO"
git init
git add .
git commit -m "Initial commit"
```

### Error: "Permission denied (publickey)"
- Solución: Usar Personal Access Token en lugar de SSH

### Error: "Updates were rejected"
```bash
# Traer cambios remotos
git pull origin main

# Resolver conflictos si los hay
# Luego hacer push nuevamente
git push
```

---

## 📚 Archivos Importantes en GitHub

Una vez en GitHub, asegúrate de:

1. **README.md** - GitHub lo mostrará en la página principal
2. **.gitignore** - Protege `node_modules` y `.env`
3. **QUICK_START.md** - Fácil acceso para nuevos contribuidores
4. **GUIA_DESARROLLADORES.md** - Onboarding del equipo

---

## 🎯 Checklist Final

- [ ] Creé un repositorio en GitHub
- [ ] Agregué el remoto con `git remote add origin`
- [ ] Hice push a GitHub con `git push -u origin main`
- [ ] Verifiqué que los archivos estén en GitHub
- [ ] Configuré mi email y nombre en Git
- [ ] Tengo acceso para hacer futuros pushes

---

## 💡 Tips

- **Commits pequeños y frecuentes** son mejor que uno grande
- **Escribe mensajes descriptivos** en tus commits
- **Protege la rama main** en GitHub (Settings → Branches → Add rule)
- **Usa Pull Requests** para revisar código antes de mergear
- **Crea un CHANGELOG.md** si es proyecto público

---

## 📞 Siguientes Pasos

1. ✅ Sube el proyecto a GitHub (este paso)
2. ⏳ Agregar CI/CD (GitHub Actions)
3. ⏳ Proteger rama main con reviews
4. ⏳ Agregar issues y project board
5. ⏳ Documentar cómo contribuir (CONTRIBUTING.md)

---

## 🎉 ¡Listo!

Tu proyecto Converso está en GitHub. Ahora puedes:
- 📌 Compartir el código con el equipo
- 🔄 Colaborar en el desarrollo
- 📊 Trackear cambios y versiones
- 🚀 Hacer deploy automático
- 📈 Medir estadísticas del proyecto

**¡A compartir código! 🚀**

---

*Generado: 22/02/2026*
*Proyecto: Converso*

