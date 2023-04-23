package com.busstation.controller;


import com.busstation.entities.Leave;
import com.busstation.payload.request.ApproveLeaveRequest;
import com.busstation.payload.request.LeaveRequest;
import com.busstation.payload.response.LeaveResponse;
import com.busstation.services.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController(value = "leaveAPIofWeb")
@RequestMapping("/api/v1/leaves")
public class LeaveController {


    @Autowired
    private LeaveService leaveService;

    @GetMapping
    public ResponseEntity<?> getAllLeave(
            @RequestParam(value = "pageNumber", defaultValue = "0") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize
    ){
        return new ResponseEntity<>(leaveService.showAllLeave(pageNumber,pageSize), HttpStatus.OK);

    }
    @GetMapping("/allActive")
    public ResponseEntity<?> getAllLeaveActive(
            @RequestParam(value = "pageNumber", defaultValue = "0") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize
    ){
        return new ResponseEntity<>(leaveService.showAllLeaveActive(pageNumber,pageSize), HttpStatus.OK);

    }

    @PostMapping
    public ResponseEntity<?> addLeave(@RequestBody LeaveRequest request) {
        return new ResponseEntity<>(leaveService.addLeave(request), HttpStatus.OK);
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<?> updateLeave(@RequestBody LeaveRequest request,
//                                         @PathVariable("id") String leaveId) {
//        return new ResponseEntity<>(leaveService.updatedLeave(leaveId, request), HttpStatus.OK);
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLeave(@PathVariable("id") String id) {
        return new ResponseEntity<>(leaveService.deleteLeave(id), HttpStatus.OK);
    }

    @PutMapping("/approve/{leaveId}")
    public ResponseEntity<LeaveResponse> updateLeaveApprovalStatus(@PathVariable String leaveId,
                                                                   @RequestBody ApproveLeaveRequest request) {
        Leave leave = leaveService.updateLeaveStatus(leaveId, request);
        LeaveResponse response = leaveService.getLeaveResponse(leave);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/{userId}")
    public ResponseEntity<?> getLeavesByUserId(@PathVariable String userId,
                                               @RequestParam(value = "pageNumber", defaultValue = "0") int pageNumber,
                                               @RequestParam(value = "pageSize", defaultValue = "5") int pageSize) {
        Page<LeaveResponse> leaves = leaveService.findByUserId(userId, pageNumber, pageSize);
        return new ResponseEntity<>(leaves, HttpStatus.OK);
    }
}
