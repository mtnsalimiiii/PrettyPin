
FROM python:3.14-slim-bookworm

# Python Environment
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Working Directory
WORKDIR /app

# System Dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libmagic1 \
    && rm -rf /var/lib/apt/lists/*

# Install uv
RUN pip install --no-cache-dir uv

# Copy Requirements
COPY requirements.txt /app/

# Install Python Dependencies
RUN uv pip install --system --no-cache -r requirements.txt

# Copy Backend Source Code
COPY . .

# Create Directories
RUN mkdir -p /app/staticfiles /app/mediafiles

# Expose Django Port
EXPOSE 8000

# Run Gunicorn
CMD ["gunicorn", "prettyPin.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]
