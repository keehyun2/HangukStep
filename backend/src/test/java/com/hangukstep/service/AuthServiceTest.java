package com.hangukstep.service;

import com.hangukstep.dto.LoginRequest;
import com.hangukstep.dto.SignupRequest;
import com.hangukstep.entity.User;
import com.hangukstep.exception.EmailAlreadyExistsException;
import com.hangukstep.repository.UserRepository;
import com.hangukstep.security.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    private User testUser;
    private SignupRequest signupRequest;
    private LoginRequest loginRequest;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
                .id(1L)
                .email("test@example.com")
                .passwordHash("hashedPassword")
                .name("Test User")
                .build();

        signupRequest = new SignupRequest();
        signupRequest.setEmail("test@example.com");
        signupRequest.setPassword("password123");
        signupRequest.setName("Test User");

        loginRequest = new LoginRequest();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("password123");
    }

    @Test
    void signup_WhenEmailDoesNotExist_ShouldReturnAuthResponse() {
        // Given
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("hashedPassword");
        when(userRepository.save(any(User.class))).thenReturn(testUser);
        when(jwtUtil.generateTokenFromUsername(anyString())).thenReturn("jwtToken");

        // When
        var response = authService.signup(signupRequest);

        // Then
        assertNotNull(response);
        assertEquals("jwtToken", response.getToken());
        assertEquals(testUser.getEmail(), response.getUser().getEmail());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void signup_WhenEmailExists_ShouldThrowException() {
        // Given
        when(userRepository.existsByEmail(anyString())).thenReturn(true);

        // When & Then
        assertThrows(EmailAlreadyExistsException.class, () -> authService.signup(signupRequest));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void login_WithValidCredentials_ShouldReturnAuthResponse() {
        // Given
        org.springframework.security.core.Authentication mockAuthentication =
                mock(org.springframework.security.core.Authentication.class);
        org.springframework.security.core.userdetails.UserDetails mockUserDetails =
                mock(org.springframework.security.core.userdetails.UserDetails.class);

        when(authenticationManager.authenticate(any())).thenReturn(mockAuthentication);
        when(mockAuthentication.getPrincipal()).thenReturn(new com.hangukstep.security.CustomUserDetails(testUser));
        when(jwtUtil.generateToken(any())).thenReturn("jwtToken");

        // When
        var response = authService.login(loginRequest);

        // Then
        assertNotNull(response);
        assertEquals("jwtToken", response.getToken());
    }
}
