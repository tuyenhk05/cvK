@echo off
chcp 65001 >nul
echo ===================================================================
echo     DANG TAI (PUSH) WEBSITE LEN GITHUB & BAT GITHUB PAGES
echo ===================================================================
echo.
echo Buoc 1: Hay tao 1 repository moi tren GitHub (https://github.com/new)
echo         (Dat ten vi du: cv-kiet hoac portfolio-vo-minh-kiet, de Public)
echo.
set /p REPO_URL="Dan link GitHub Repository cua ban vao day (vi du: https://github.com/user/cv-kiet.git): "

if "%REPO_URL%"=="" (
    echo.
    echo Ban chua nhap link repository. Vui long chay lai file nay!
    pause
    exit /b
)

echo.
echo Dang ket noi voi GitHub: %REPO_URL% ...
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main

echo.
echo Dang day source code len GitHub ...
git push -u origin main

echo.
echo ===================================================================
echo   HOAN TAT!
echo   Hay vao Repository tren GitHub -> Vao muc Settings -> Pages
echo   Tai phan Build and deployment -> Source chon: "GitHub Actions"
echo   (He thong se tu dong build va cap domain mien phi cho website!)
echo ===================================================================
echo.
pause
