# -------------------------
# 1. BUILD STAGE
# -------------------------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (dev + prod)
RUN npm install

# Copy source
COPY . .

# Generate Prisma
RUN npx prisma generate

# Build TypeScript
RUN npm run build


# -------------------------
# 2. RUN STAGE
# -------------------------
FROM node:18-alpine AS runner

WORKDIR /app

# Copy only the dist folder & node_modules from build stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expose port
EXPOSE 3000

# Run the app
CMD ["node", "dist/index.js"]
