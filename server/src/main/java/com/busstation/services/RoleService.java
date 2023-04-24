package com.busstation.services;

import com.busstation.dto.RoleDto;
import com.busstation.payload.request.RoleRequest;
import com.busstation.payload.response.RoleResponse;

import java.util.List;

public interface RoleService {

    List<RoleDto> getAll();
    RoleResponse createRole(RoleRequest request);

    RoleResponse updateRole(String roleId,RoleRequest request);

    Boolean deleteRole(String roleId);

}
