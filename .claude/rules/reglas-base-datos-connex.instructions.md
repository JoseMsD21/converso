---
description: Reglas para queries, migraciones y manejo de base de datos en CONNEX
paths:
  - "backend/src/db/**"
  - "backend/src/services/**"
---

Todas las queries usan parámetros nombrados con .input() de mssql. Nunca concatenes strings para construir queries SQL. Esto previene inyección SQL.

Los tipos SQL correctos para este proyecto son:
- IDs y strings cortos: db.mssql.NVarChar(50)
- Nombres y descripciones: db.mssql.NVarChar(200)
- Textos largos como mensajes: db.mssql.NVarChar(db.mssql.MAX)
- Booleanos: db.mssql.Bit
- Fechas: db.mssql.DateTime2
- Enteros: db.mssql.Int

Cada tabla nueva en initDb.js debe seguir este patrón exacto:
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[nombre_tabla]') AND type = N'U')
BEGIN
  CREATE TABLE [dbo].[nombre_tabla] (...)
END

Toda tabla nueva debe tener al menos: id NVARCHAR(50) PRIMARY KEY y createdAt DATETIME2 DEFAULT SYSUTCDATETIME().

Las migraciones de columnas nuevas a tablas existentes usan:
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('dbo.tabla') AND name = 'columna')
BEGIN ALTER TABLE dbo.tabla ADD columna TIPO NULL END

Nunca uses SELECT *. Siempre especifica las columnas que necesitas. Esto mejora el rendimiento y evita exponer campos sensibles.

Cuando hagas DELETE o UPDATE masivo, siempre incluye una condición WHERE. Nunca hagas DELETE o UPDATE sin WHERE.

Para paginación usa: OFFSET (@page * @pageSize) ROWS FETCH NEXT @pageSize ROWS ONLY con ORDER BY obligatorio.

El pool de conexiones está configurado con máximo 10 conexiones. No hagas múltiples conexiones paralelas innecesarias en el mismo request.

Cuando el proyecto migre a producción, trustServerCertificate debe ser false y encrypt debe ser true.