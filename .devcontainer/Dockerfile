FROM node:18.20.2

RUN apt update && apt install -y less man-db sudo

ARG USERNAME=node
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

WORKDIR /app

COPY .. .


ENV DEVCONTAINER=true
