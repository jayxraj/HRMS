package com.hrm.controller;

import com.hrm.model.User;
import com.hrm.model.Role;
import com.hrm.service.UserService;
import com.hrm.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService,
                          AuthenticationManager authenticationManager,
                          JwtUtil jwtUtil) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        try {
            User user = userService.registerUser(
                    request.getUsername(),
                    request.getPassword(),
                    request.getEmail(),
                    request.getRole()
            );
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            
            // ✅ Fetch the user BEFORE generating the token
            User user = userService.findByUsername(request.getUsername());

            if (user == null) {
                return ResponseEntity.status(401).body("User not found");
            }

            // ✅ Now pass both userDetails and userId
            String token = jwtUtil.generateToken(userDetails,user.getId());

            return ResponseEntity.ok(new JwtResponse(
                    token,
                    user.getRole().name(),
                    user.getId()
            ));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Invalid credentials");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Login error: " + e.getMessage());
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        try {
            userService.createPasswordResetToken(request.getEmail());
            return ResponseEntity.ok("OTP sent to registered email");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        try {
            userService.validateAndResetPassword(
                request.getOtp(),
                request.getEmail(),
                request.getNewPassword()
            );
            return ResponseEntity.ok("Password reset successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // DTO Classes with proper getters/setters
    public static class RegisterRequest {
        private String username;
        private String password;
        private String email;
        private Role role;

        public RegisterRequest() {}

        // Getters and setters
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public Role getRole() { return role; }
        public void setRole(Role role) { this.role = role; }
    }

    public static class LoginRequest {
        private String username;
        private String password;

        public LoginRequest() {}

        // Getters and setters
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class JwtResponse {
        private final String token;
        private final String role;
        private final Long userId;

        public JwtResponse(String token, String role, Long userId) {
            this.token = token;
            this.role = role;
            this.userId = userId;
        }

        // Getters
        public String getToken() { return token; }
        public String getRole() { return role; }
        public Long getUserId() { return userId; }
    }

    public static class ForgotPasswordRequest {
        private String email;

        public ForgotPasswordRequest() {}

        // Getters and setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }

    public static class ResetPasswordRequest {
        private String email;
        private String otp;
        private String newPassword;

        public ResetPasswordRequest() {}

        // Getters and setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getOtp() { return otp; }
        public void setOtp(String otp) { this.otp = otp; }
        public String getNewPassword() { return newPassword; }
        public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
    }
}
