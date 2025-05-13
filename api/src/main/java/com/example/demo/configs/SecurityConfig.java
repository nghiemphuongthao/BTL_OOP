package com.example.demo.configs;

import com.example.demo.utils.jwt.JWTTokenPayload;
import com.example.demo.utils.jwt.JwtTokenUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public class JwtRequestFilter extends OncePerRequestFilter {

        @Override
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
                throws ServletException, IOException {

            String path = request.getServletPath();
            if (path.equals("/api/login")) {
                chain.doFilter(request, response);
            } else {
                final String authorizationHeader = request.getHeader("Authorization");

                if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                    String token = authorizationHeader.substring(7);

                    if (jwtTokenUtil.validateToken(token)) {
                        JWTTokenPayload payload = jwtTokenUtil.getPayloadFromToken(token);
                        if (payload != null) {
                            List<SimpleGrantedAuthority> authorities = payload.getRoleIds().stream()
                                    .map(roleId -> new SimpleGrantedAuthority("ROLE_" + roleId))
                                    .collect(Collectors.toList());

                            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                                    payload, null, authorities);

                            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                        }
                    }
                }

                chain.doFilter(request, response);
            }

        }
    }

    @Bean
    public JwtRequestFilter jwtRequestFilter() {
        return new JwtRequestFilter();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors
                        .configurationSource(request -> {
                            var config = new org.springframework.web.cors.CorsConfiguration();
                           config.setAllowCredentials(true); // Allow credentials (cookies, etc.)
                            config.addAllowedOrigin("http://localhost:5173"); // Ensure this is the correct URL
                            config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                            config.setAllowedHeaders(List.of("*"));
                            return config;
                        }))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // This allows OPTIONS requests
                        .requestMatchers(HttpMethod.POST, "/api/login").permitAll()
                        .anyRequest().authenticated()
                    )
                .addFilterBefore(jwtRequestFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
