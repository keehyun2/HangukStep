# HangukStep Database Initialization Script (Windows / PowerShell)
# Creates the database and runs the schema.
# Windows counterpart of init-db.sh (uses password auth instead of `sudo -u postgres`).

$ErrorActionPreference = 'Stop'

# Default values
$DB_NAME     = 'hangukstep'
$DB_USER     = 'postgres'
$SCHEMA_FILE = 'src\main\resources\db\schema.sql'

Write-Host '================================'
Write-Host 'HangukStep Database Setup'
Write-Host '================================'
Write-Host ''

# Locate psql (resolve full path so we call the same binary consistently)
$psql = (Get-Command psql -ErrorAction SilentlyContinue).Source
if (-not $psql) {
    Write-Host 'Error: PostgreSQL client (psql) is not installed or not in PATH' -ForegroundColor Red
    Write-Host 'Please install PostgreSQL first:'
    Write-Host '  https://www.postgresql.org/download/windows/'
    exit 1
}

# Check schema file exists
if (-not (Test-Path $SCHEMA_FILE)) {
    Write-Host "Error: Schema file not found: $SCHEMA_FILE" -ForegroundColor Red
    exit 1
}

# Prompt for PostgreSQL user
$inputUser = Read-Host "PostgreSQL user [$DB_USER]"
if ($inputUser) { $DB_USER = $inputUser }

# Prompt for password (reuse $env:PGPASSWORD if already set)
if ($env:PGPASSWORD) {
    $plainPwd = $env:PGPASSWORD
} else {
    $secPwd = Read-Host "Password for '$DB_USER'" -AsSecureString
    $plainPwd = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
        [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secPwd))
}
$env:PGPASSWORD = $plainPwd

# Common psql connection args (TCP to localhost with password auth)
$psqlArgs = @('-U', $DB_USER, '-h', 'localhost')

Write-Host ''
Write-Host 'This script will:'
Write-Host "  1. Create database '$DB_NAME' (if it doesn't exist)"
Write-Host '  2. Set password for the postgres user'
Write-Host '  3. Run schema.sql to create tables'
Write-Host ''
$confirm = Read-Host 'Continue? (y/n)'
if ($confirm -notmatch '^[Yy]') {
    Write-Host 'Cancelled.'
    exit 0
}

# Create database (CREATE DATABASE IF NOT EXISTS is not supported, so check first)
Write-Host ''
Write-Host 'Creating database...' -ForegroundColor Yellow
$exists = & $psql @psqlArgs -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME';" 2>$null
if ($exists -match '1') {
    Write-Host "Database '$DB_NAME' already exists" -ForegroundColor Green
} else {
    & $psql @psqlArgs -c "CREATE DATABASE $DB_NAME;"
    Write-Host "Database '$DB_NAME' created successfully" -ForegroundColor Green
}

# Set password for postgres user (so the Spring app can connect with postgres/postgres)
Write-Host ''
Write-Host 'Ensuring postgres user has password...' -ForegroundColor Yellow
& $psql @psqlArgs -c "ALTER USER postgres PASSWORD 'postgres';" 2>$null
Write-Host 'PostgreSQL user configured' -ForegroundColor Green

# Run schema
Write-Host ''
Write-Host 'Running schema.sql...' -ForegroundColor Yellow
& $psql @psqlArgs -d $DB_NAME -f $SCHEMA_FILE

# Verify
Write-Host ''
Write-Host 'Verifying schema...' -ForegroundColor Yellow
$tables = & $psql @psqlArgs -d $DB_NAME -c '\dt'
if ($tables -match 'users') {
    Write-Host '✓ Schema created successfully' -ForegroundColor Green
    Write-Host ''
    Write-Host 'Database tables:'
    Write-Host $tables
    Write-Host ''
    Write-Host 'Database initialization complete!' -ForegroundColor Green
    Write-Host ''
    Write-Host 'You can now run the application with:'
    Write-Host '  gradlew.bat bootRun'
} else {
    Write-Host '✗ Schema verification failed' -ForegroundColor Red
    exit 1
}
