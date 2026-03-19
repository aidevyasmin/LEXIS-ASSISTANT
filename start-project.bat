@echo off
TITLE Lexis Assistant - Project Starter
echo --------------------------------------------------
echo [1/3] Checking Database (PostgreSQL)...
netstat -ano | findstr ":5432" > nul
if %errorlevel% equ 0 (
    echo [OK] PostgreSQL is already running on port 5432.
) else (
    echo [WARN] PostgreSQL not detected on port 5432. 
    echo Attempting to start with Docker...
    docker-compose up -d
)

echo.
echo [2/3] Starting Backend (Port 5000)...
start "Backend Server" cmd /c "cd backend && npm start"

echo.
echo [3/3] Starting Frontend (Port 5173)...
start "Frontend Dev" cmd /c "cd frontend && npm run dev"

echo.
echo --------------------------------------------------
echo Success! All services are being started in new windows.
echo - Backend: /api/health
echo - Frontend: http://localhost:5173
echo --------------------------------------------------
pause
