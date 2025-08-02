package com.shen.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.shen.backend.Model.AttendanceRecords;
import com.shen.backend.Model.Employees;
import com.shen.backend.Model.AttendanceType;
import com.shen.backend.service.AttendanceRecordsService;
import com.shen.backend.service.EmployeeService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/attendance")
public class AttendanceRecordsController {

    @Autowired
    private AttendanceRecordsService attendanceRecordsService;

    @Autowired
    private EmployeeService employeeService;

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

    @PostMapping("checkin")
    public ResponseEntity<?> checkIn(@RequestBody CheckInRequest request) {
        try {
            // 獲取當前登入用戶
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userEmail = authentication.getName();

            Optional<Employees> employee = employeeService.findByEmail(userEmail);
            if (employee.isEmpty()) {
                return ResponseEntity.badRequest().body("員工不存在");
            }

            AttendanceRecords record = new AttendanceRecords();
            record.setEmployee(employee.get());
            record.setType(AttendanceType.clock_in);
            record.setLocation(request.getLocation());
            // timestamp 會自動設定為當前時間（PrePersist）

            AttendanceRecords savedRecord = attendanceRecordsService.save(record);
            return ResponseEntity.ok(savedRecord);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("打卡失敗：" + e.getMessage());
        }
    }

    @PostMapping("checkout")
    public ResponseEntity<?> checkOut(@RequestBody CheckInRequest request) {
        try {
            // 獲取當前登入用戶
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userEmail = authentication.getName();

            Optional<Employees> employee = employeeService.findByEmail(userEmail);
            if (employee.isEmpty()) {
                return ResponseEntity.badRequest().body("員工不存在");
            }

            AttendanceRecords record = new AttendanceRecords();
            record.setEmployee(employee.get());
            record.setType(AttendanceType.clock_out);
            record.setLocation(request.getLocation());
            // timestamp 會自動設定為當前時間（PrePersist）

            AttendanceRecords savedRecord = attendanceRecordsService.save(record);
            return ResponseEntity.ok(savedRecord);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("打卡失敗：" + e.getMessage());
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

    // 內部類別定義打卡請求
    public static class CheckInRequest {
        private String location;

        public CheckInRequest() {
        }

        public String getLocation() {
            return location;
        }

        public void setLocation(String location) {
            this.location = location;
        }
    }
}
