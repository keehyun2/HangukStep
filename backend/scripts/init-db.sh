#!/bin/bash

# HangukStep Database Initialization Script
# This script creates the database and runs the schema

set -e

# Default values
DB_NAME="hangukstep"
DB_USER="postgres"
SCHEMA_FILE="src/main/resources/db/schema.sql"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "================================"
echo "HangukStep Database Setup"
echo "================================"
echo ""

# Check if PostgreSQL is running
if ! command -v psql &> /dev/null; then
    echo -e "${RED}Error: PostgreSQL is not installed or not in PATH${NC}"
    echo "Please install PostgreSQL first:"
    echo "  Ubuntu/Debian: sudo apt install postgresql postgresql-contrib"
    echo "  macOS: brew install postgresql"
    exit 1
fi

# Check if schema file exists
if [ ! -f "$SCHEMA_FILE" ]; then
    echo -e "${RED}Error: Schema file not found: $SCHEMA_FILE${NC}"
    exit 1
fi

# Prompt for PostgreSQL user if needed
read -p "PostgreSQL user [$DB_USER]: " input_user
DB_USER=${input_user:-$DB_USER}

echo ""
echo "This script will:"
echo "  1. Create database '$DB_NAME' (if it doesn't exist)"
echo "  2. Run schema.sql to create tables"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

# Create database
echo ""
echo -e "${YELLOW}Creating database...${NC}"
if sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname='$DB_NAME';" | grep -q 1; then
    echo -e "${GREEN}Database '$DB_NAME' already exists${NC}"
else
    sudo -u postgres psql -c "CREATE DATABASE $DB_NAME;"
    echo -e "${GREEN}Database '$DB_NAME' created successfully${NC}"
fi

# Set password for postgres user if not set
echo ""
echo -e "${YELLOW}Ensuring postgres user has password...${NC}"
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';" 2>/dev/null || true
echo -e "${GREEN}PostgreSQL user configured${NC}"

# Run schema
echo ""
echo -e "${YELLOW}Running schema.sql...${NC}"
sudo -u postgres psql -d "$DB_NAME" -f "$SCHEMA_FILE"

# Verify
echo ""
echo -e "${YELLOW}Verifying schema...${NC}"
if sudo -u postgres psql -d "$DB_NAME" -c "\dt" | grep -q users; then
    echo -e "${GREEN}✓ Schema created successfully${NC}"
    echo ""
    echo "Database tables:"
    sudo -u postgres psql -d "$DB_NAME" -c "\dt"
    echo ""
    echo -e "${GREEN}Database initialization complete!${NC}"
    echo ""
    echo "You can now run the application with:"
    echo "  ./gradlew bootRun"
else
    echo -e "${RED}✗ Schema verification failed${NC}"
    exit 1
fi
