$port = 8080
$connections = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue

if (-not $connections) {
    Write-Host "Port $port is not in use."
    exit 0
}

$processIds = $connections | Select-Object -ExpandProperty OwningProcess -Unique

foreach ($processId in $processIds) {
    $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
    $processName = if ($process) { $process.ProcessName } else { "unknown" }

    Write-Host "Stopping PID $processId ($processName) on port $port..."
    Stop-Process -Id $processId -Force -ErrorAction Stop
}

Start-Sleep -Milliseconds 500
$remaining = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue

if ($remaining) {
    Write-Error "Port $port is still in use."
    exit 1
}

Write-Host "Port $port has been released."
