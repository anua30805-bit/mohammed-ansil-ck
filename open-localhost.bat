@echo off
echo Starting Mohammed Ansil Portfolio Server...
start "" powershell -WindowStyle Hidden -ExecutionPolicy Bypass -File "%~dp0server.ps1"
timeout /t 1 /nobreak >nul
start http://localhost:8080/
