# Etapa 1: build de la app
FROM node:18-alpine AS builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Compilar el proyecto NestJS (salida en dist/)
RUN npm run build


# Etapa 2: imagen final y ligera
FROM node:18-alpine

WORKDIR /app

# Copiar solo lo necesario desde la etapa anterior
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Puerto expuesto (el default de NestJS)
EXPOSE 3000

# Comando de inicio
CMD ["node", "dist/main"]
