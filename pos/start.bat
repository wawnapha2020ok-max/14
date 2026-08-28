@echo off
title Sampha Ra POS & Storefront
echo ========================================================
echo   👜 SAMPHA RA (สัมภาระ) - POS & Storefront Web Server
echo ========================================================
echo   Opening browser at: http://localhost:8080
echo ========================================================

start "" "http://localhost:8080"
python server.py

if errorlevel 1 (
    echo Python was not found or server closed. Opening index.html directly...
    start "" "index.html"
)
pause
