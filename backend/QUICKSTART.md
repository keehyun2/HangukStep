# HangukStep Backend - Quick Start

Get the HangukStep authentication API running in 5 minutes.

## Prerequisites

- **Java 21** - [Download JDK 21](https://adoptium.net/)
- **PostgreSQL** - [Install PostgreSQL](https://www.postgresql.org/download/)
- **Git** - To clone the repository

## Quick Setup (5 commands)

```bash
# 1. Clone the repository
git clone https://github.com/keehyun2/HangukStep.git
cd HangukStep/backend

# 2. Create environment file
cp .env.example .env

# 3. Edit .env and set these variables:
#    - DB_PASSWORD=your_password
#    - JWT_SECRET=your_secret_key

# 4. Initialize database
./scripts/init-db.sh

# 5. Run the application
./gradlew bootRun
```

That's it! The API will be running at `http://localhost:8080`

## Test the API

```bash
# Signup
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Troubleshooting

### "PostgreSQL connection failed"
```bash
# Check PostgreSQL is running
sudo service postgresql status

# Start PostgreSQL if needed
sudo service postgresql start
```

### "Database doesn't exist"
```bash
# Run the init script again
./scripts/init-db.sh
```

### "Permission denied" on init-db.sh
```bash
# Make the script executable
chmod +x scripts/init-db.sh
```

## Next Steps

- Read full documentation: [README.md](README.md)
- API endpoints: [API Endpoints](README.md#api-endpoints)
- Development guide: [CONTRIBUTING.md](CONTRIBUTING.md) (if exists)

## Need Help?

Common issues and solutions are in the main [README.md](README.md#troubleshooting).
