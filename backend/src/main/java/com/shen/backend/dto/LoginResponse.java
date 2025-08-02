package com.shen.backend.dto;

public class LoginResponse {
    private String token;
    private Long employeeId;
    private String name;
    private String email;
    private String role;

    public LoginResponse() {
    }

    public LoginResponse(String token, Long employeeId, String name, String email, String role) {
        this.token = token;
        this.employeeId = employeeId;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
