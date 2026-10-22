@echo off
chcp 65001 >nul
echo ===================================================================
echo   CHAY BAN PRODUCTION BUILD (DIST) - WEBSITE VO MINH KIET
echo ===================================================================
echo.
echo Dang mo trinh duyet tai: http://localhost:8080
echo.
start http://localhost:8080
python -m http.server 8080 -d dist
pause
