# HangukStep - Backend API

Spring Boot 3.x backend API for Hanguk Step Korean learning platform with JWT authentication.

## Quick Start

Get running in 5 minutes: [QUICKSTART.md](QUICKSTART.md)

## Prerequisites

- **Java 21** - [Download JDK 21](https://adoptium.net/temurin/latest/?version=21) (Eclipse Temurin recommended)
- **PostgreSQL 15+** - [Install PostgreSQL](https://www.postgresql.org/download/)
- **Git** - To clone the repository

Gradle wrapper is included, so no Gradle installation needed.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/keehyun2/HangukStep.git
cd HangukStep/backend
```

### 2. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your values
nano .env  # or use your preferred editor
```

**Required variables in `.env`:**
- `DB_PASSWORD` - Your PostgreSQL password
- `JWT_SECRET` - Strong secret key for JWT signing (min 256 bits)

**Optional variables:**
- `DB_URL` - Default: `jdbc:postgresql://localhost:5432/hangukstep`
- `DB_USERNAME` - Default: `postgres`
- `JWT_EXPIRATION` - Default: `604800000` (7 days in ms)
- `SERVER_PORT` - Default: `8080`
- `CORS_ORIGINS` - Default: `http://localhost:5173,http://localhost:3000`

### 3. Initialize Database

```bash
# Run the database initialization script
./scripts/init-db.sh
```

This script:
- Creates the `hangukstep` database
- Creates the `users` table with proper schema
- Sets up indexes for performance

### 4. Run the Application

```bash
./gradlew bootRun
```

The API will be available at `http://localhost:8080`

## API Endpoints

### Authentication

#### POST /api/auth/signup - Register new user

```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

**Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29t...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-15T10:30:00"
  }
}
```

#### POST /api/auth/login - Authenticate user

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29t...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-15T10:30:00"
  }
}
```

#### GET /api/auth/me - Get current user

```bash
curl -X GET http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response (200 OK):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2024-01-15T10:30:00"
}
```

#### POST /api/auth/logout - Logout

```bash
curl -X POST http://localhost:8080/api/auth/logout \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response (200 OK)**

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  last_login_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
```

The schema is defined in `src/main/resources/db/schema.sql`.

## Testing

### Run Unit Tests

```bash
./gradlew test
```

### Manual Testing

```bash
# 1. Signup
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# 2. Login (save the token)
TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' | jq -r '.token')

# 3. Get current user
curl -X GET http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

## Error Responses

### 409 Conflict - Email Already Exists

```json
{
  "error": "EMAIL_EXISTS",
  "message": "Email already exists: user@example.com"
}
```

### 401 Unauthorized - Invalid Credentials

```json
{
  "error": "INVALID_CREDENTIALS",
  "message": "Invalid email or password"
}
```

### 400 Bad Request - Validation Error

```json
{
  "email": "Invalid email format",
  "password": "Password must be at least 8 characters"
}
```

## Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DB_URL` | PostgreSQL JDBC URL | No | `jdbc:postgresql://localhost:5432/hangukstep` |
| `DB_USERNAME` | Database username | No | `postgres` |
| `DB_PASSWORD` | Database password | **Yes** | - |
| `JWT_SECRET` | JWT signing key (min 256 bits) | **Yes** | - |
| `JWT_EXPIRATION` | Token expiration (milliseconds) | No | `604800000` (7 days) |
| `SERVER_PORT` | Server port | No | `8080` |
| `CORS_ORIGINS` | Allowed CORS origins (comma-separated) | No | `http://localhost:5173,http://localhost:3000` |

### Generate JWT Secret

For production, generate a secure 256-bit key:

```bash
# Using OpenSSL
openssl rand -base64 32

# Or use an online generator
# https://generate-random.org/encryption-key-generator
```

## Project Structure

```
backend/
├── src/main/java/com/hangukstep/
│   ├── HangukStepApplication.java      # Main application
│   ├── config/
│   │   └── SecurityConfig.java         # Security & CORS configuration
│   ├── controller/
│   │   └── AuthController.java        # Authentication endpoints
│   ├── dto/
│   │   ├── AuthResponse.java          # API response objects
│   │   ├── LoginRequest.java
│   │   ├── SignupRequest.java
│   │   └── UserResponse.java
│   ├── entity/
│   │   └── User.java                  # JPA User entity
│   ├── exception/
│   │   ├── EmailAlreadyExistsException.java
│   │   └── GlobalExceptionHandler.java  # Centralized error handling
│   ├── repository/
│   │   └── UserRepository.java         # JPA Repository
│   ├── security/
│   │   ├── CustomUserDetails.java      # Spring Security UserDetails
│   │   ├── CustomUserDetailsService.java
│   │   ├── JwtAuthenticationFilter.java  # JWT filter for requests
│   │   └── JwtUtil.java                # JWT token utilities
│   └── service/
│       └── AuthService.java            # Authentication business logic
├── src/main/resources/
│   ├── application.yml                # Main configuration
│   └── db/
│       └── schema.sql                 # Database schema
└── scripts/
    └── init-db.sh                     # Database initialization
```

## Security Considerations

### For Development

- Default JWT secret is provided in `.env.example`
- Use any password for local PostgreSQL
- CORS enabled for localhost

### For Production

1. **Generate a strong JWT secret** (256+ bits)
2. **Use strong database passwords**
3. **Restrict CORS origins** to your actual frontend domain
4. **Enable HTTPS** in production
5. **Use environment-specific configs** (application-prod.yml)

## Troubleshooting

### "Connection refused" to PostgreSQL

```bash
# Check if PostgreSQL is running
sudo service postgresql status

# Start PostgreSQL if needed
sudo service postgresql start

# Verify connection
psql -U postgres -c "SELECT version();"
```

### "FATAL: password authentication failed for user"

```bash
# Set PostgreSQL password
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'your_password';"
```

### "Database doesn't exist"

```bash
# Run the init script
./scripts/init-db.sh
```

### "Permission denied" on init-db.sh

```bash
# Make the script executable
chmod +x scripts/init-db.sh
```

### "Gradle wrapper not executable"

```bash
# Make gradlew executable
chmod +x gradlew
```

## Building for Production

```bash
# Build the JAR file
./gradlew build

# The JAR will be at: build/libs/hangukstep.jar

# Run with production profile
java -jar build/libs/hangukstep.jar --spring.profiles.active=prod
```

## Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style
2. All tests pass: `./gradlew test`
3. Documentation is updated

## Technology Stack

- **Java 21** - Latest LTS version
- **Spring Boot 3.2** - Modern Spring framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database access
- **PostgreSQL** - Primary database
- **JUnit 5** - Testing framework
- **Gradle 8.5** - Build tool
- **Lombok** - Reduce boilerplate code

## License

This project is part of Hanguk Step - Korean Language Learning Platform.

## Support

For issues and questions:
- Check troubleshooting above
- Review [QUICKSTART.md](QUICKSTART.md)
- Open an issue on GitHub

---

**Note:** This backend is designed to work with the HangukStep frontend (Vue.js). Make sure to configure CORS origins appropriately for your frontend setup.
