package com.shen.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.shen.backend.Model.Employees;
import com.shen.backend.service.EmployeeService;

import java.util.List;

@RestController
@RequestMapping("api/employees")
public class EmployeesController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping("getall")
    public List<Employees> getAllEmployees() {
        return employeeService.findAll();
    }

    @PostMapping("createuser")
    public ResponseEntity<Employees> createUser(@RequestBody Employees employee) {
        try {
            System.out.println("Received employee: " + employee.getName() + ", Role: " + employee.getRole());
            Employees savedEmployee = employeeService.save(employee);
            return ResponseEntity.ok(savedEmployee);
        } catch (Exception e) {
            e.printStackTrace(); // 這會在控制台顯示詳細錯誤
            return ResponseEntity.badRequest().build();
        }
    }
}