package com.shen.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.shen.backend.Model.Employees;
import com.shen.backend.service.EmployeeService;
import com.shen.backend.config.JwtUtil;
import com.shen.backend.dto.LoginRequest;
import com.shen.backend.dto.LoginResponse;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/employees")
public class EmployeesController {
    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("getall")
    public List<Employees> getAllEmployees() {
        return employeeService.findAll();
    }

    @PostMapping("createuser")
    public ResponseEntity<Employees> createUser(@RequestBody Employees employee) {
        try {
            // 加密密碼
            employee.setPassword(passwordEncoder.encode(employee.getPassword()));
            System.out.println("Received employee: " + employee.getName() + ", Role: " + employee.getRole());
            Employees savedEmployee = employeeService.save(employee);
            return ResponseEntity.ok(savedEmployee);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // 驗證用戶憑證
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            String token = jwtUtil.generateToken(loginRequest.getEmail());
            Optional<Employees> employee = employeeService.findByEmail(loginRequest.getEmail());

            if (employee.isPresent()) {
                Employees emp = employee.get();
                LoginResponse response = new LoginResponse(
                        token,
                        emp.getId(),
                        emp.getName(),
                        emp.getEmail(),
                        emp.getRole().toString());
                return ResponseEntity.ok(response);
            }

            return ResponseEntity.badRequest().body("用戶不存在");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("登入失敗：" + e.getMessage());
        }
    }
}