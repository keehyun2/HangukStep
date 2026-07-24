# VS Code Configuration for HangukStep Backend

## Setup Instructions

### Required Extensions

When you open this project in VS Code, you'll be prompted to install the recommended extensions:

1. **Red Hat Java** - Java language support, debugging, and code completion
2. **Java Extension Pack** - Additional Java tooling support
3. **Spring Boot Extension Pack** - Spring Boot specific features
4. **Lombok** - Support for Lombok annotations
5. **SonarLint** - Code quality and bug detection

### Manual Installation

If you don't see the recommendation popup, install extensions manually:

```bash
code --install-extension redhat.java
code --install-extension vscjava.vscode-java-pack
code --install-extension vmware.vscode-boot-dev-pack
```

## Debugging Configurations

### Available Launch Configurations

1. **Spring Boot: HangukStepApplication**
   - Regular run mode with .env file support
   - Use for normal development and testing

2. **Spring Boot: HangukStepApplication (Debug)**
   - Debug mode with breakpoints
   - Application suspends on startup for debugging

### How to Debug

1. Open `HangukStepApplication.java`
2. Click on the line number where you want to set a breakpoint
3. Press F5 or go to Run → Start Debugging
4. Select "Spring Boot: HangukStepApplication (Debug)"
5. Application will start and pause at your breakpoints

## Available Tasks

Open the Command Palette (Ctrl+Shift+P) and type "Tasks: Run Task" to see available tasks:

- **gradlew-build** - Build the project (default build task)
- **gradlew-bootRun** - Run Spring Boot application
- **gradlew-test** - Run unit tests (default test task)
- **gradlew-clean** - Clean build artifacts
- **init-db** - Initialize PostgreSQL database

### Keyboard Shortcuts

- **Ctrl+Shift+P** - Command Palette
- **Ctrl+P** - Quick Open
- **Ctrl+Shift+F** - Find in Files
- **F5** - Start Debugging
- **Shift+F5** - Stop Debugging
- **Ctrl+`** - Toggle Terminal

## Important Notes

1. **.env File**: The launch configurations automatically load environment variables from `.env` file
2. **Hot Reload**: Spring Boot DevTools is enabled, so changes to class files trigger automatic restart
3. **Port**: Application runs on port 8080 by default
4. **Database**: Make sure PostgreSQL is running before starting the application

## Troubleshooting

### "Java debugger is not installed"
- Install the "Red Hat Java" extension
- Reload VS Code (Ctrl+Shift+P → "Developer: Reload Window")

### Breakpoints not working
- Make sure you're using the "Debug" launch configuration
- Check that the Java debugger is properly installed

### Application won't start
- Check that PostgreSQL is running: `sudo service postgresql status`
- Verify `.env` file exists with correct credentials
- Check the terminal output for error messages

### Build errors
- Run `./gradlew clean` then `./gradlew build`
- Make sure Java 21 is installed: `java -version`
- Check that Gradle wrapper is executable: `chmod +x gradlew`
