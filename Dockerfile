FROM continuumio/miniconda3:latest
ENV LANG=C.UTF-8 LC_ALL=C.UTF-8

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install curl -y
RUN apt-get install nginx -y
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && apt-get install -y nodejs


RUN mkdir -p /backend

COPY backend /backend
COPY ./scripts /scripts
RUN chmod +x ./scripts

RUN conda env create -f /backend/requirements.yml
RUN conda update -n base -c defaults conda
ENV PATH /opt/conda/envs/motion_assignment/bin:$PATH
COPY backend/requirements.yml /backend/requirements.yml
RUN echo "source activate motion_assignment">~/.bashrc

WORKDIR /backend
