package com.busstation.services;

import com.busstation.dto.AccountDto;
import com.busstation.dto.UserDto;
import com.busstation.payload.request.UserRequest;
import com.busstation.payload.response.ApiResponse;
import org.springframework.data.domain.Page;

public interface UserService {

    Page<AccountDto> getAlL(String keyword, int pageNumber, int pageSize);

    ApiResponse edit(String id, UserRequest userRequest);
    
    ApiResponse setStatus(String id);
}
