# Reglas para proyectos Vue + Pinia + Tailwind (Expert)

---
description: Reglas avanzadas para desarrollo profesional usando Vue, Pinia y TailwindCSS.

globs:

- '**/*.vue'
- '**/*.ts'
- '**/*.js'
- '**/*.css'
- '**/*.scss'

alwaysApply: true

---

## 1. Estructura y Componentización

- Utiliza la composición de componentes para maximizar la reutilización y el aislamiento.
- Prefiere la Composition API sobre la Options API para nuevos componentes.
- Mantén los componentes pequeños, enfocados y con una sola responsabilidad.

## 2. Estado global con Pinia

- Centraliza el estado compartido en stores Pinia bien tipados.
- No abuses del estado global: solo comparte lo necesario.
- Usa getters para lógica derivada y actions para lógica de negocio.
- Mantén los stores limpios y documentados.

## 3. TailwindCSS

- Usa clases utilitarias de Tailwind para estilos rápidos y consistentes.
- Evita el uso excesivo de clases personalizadas; aprovecha la configuración de Tailwind.
- Utiliza variantes responsivas y de estado (hover, focus, etc.) para accesibilidad y adaptabilidad.

## 4. Buenas prácticas generales

- Aplica el principio DRY y los principios SOLID en la arquitectura de componentes y stores.
- Escribe código tipado (TypeScript) siempre que sea posible.
- Documenta componentes, stores y utilidades complejas.
- Escribe pruebas unitarias para lógica crítica.

## 5. Accesibilidad y rendimiento

- Prioriza la accesibilidad (a11y) en los componentes.
- Optimiza el rendimiento usando lazy loading, splitting y buenas prácticas de renderizado.

## 6. Refactorización y mejora continua

- Refactoriza frecuentemente para mantener la calidad y escalabilidad.
- Revisa y actualiza dependencias de forma regular.

## 7. Gestión de .gitignore en monorepos Vue

- Mantén un `.gitignore` específico en la raíz del monorepo para reglas globales (IDE, Docker, Python, etc.).
- Añade un `.gitignore` dedicado en el subproyecto `frontend/` solo para artefactos de Node/Vue (node_modules, dist, logs, .env, etc.).
- Evita duplicar reglas entre ambos archivos y revisa periódicamente su cobertura.
- Documenta en el banco de memoria cualquier cambio relevante en `.gitignore` que afecte la protección de artefactos sensibles o el flujo de trabajo.
