#!/bin/sh
rm -rf node_modules
npm i
npm npm fund
npx prisma generate
npm run start:dev