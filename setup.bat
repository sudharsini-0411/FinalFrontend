@echo off
echo ========================================
echo Recharge Application Setup
echo ========================================
echo.

echo Installing dependencies...
cd client
call npm install

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the application, run:
echo   cd client
echo   npm start
echo.
echo The app will open at http://localhost:3000
echo.
pause
