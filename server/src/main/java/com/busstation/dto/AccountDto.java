package com.busstation.dto;

import com.busstation.entities.Account;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AccountDto {
    private String accountId;

    private String username;

    public String password;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createdAt;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updatedAt;

    private RoleDto role;

    private UserDto user;

    public AccountDto(Account account) {
        this.accountId = account.getAccountId();
        this.username = account.getUsername();
        this.password = account.getPassword();
        this.createdAt = account.getCreatedAt();
        this.updatedAt = account.getUpdatedAt();
        RoleDto roleDto = new RoleDto();
        roleDto.setRoleId(account.getRole().getRoleId());
        roleDto.setName(account.getRole().getName());
        this.setRole(roleDto);
        if(Objects.nonNull(account.getUser())){
            UserDto userDto = new UserDto();
            userDto.setUserId(account.getUser().getUserId());
            userDto.setFullName(account.getUser().getFullName());
            userDto.setPhoneNumber(account.getUser().getPhoneNumber());
            userDto.setEmail(account.getUser().getEmail());
            userDto.setAddress(account.getUser().getAddress());
            userDto.setStatus(account.getUser().getStatus());
            userDto.setCreatedAt(account.getUser().getCreatedAt());
            userDto.setUpdatedAt(account.getUser().getUpdatedAt());
            if(Objects.nonNull(account.getUser().getEmployee())){
                EmployeeDTO employeeDTO = new EmployeeDTO();
                employeeDTO.setEmployeeId(account.getUser().getEmployee().getEmployeeId());
                employeeDTO.setDob(account.getUser().getEmployee().getDob());
                employeeDTO.setYoe(account.getUser().getEmployee().getYoe());
                userDto.setEmployeeDTO(employeeDTO);
            }
            this.setUser(userDto);
        }

    }

}
