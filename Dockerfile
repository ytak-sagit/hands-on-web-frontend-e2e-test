# syntax = docker/dockerfile:1

ARG PW_VERSION=1.46.1

# base image
FROM mcr.microsoft.com/playwright:v${PW_VERSION}-jammy

# tiniのインストール
# Avoid running nodejs process as PID 1 (use tini)
# 参考: https://zenn.dev/jrsyo/articles/e42de409e62f5d
RUN apt update \
    && apt -qq install -y --no-install-recommends tini \
    && rm -rf /var/lib/apt/lists/*
EXPOSE 3000

# base image の既存ユーザ 'pwuser' を選択
ARG USERNAME=pwuser
USER ${USERNAME}

# 作業ディレクトリの指定
WORKDIR /home/${USERNAME}/web-app
RUN mkdir node_modules

# tiniでnodeを起動する
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node"]
