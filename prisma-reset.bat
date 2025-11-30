@echo off
echo Running "prisma migrate reset"...
npx prisma migrate reset --force

echo.
echo Running "prisma migrate dev"...
npx prisma migrate dev

echo.
echo Running "prisma generate"...
npx prisma generate

echo.
echo Done!
pause
