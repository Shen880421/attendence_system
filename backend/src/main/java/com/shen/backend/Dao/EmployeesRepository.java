package com.shen.backend.Dao;

import org.springframework.stereotype.Repository;
import com.shen.backend.Model.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

@Repository
public interface EmployeesRepository extends JpaRepository<Employees, Long> {
    Optional<Employees> findByEmail(String email);
}