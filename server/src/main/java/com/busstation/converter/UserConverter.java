package com.busstation.converter;

import com.busstation.dto.UserDto;
import com.busstation.entities.User;
import com.busstation.payload.request.UserRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserConverter {

    @Autowired
    private ModelMapper modelMapper;

    public User converToEntity(UserRequest userRequest) {
        User user = modelMapper.map(userRequest, User.class);
        return user;
    }

    public UserDto converToDto(User user) {
        UserDto userDto = modelMapper.map(user, UserDto.class);
        return userDto;
    }
}
