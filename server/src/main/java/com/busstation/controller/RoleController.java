package com.busstation.controller;

import com.busstation.payload.request.RoleRequest;
import com.busstation.payload.response.RoleResponse;
import com.busstation.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController(value = "roleAPIofWeb")
@RequestMapping("/api/v1/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping()
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<>(roleService.getAll(), HttpStatus.OK);
    }
    @PostMapping()
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> createRole(@RequestBody RoleRequest roleRequest) {

        RoleResponse roleResponse = roleService.createRole(roleRequest);
        return new ResponseEntity<>(roleResponse, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateRole(@RequestBody RoleRequest roleRequest,
                                        @PathVariable("id") String id) {

        RoleResponse roleResponse = roleService.updateRole(id, roleRequest);
        return new ResponseEntity<>(roleResponse, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteRole(@PathVariable("id") String id) {

        if (roleService.deleteRole(id)) {
            return new ResponseEntity<>("delete Success!", HttpStatus.OK);
        }
        return new ResponseEntity<>("delete failed!!", HttpStatus.OK);
    }
}
