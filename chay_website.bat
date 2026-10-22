@echo off
chcp 65001 >nul
echo ===================================================================
echo     WEBSITE PORTFOLIO & CV 3D - VO MINH KIET (CO DIEN TU)
echo ===================================================================
echo.
echo Dang mo website tren trinh duyet tai: http://localhost:5173
echo.
start http://localhost:5173
npx vite --port 5173 --host
pause
