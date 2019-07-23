FROM node
COPY ./frontend /frontend
WORKDIR /frontend

RUN npm install
RUN npm run-script build


FROM nginx

COPY default.conf /etc/nginx/conf.d/

COPY --from=0 /frontend/build /usr/share/nginx/html/build
