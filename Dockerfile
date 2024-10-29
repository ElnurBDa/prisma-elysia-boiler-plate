# https://github.com/hi-im-aurelio/Cookbook-dockerizing_bun_with_prisma-/blob/master/README.md
FROM oven/bun:1-debian

WORKDIR /app

RUN apt-get update

RUN apt-get install -y curl

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

ENV NODE_ENV=development

COPY package.json bun.lockb /app/

COPY prisma /app/prisma

RUN set -e && \
    bun install && \
    bun prisma generate

COPY . /app/

EXPOSE ${PORT}

CMD bun src/index.ts
