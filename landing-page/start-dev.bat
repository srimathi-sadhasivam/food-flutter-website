@echo off
echo Starting WellFood Development Servers...
echo.

echo Starting Backend Server...
cd backend
start "Backend Server" cmd /k "npm start"

echo.
echo Starting Frontend Server...
cd ..
start "Frontend Server" cmd /k "npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:3017
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit this window...
pause > nul
