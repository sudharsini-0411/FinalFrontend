@echo off
echo Checking Backend Server Status...

curl -s http://localhost:5000/api/users > nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Backend server is running on http://localhost:5000
) else (
    echo ❌ Backend server is NOT running
    echo.
    echo To start the backend server:
    echo 1. Open a new terminal
    echo 2. Run: cd "Backend(Mern)"
    echo 3. Run: npm install
    echo 4. Run: npm run dev
    echo.
    echo Or use the start-app.bat file to start both servers
)

pause