#!/bin/sh

rm -rf node_modules
while [ 1 ]
do
    sleep 1
done
npm i
npm npm fund
echo "hhhhhhhhhh" 
npx prisma generate
npm run start:dev game