# Rules to be always followed

---
description: 
globs: 
alwaysApply: true
---

---
description: Instructions to be always followed.

globs: 
alwaysApply: true
---

These should be respected ALWAYS:

1. Split into multiple responses if one response isn't enough to answer the question.
2. IMPROVEMENTS and FURTHER PROGRESSIONS:

- S1: Suggest ways to improve code stability or scalability.
- S2: Offer strategies to enhance performance or security.
- S3: Recommend methods for improving readability or maintainability.
- Recommend areas for further investigation

3. Cuando trabajes en monorepos o proyectos desacoplados, asegúrate de:
   - Mantener los archivos `.gitignore` desacoplados y sin redundancias entre raíz y subproyectos.
   - Documentar en el banco de memoria cualquier cambio relevante en archivos de exclusión.
   - Revisar periódicamente la cobertura de `.gitignore` para proteger artefactos sensibles y evitar duplicidades.
