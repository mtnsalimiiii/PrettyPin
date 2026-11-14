
FROM node:22-alpine

# Working Directory
WORKDIR /app

# Copy Package Files
COPY package.json package-lock.json ./

# Install Dependencies
RUN npm ci

# Copy Frontend Source Code
COPY . .

# API URL
ARG VITE_API_URL=/api
ENV VITE_API_URL=${VITE_API_URL}

# Build React Application
RUN npm run build

# Expose Vite Preview Port
EXPOSE 4173

# Start Frontend
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]
