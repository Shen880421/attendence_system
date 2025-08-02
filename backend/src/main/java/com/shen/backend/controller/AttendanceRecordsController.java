package com.shen.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.shen.backend.Model.AttendanceRecords;
import com.shen.backend.service.AttendanceRecordsService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/attendance")
public class AttendanceRecordsController {

    @Autowired
    private AttendanceRecordsService attendanceRecordsService;

    @GetMapping("getall")
    public List<AttendanceRecords> getAllAttendanceRecords() {
        return attendanceRecordsService.findAll();
    }

    @PostMapping("create")
    public ResponseEntity<AttendanceRecords> createAttendanceRecord(@RequestBody AttendanceRecords attendanceRecord) {
        try {
            AttendanceRecords savedRecord = attendanceRecordsService.save(attendanceRecord);
            return ResponseEntity.ok(savedRecord);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttendanceRecords> getAttendanceRecordById(@PathVariable Long id) {
        Optional<AttendanceRecords> record = attendanceRecordsService.findById(id);
        return record.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AttendanceRecords> updateAttendanceRecord(@PathVariable Long id,
            @RequestBody AttendanceRecords attendanceRecord) {
        try {
            attendanceRecord.setId(id);
            AttendanceRecords updatedRecord = attendanceRecordsService.save(attendanceRecord);
            return ResponseEntity.ok(updatedRecord);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttendanceRecord(@PathVariable Long id) {
        try {
            attendanceRecordsService.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}
