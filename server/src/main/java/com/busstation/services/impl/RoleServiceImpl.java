package com.busstation.services.impl;

import com.busstation.converter.RoleConverter;
import com.busstation.dto.RoleDto;
import com.busstation.entities.Role;
import com.busstation.payload.request.RoleRequest;
import com.busstation.payload.response.RoleResponse;
import com.busstation.repositories.RoleRepository;
import com.busstation.services.RoleService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RoleConverter roleConverter;

    @Override
    public List<RoleDto> getAll() {
        List<Role> roleList=roleRepository.findAll();
        List<RoleDto> roleDtos=new ArrayList<>();
        for (Role role: roleList){
            RoleDto roleDto=roleConverter.converToDto(role);
            roleDtos.add(roleDto);
        }
        return roleDtos;
    }

    @Override
    public RoleResponse createRole(RoleRequest request) {

        Role role = new Role();
        role.setRoleId(request.getRoleId());
        role.setName(request.getName());

        Role newRole = roleRepository.save(role);

        RoleResponse response = new RoleResponse();
        response.setRoleId(newRole.getRoleId());
        response.setName(newRole.getName());

        return response;
    }

    @Override
    public RoleResponse updateRole(String roleId, RoleRequest request) {

        Role role = roleRepository.findById(roleId).orElseThrow(()-> new EntityNotFoundException("Role does not exist"));

        role.setName(request.getName());
        roleRepository.save(role);

        RoleResponse response = new RoleResponse();
        response.setRoleId(role.getRoleId());
        response.setName(role.getName());

        return response;
    }

    @Override
    public Boolean deleteRole(String roleId) {

        Role role = roleRepository.findById(roleId).orElseThrow(()-> new EntityNotFoundException("Role does not exist"));
        roleRepository.delete(role);
        return true;
    }
}
