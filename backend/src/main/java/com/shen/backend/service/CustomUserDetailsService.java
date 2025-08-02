package com.shen.backend.service;

import com.shen.backend.Model.Employees;
import com.shen.backend.Dao.EmployeesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private EmployeesRepository employeesRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Employees> employee = employeesRepository.findByEmail(email);

        if (employee.isEmpty()) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        Employees emp = employee.get();
        return new User(emp.getEmail(), emp.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + emp.getRole().name())));
    }
}
