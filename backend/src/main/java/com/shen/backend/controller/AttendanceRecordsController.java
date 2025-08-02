package com.shen.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.shen.backend.Dao.AttendanceRecordsRepository;
import com.shen.backend.Model.AttendanceRecords;
import java.util.List;

@RestController
@RequestMapping("api/attendance")
public class AttendanceRecordsController {

    @Autowired
    private AttendanceRecordsRepository attendanceRecordsRepository;

    @GetMapping
    public List<AttendanceRecords> getAllAttendanceRecords() {
        return attendanceRecordsRepository.findAll();
    }

    @PostMapping
    public AttendanceRecords createAttendanceRecord(@RequestBody AttendanceRecords attendanceRecord) {
        return attendanceRecordsRepository.save(attendanceRecord);
    }

    @GetMapping("/{id}")
    public AttendanceRecords getAttendanceRecordById(@PathVariable Long id) {
        return attendanceRecordsRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public AttendanceRecords updateAttendanceRecord(@PathVariable Long id,
            @RequestBody AttendanceRecords attendanceRecord) {
        attendanceRecord.setId(id);
        return attendanceRecordsRepository.save(attendanceRecord);
    }

    @DeleteMapping("/{id}")
    public void deleteAttendanceRecord(@PathVariable Long id) {
        attendanceRecordsRepository.deleteById(id);
    }
}
