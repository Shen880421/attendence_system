package com.shen.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.shen.backend.Dao.LeaveRequestsRepository;
import com.shen.backend.Model.LeaveRequests;
import java.util.List;

@RestController
@RequestMapping("api/leaverequests")
public class LeaveRequestsController {

    @Autowired
    private LeaveRequestsRepository leaveRequestsRepository;

    @GetMapping
    public List<LeaveRequests> getAllLeaveRequests() {
        return leaveRequestsRepository.findAll();
    }

    @PostMapping
    public LeaveRequests createLeaveRequest(@RequestBody LeaveRequests leaveRequest) {
        return leaveRequestsRepository.save(leaveRequest);
    }

    @GetMapping("/{id}")
    public LeaveRequests getLeaveRequestById(@PathVariable Long id) {
        return leaveRequestsRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public LeaveRequests updateLeaveRequest(@PathVariable Long id,
            @RequestBody LeaveRequests leaveRequest) {
        leaveRequest.setId(id);
        return leaveRequestsRepository.save(leaveRequest);
    }

    @DeleteMapping("/{id}")
    public void deleteLeaveRequest(@PathVariable Long id) {
        leaveRequestsRepository.deleteById(id);
    }
}
