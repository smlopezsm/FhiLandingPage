# ==============================================================================
# Stage 1: Build stage with Node.js LTS (Alpine)
# ==============================================================================
FROM node:20-alpine AS build

WORKDIR /app

# Leverage Docker layer caching: install dependencies before copying source code
COPY package.json package-lock.json ./

# Clean, reproducible installation of exact locked dependencies
RUN npm ci

# Copy project source code (excluding items specified in .dockerignore)
COPY . .

# Compile application (TypeScript verification + Vite production build)
RUN npm run build

# ==============================================================================
# Stage 2: Production stage with lightweight Nginx Alpine
# ==============================================================================
FROM nginx:1.27-alpine AS production

WORKDIR /usr/share/nginx/html

# Clean default Nginx placeholder files
RUN rm -rf ./*

# Copy custom Nginx configuration optimized for React SPA & Three.js 3D assets
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from the build stage
COPY --from=build /app/dist ./

# Expose HTTP port
EXPOSE 80

# Start Nginx server in the foreground
CMD ["nginx", "-g", "daemon off;"]
