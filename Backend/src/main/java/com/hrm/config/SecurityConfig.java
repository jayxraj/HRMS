package com.hrm.config;

import com.hrm.util.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) throws Exception {
        http
            .csrf().disable()
            .cors().and()
            .authorizeHttpRequests()
                .requestMatchers(
                    "/api/register",
                    "/api/login",
                    "/api/forgot-password",
                    "/api/reset-password",
                    "/api/candidate/job-postings",
                    "/uploads/**" 
                    
                ).permitAll()

                // ✅ Allow HR to post jobs
                .requestMatchers("/api/hr/job-posting").hasRole("HR")

                // ✅ Allow HR to view job applications
                .requestMatchers("/api/hr/job-applications").hasRole("HR")

                // ✅ Allow both HR and candidates to view job postings
                .requestMatchers("/api/hr/job-postings", "/api/candidate/job-postings").permitAll()

                // ✅ Allow HR to access candidate resumes
                .requestMatchers("/uploads/resumes/**").permitAll()  // ✅ Fixes 403 Forbidden Error
                .requestMatchers("/api/hr/employees").permitAll()

                // ✅ Candidates must be logged in to apply for jobs or upload a resume
                .requestMatchers("/api/candidate/apply", "/api/candidate/upload-resume").authenticated()
                .requestMatchers("/api/hr/performance-reviews").permitAll()

                // ✅ HR, Admin, and Employees have their own restricted access
                .requestMatchers("/api/hr/**").hasRole("HR")
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/employee/**").hasRole("EMPLOYEE")

                // ✅ Any other requests must be authenticated
                .anyRequest().authenticated()
            .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173") // ✅ Allow frontend React app
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowedHeaders("*")
                        .exposedHeaders("Authorization")
                        .allowCredentials(true);
            }
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
