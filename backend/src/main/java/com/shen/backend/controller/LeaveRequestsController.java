package com.shen.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.shen.backend.Model.LeaveRequests;
import com.shen.backend.service.LeaveRequestsService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/leaverequests")
public class LeaveRequestsController {

    @Autowired
    private LeaveRequestsService leaveRequestsService;

    @GetMapping("getall")
    public List<LeaveRequests> getAllLeaveRequests() {
        return leaveRequestsService.findAll();
    }

    @PostMapping("create")
    public ResponseEntity<LeaveRequests> createLeaveRequest(@RequestBody LeaveRequests leaveRequest) {
        try {
            LeaveRequests savedRequest = leaveRequestsService.save(leaveRequest);
            return ResponseEntity.ok(savedRequest);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeaveRequests> getLeaveRequestById(@PathVariable Long id) {
        Optional<LeaveRequests> request = leaveRequestsService.findById(id);
        return request.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LeaveRequests> updateLeaveRequest(@PathVariable Long id,
            @RequestBody LeaveRequests leaveRequest) {
        try {
            leaveRequest.setId(id);
            LeaveRequests updatedRequest = leaveRequestsService.save(leaveRequest);
            return ResponseEntity.ok(updatedRequest);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLeaveRequest(@PathVariable Long id) {
        try {
            leaveRequestsService.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}
