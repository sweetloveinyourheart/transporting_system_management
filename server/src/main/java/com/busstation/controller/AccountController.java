package com.busstation.controller;

import com.busstation.payload.request.ChangePasswordRequest;
import com.busstation.payload.request.RoleRequest;
import com.busstation.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController(value = "accountAPIofWeb")
@RequestMapping("/api/v1/accounts")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @GetMapping ("/information")
    public ResponseEntity<?> getInfor() {
        return new ResponseEntity<>(accountService.accountInformation(), HttpStatus.OK);
    }

    @GetMapping ("/information/{accountid}")
    public ResponseEntity<?> getInforId(@PathVariable("accountid") String accountId) {
        return new ResponseEntity<>(accountService.accountInformation(accountId), HttpStatus.OK);
    }
    @PostMapping("/changepassword")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
        return new ResponseEntity<>( accountService.changePassword(changePasswordRequest), HttpStatus.OK);
    }

    @PutMapping("/{accountId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateRole(@PathVariable("accountId") String id,@RequestBody RoleRequest roleRequest) {
        return new ResponseEntity<>(accountService.updateRole(id,roleRequest), HttpStatus.OK);
    }
}
