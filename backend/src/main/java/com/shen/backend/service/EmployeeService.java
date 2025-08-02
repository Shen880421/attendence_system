package com.shen.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.shen.backend.Dao.EmployeesRepository;
import com.shen.backend.Model.Employees;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeesRepository employeesRepository;

    public Employees save(Employees employee) {
        return employeesRepository.save(employee);
    }

    public List<Employees> findAll() {
        return employeesRepository.findAll();
    }

    public Optional<Employees> findById(Long id) {
        return employeesRepository.findById(id);
    }

    public Optional<Employees> findByEmail(String email) {
        return employeesRepository.findByEmail(email);
    }

    public void deleteById(Long id) {
        employeesRepository.deleteById(id);
    }
}