@echo off
node telescope %*

rem errorlevel 9009 means the command didn't work
if %errorlevel% == 9009 (
    goto :error
) else (
    goto :eof
)

:error
echo.
echo It looks like NodeJS is not installed yet. Node is required to run Telescope
