package com.shen.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.shen.backend.Dao.LeaveRequestsRepository;
import com.shen.backend.Model.LeaveRequests;
import com.shen.backend.Model.Employees;
import java.util.List;
import java.util.Optional;

@Service
public class LeaveRequestsService {

    @Autowired
    private LeaveRequestsRepository leaveRequestsRepository;

    public LeaveRequests save(LeaveRequests leaveRequest) {
        return leaveRequestsRepository.save(leaveRequest);
    }

    public List<LeaveRequests> findAll() {
        return leaveRequestsRepository.findAll();
    }

    public Optional<LeaveRequests> findById(Long id) {
        return leaveRequestsRepository.findById(id);
    }

    public List<LeaveRequests> findByEmployee(Employees employee) {
        return leaveRequestsRepository.findByEmployee(employee);
    }

    public void deleteById(Long id) {
        leaveRequestsRepository.deleteById(id);
    }
}
