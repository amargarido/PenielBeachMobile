#!/bin/bash

ionic build --prod --source-map && \
sed -i 's|<base href=\"/\" \/>|<base href=\"\/mobile\/\" \/>|' ./www/index.html && \
sed -i 's|Dev Beach|Site Beach|' ./www/index.html

