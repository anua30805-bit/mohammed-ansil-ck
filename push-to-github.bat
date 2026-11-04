@echo off
title Push Mohammed Ansil Portfolio to GitHub
echo ========================================================
echo  Pushing Mohammed Ansil Portfolio to GitHub
echo  Repository: https://github.com/anua30805-bit/mohammed-ansil-ck.git
echo ========================================================
echo.
set "PATH=C:\Users\Ansil\AppData\Local\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd;%PATH%"

git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Your portfolio was successfully pushed to GitHub!
) else (
    echo [NOTE] If prompted, sign in via browser or enter your GitHub Personal Access Token (PAT).
)
echo.
pause
