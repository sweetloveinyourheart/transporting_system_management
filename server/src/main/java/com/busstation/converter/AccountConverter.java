package com.busstation.converter;

import com.busstation.dto.AccountDto;
import com.busstation.entities.Account;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AccountConverter {
    @Autowired
    private ModelMapper modelMapper;

    public AccountDto converToDto(Account account) {

        AccountDto accountDto = modelMapper.map(account, AccountDto.class);
        return accountDto;
    }
}
