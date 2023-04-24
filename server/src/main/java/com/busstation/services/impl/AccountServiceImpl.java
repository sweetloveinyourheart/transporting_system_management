package com.busstation.services.impl;

import com.busstation.dto.AccountDto;
import com.busstation.entities.Account;
import com.busstation.entities.Role;
import com.busstation.exception.DataNotFoundException;
import com.busstation.payload.request.ChangePasswordRequest;
import com.busstation.payload.request.RoleRequest;
import com.busstation.payload.response.ApiResponse;
import com.busstation.repositories.AccountRepository;
import com.busstation.repositories.RoleRepository;
import com.busstation.services.AccountService;
import com.busstation.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;


    @Override
    public ApiResponse changePassword(ChangePasswordRequest changePasswordRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(SecurityUtils.getUserName(),changePasswordRequest.getPasswordOld()));
        if(Objects.isNull(authentication.getPrincipal())){
           throw  new DataNotFoundException("Username or password is incorrect");
        }
        Account account=accountRepository.findByusername(authentication.getName());
        account.setPassword(passwordEncoder.encode(changePasswordRequest.getPasswordNew()));
        accountRepository.save(account);
        return new ApiResponse("Change password successfully.", HttpStatus.OK);
    }

    @Override
    public ApiResponse updateRole(String accountid,RoleRequest roleRequest) {
        Account account=accountRepository.findById(accountid).
                orElseThrow(() -> new DataNotFoundException("Can't find this account"));
        Role role=roleRepository.findById(roleRequest.getRoleId()).
                orElseThrow(() -> new DataNotFoundException("Can't find this role"));
        account.setRole(role);
        accountRepository.save(account);
        return new ApiResponse("Role update successful",HttpStatus.OK);
    }

    @Override
    public AccountDto accountInformation() {
        Account account=accountRepository.findByusername(SecurityUtils.getUserName());
        if(Objects.isNull(account)){
            throw  new DataNotFoundException("Can't find this account");
        }
        AccountDto accountDto=new AccountDto(account);

        return accountDto;
    }

    @Override
    public AccountDto accountInformation(String accountId) {
        Account account=accountRepository.findById(accountId).
                orElseThrow(() -> new DataNotFoundException("Can't find this account"));
        AccountDto accountDto=new AccountDto(account);

        return accountDto;
    }
}
