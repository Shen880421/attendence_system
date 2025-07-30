package com.shen.backend.Dao;
import org.springframework.stereotype.Repository;

import com.shen.backend.Model.Employees;

import org.springframework.data.jpa.repository.JpaRepository;
@Repository
public interface EmployeesRepository extends JpaRepository<Employees, Long> {

}