FROM python:3.11-slim-buster as prod

RUN apt-get update && apt-get install -y \
  default-libmysqlclient-dev \
  gcc \
  pkg-config \
  openjdk-11-jdk \
  build-essential \
  && rm -rf /var/lib/apt/lists/*

RUN pip install poetry==1.4.2
RUN poetry config virtualenvs.create false

# Install dependencies and copy files
WORKDIR /
COPY ./pyproject.toml /backend/
RUN cd /backend && poetry install --only main

# Removing gcc
RUN apt-get purge -y \
  g++ \
  gcc \
  pkg-config \
  && rm -rf /var/lib/apt/lists/*

COPY . /backend

CMD ["/usr/local/bin/python", "-m", "backend"]