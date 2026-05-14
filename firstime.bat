@echo off

echo Checking API dependencies...
if exist "%~dp0api\node_modules" (
    echo API already installed. Skipping...
) else (
    echo Installing API dependencies...
    start /wait cmd /c "cd /d "%~dp0api" && npm i && npm install bcryptjs"
)

echo Checking UI dependencies...
if exist "%~dp0ui\node_modules" (
    echo UI already installed. Skipping...
) else (
    echo Installing UI dependencies...
    start /wait cmd /c "cd /d "%~dp0ui" && npm i"
)

echo Done!
pause