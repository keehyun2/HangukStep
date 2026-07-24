#!/bin/bash

# HangukStep Backend - Kill Port 8080
# This script finds and kills processes using port 8080

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "================================"
echo "Port 8080 Killer"
echo "================================"
echo ""

# Function to kill process by port
kill_by_port() {
    local PORT=$1
    local PIDS=$(lsof -ti:$PORT 2>/dev/null || true)

    if [ -z "$PIDS" ]; then
        echo -e "${GREEN}No process found using port $PORT${NC}"
        return 0
    fi

    echo -e "${YELLOW}Found process(es) using port $PORT:${NC}"
    lsof -ti:$PORT | while read -r pid; do
        local CMD=$(ps -p $pid -o comm= 2>/dev/null || echo "unknown")
        echo "  - PID $pid: $CMD"
    done

    echo ""
    read -p "Kill these processes? (y/n) " -n 1 -r
    echo ""

    if [[ $REPLY =~ ^[Yy]$ ]]; then
        lsof -ti:$PORT | xargs -r kill -9 2>/dev/null
        echo -e "${GREEN}✓ Processes killed successfully${NC}"

        # Verify
        sleep 1
        if lsof -ti:$PORT >/dev/null 2>&1; then
            echo -e "${RED}✗ Some processes are still running${NC}"
            echo "You may need to run this script with sudo or kill them manually."
        else
            echo -e "${GREEN}✓ Port $PORT is now free${NC}"
        fi
    else
        echo "Cancelled."
    fi
}

# Check if lsof is available
if ! command -v lsof &> /dev/null; then
    echo -e "${RED}Error: lsof is not installed${NC}"
    echo "Install it with:"
    echo "  Ubuntu/Debian: sudo apt install lsof"
    echo "  macOS: brew install lsof"
    exit 1
fi

# Check if port is specified
PORT=${1:-8080}

echo -e "${YELLOW}Checking processes on port $PORT...${NC}"
echo ""

kill_by_port $PORT

echo ""
echo "Done!"
