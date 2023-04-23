package com.busstation.services;

import com.busstation.dto.AccountDto;
import com.busstation.payload.request.ChangePasswordRequest;
import com.busstation.payload.request.RoleRequest;
import com.busstation.payload.response.ApiResponse;

public interface AccountService {
    ApiResponse changePassword(ChangePasswordRequest changePasswordRequest);

    ApiResponse updateRole(String accountid,RoleRequest roleRequest);

    AccountDto accountInformation();

    AccountDto accountInformation(String accountId);

}
