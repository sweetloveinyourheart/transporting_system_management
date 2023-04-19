package com.busstation.converter;

import com.busstation.dto.RoleDto;
import com.busstation.dto.UserDto;
import com.busstation.entities.Role;
import com.busstation.entities.User;
import com.busstation.payload.request.UserRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RoleConverter {
    @Autowired
    private ModelMapper modelMapper;

    public RoleDto converToDto(Role role) {
        RoleDto roleDto = modelMapper.map(role, RoleDto.class);
        return roleDto;
    }
}
