package com.shen.backend.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.shen.backend.Dao.EmployeesRepository;
import com.shen.backend.Model.Employees;

import java.util.List;

@RestController
@RequestMapping("api/employees")
public class EmployeesController {
    @Autowired
    private EmployeesRepository employeesRepository;
    @GetMapping("getall")
    public List<Employees> getAllEmployees() {
        return employeesRepository.findAll();
    }
    @PostMapping("createuser")
    public Employees createUser(@RequestBody Employees employee) {
        return employeesRepository.save(employee);
    }
    
}
