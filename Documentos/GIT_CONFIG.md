# 📝 Configuración de Git Local - Converso

## ✅ Estado Actual

Tu proyecto Converso ya tiene:

```
✅ Repositorio Git inicializado
✅ Primer commit creado (34 archivos, 5448 líneas)
✅ .gitignore configurado
✅ Esperando conexión con GitHub
```

---

## 🔍 Verificar Configuración Local

```bash
# Ver configuración global de Git
git config --global --list

# Ver configuración local del proyecto
git config --local --list

# Ver el último commit
git log --oneline -1

# Ver estado
git status
```

---

## ⚙️ Configuración Recomendada de Git

### Editor por defecto (opcional)

```bash
# Usar VS Code como editor
git config --global core.editor "code --wait"

# Usar Notepad
git config --global core.editor notepad
```

### Alias útiles (opcional)

```bash
# Crear alias para comandos comunes
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.log-graph "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

---

## 🔐 Configuración de Identidad

Si NO configuraste tu email y nombre, hazlo ahora:

```bash
# Global (aplica a todos los proyectos)
git config --global user.email "tu-email@example.com"
git config --global user.name "Tu Nombre Completo"

# Local (solo para este proyecto)
git config --local user.email "tu-email@example.com"
git config --local user.name "Tu Nombre Completo"
```

---

## 📊 Información del Commit Inicial

**Hash**: `0b84f41`
**Autor**: Tu Nombre
**Mensaje**: 
```
feat: Initial commit - Converso chat application setup

- Backend: Fastify server con manejo de errores centralizado
- Frontend: React + Vite + Tailwind CSS
- Estructura profesional y escalable
- Documentación completa
```

**Archivos incluidos**: 34
**Líneas de código**: 5,448

---

## 🔗 Próximos Pasos para GitHub

### 1. Crear repositorio en GitHub

Ve a: https://github.com/new

Llena:
- **Repository name**: `converso`
- **Description**: `Chat application with Fastify and React`
- **Visibility**: `Public` o `Private`
- **NO** inicialices con README (ya lo tenemos)

### 2. Conectar con GitHub

```bash
cd "c:\Users\USER\OneDrive\Documents\CODIGO-PORTAFOLIO-PAGINAS-APP-CREACIONES\CONVERSO"

# Opción 1: HTTPS (más fácil para empezar)
git remote add origin https://github.com/TU_USUARIO/converso.git
git branch -M main
git push -u origin main

# Opción 2: SSH (recomendado a largo plazo)
git remote add origin git@github.com:TU_USUARIO/converso.git
git branch -M main
git push -u origin main
```

### 3. Autenticación

**HTTPS**: Usa Personal Access Token (PAT)
- Ve a: https://github.com/settings/tokens/new
- Permisos: `repo`, `workflow`
- Copia el token
- Úsalo como contraseña

**SSH**: Configura SSH key
- Genera: `ssh-keygen -t ed25519 -C "tu-email@example.com"`
- Agrega en: https://github.com/settings/keys

---

## 📂 Archivos .gitignore Importante

Tu `.gitignore` ya protege:

```
node_modules/          ✅ No subir dependencias
.env                   ✅ No subir variables sensibles
dist/                  ✅ No subir builds
.DS_Store              ✅ No subir archivos del sistema
.vscode/               ✅ No subir config personal
```

---

## 🚀 Cómo Hacer Push Después de Cambios

```bash
# 1. Ver qué cambió
git status

# 2. Agregar cambios
git add .                    # Agregar todo
# O específicamente:
git add src/components/      # Solo componentes
git add backend/             # Solo backend

# 3. Crear commit
git commit -m "feat: Descripción del cambio"

# 4. Hacer push a GitHub
git push

# O si es rama nueva:
git push -u origin nombre-rama
```

---

## 📋 Buenas Prácticas de Commits

### Formato de mensaje

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Tipos permitidos

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (sin afectar código)
- `refactor`: Refactorización de código
- `perf`: Mejoras de performance
- `test`: Agregar o modificar tests
- `chore`: Cambios en build, dependencias

### Ejemplos

```bash
# Bueno
git commit -m "feat(auth): Agregar autenticación con JWT"
git commit -m "fix(chat): Corregir error al cargar mensajes"
git commit -m "docs: Actualizar README con instrucciones de setup"

# También válido (simple)
git commit -m "feat: Agregar nueva funcionalidad"
```

---

## 🌿 Manejo de Ramas

### Crear rama para desarrollo

```bash
# Crear y cambiar a rama nueva
git checkout -b feature/nueva-feature

# Hacer cambios y commitear
git add .
git commit -m "feat: Agregar nueva feature"

# Hacer push de la rama
git push -u origin feature/nueva-feature

# En GitHub: Crear Pull Request
```

### Cambiar entre ramas

```bash
# Ver ramas disponibles
git branch

# Ver ramas remotas
git branch -r

# Cambiar a otra rama
git checkout main
git checkout feature/xyz

# Crear y cambiar en uno
git checkout -b feature/nueva-rama
```

### Mergear ramas

```bash
# Cambiar a main
git checkout main

# Traer cambios remotos
git pull origin main

# Mergear rama feature
git merge feature/nueva-feature

# Hacer push
git push origin main
```

---

## 🐛 Errores Comunes

### Error: "fatal: not a git repository"

```bash
# Estás fuera del directorio del proyecto
cd "c:\Users\USER\OneDrive\Documents\CODIGO-PORTAFOLIO-PAGINAS-APP-CREACIONES\CONVERSO"
git status  # Ahora debería funcionar
```

### Error: "Please tell me who you are"

```bash
# No has configurado tu identidad
git config --global user.email "tu@email.com"
git config --global user.name "Tu Nombre"
```

### Error: "fatal: destination path 'CONVERSO' already exists"

```bash
# Intenta clonar pero ya existe
# Simplemente usa el directorio existente
cd CONVERSO
git status
```

### Error: "Permission denied (publickey)"

```bash
# Problem con SSH
# Solución: Usa HTTPS temporalmente o configura SSH key

# Ver si SSH funciona
ssh -T git@github.com

# Si no, usa HTTPS
git remote set-url origin https://github.com/USER/repo.git
```

---

## 🔄 Ver Cambios

```bash
# Ver cambios sin staged
git diff

# Ver cambios staged
git diff --staged

# Ver cambios en un archivo
git diff archivo.js

# Ver último commit
git show

# Ver historial visual
git log --graph --oneline --all
```

---

## 💾 Backup Local

```bash
# Crear backup de la rama actual
git branch backup-$(date +%Y%m%d)

# Ver todas las ramas
git branch -a

# Restaurar desde backup
git checkout backup-20260222
```

---

## 🎯 Checklist

- [ ] Git está inicializado localmente
- [ ] Tengo un commit inicial
- [ ] He configurado mi email y nombre
- [ ] Tengo cuenta en GitHub
- [ ] Estoy listo para crear repo en GitHub
- [ ] He revisado GITHUB_SETUP.md
- [ ] Entiendo cómo hacer commits y push

---

## 📚 Recursos Útiles

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

---

## 🚀 Próximo Paso

👉 Lee [GITHUB_SETUP.md](GITHUB_SETUP.md) para conectar con GitHub

---

*Configuración completada: 22/02/2026*
*Proyecto: Converso*

