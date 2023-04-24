package com.busstation.services.impl;

import com.busstation.converter.UserConverter;
import com.busstation.dto.AccountDto;
import com.busstation.dto.UserDto;
import com.busstation.entities.Account;
import com.busstation.entities.User;
import com.busstation.enums.NameRoleEnum;
import com.busstation.exception.DataNotFoundException;
import com.busstation.payload.request.UserRequest;
import com.busstation.payload.response.ApiResponse;
import com.busstation.repositories.AccountRepository;
import com.busstation.repositories.UserRepository;
import com.busstation.repositories.custom.UserRepositoryCustom;
import com.busstation.services.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRepositoryCustom userRepositoryCustom;
    @Autowired
    private UserConverter userConverter;

    @Override
    public Page<AccountDto> getAlL(String keyword, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize, Sort.by("fullName").ascending());
        Page<Account> users =userRepositoryCustom.getFilter(keyword, NameRoleEnum.ROLE_USER.toString(), pageable);
        Page<AccountDto> userDtoList = users.map(AccountDto::new);
        return userDtoList;
    }

    @Override
    @Transactional
    public ApiResponse edit(String id, UserRequest userRequest) {
        User user=userRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Can't find this user"));
        user.setFullName(userRequest.getFullName());
        user.setPhoneNumber(userRequest.getPhoneNumber());
        user.setEmail(userRequest.getEmail());
        user.setAddress(userRequest.getAddress());
        user.setUpdatedAt(new Date());
        userRepository.save(user);
        return new ApiResponse("Updated successfully", HttpStatus.OK);
    }

    @Override
    public ApiResponse setStatus(String id) {
        User user = userRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Can't find this user"));
        user.setStatus(false);
        userRepository.save(user);
        return new ApiResponse("Set status user successfully", HttpStatus.OK);
    }
}
