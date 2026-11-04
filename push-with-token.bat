@echo off
title Push to GitHub with Personal Access Token
set "PATH=C:\Users\Ansil\AppData\Local\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd;%PATH%"

echo ========================================================
echo   Mohammed Ansil Portfolio - Push to GitHub with Token
echo ========================================================
echo.
echo Direct Link to Create Token:
echo https://github.com/settings/tokens/new
echo.
echo Steps:
echo  1. Enter Note: "portfolio"
echo  2. Select Expiration: 30 days / No expiration
echo  3. Select Scopes: Tick "repo" (Full control of repositories)
echo  4. Click "Generate token" and copy it
echo.
echo ========================================================
echo.
set /p "GITHUB_TOKEN=Paste your GitHub Token (starts with ghp_) and press Enter: "

if "%GITHUB_TOKEN%"=="" (
    echo [ERROR] Token cannot be empty!
    pause
    exit /b 1
)

echo.
echo Pushing repository to GitHub...
git push https://anua30805-bit:%GITHUB_TOKEN%@github.com/anua30805-bit/mohammed-ansil-ck.git main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo  [SUCCESS] Successfully pushed to GitHub!
    echo  Repo URL: https://github.com/anua30805-bit/mohammed-ansil-ck
    echo ========================================================
) else (
    echo [ERROR] Push failed. Please check your token and repo permissions.
)

echo.
pause
