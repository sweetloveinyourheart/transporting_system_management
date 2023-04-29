package com.busstation.repositories.custom;

import com.busstation.entities.Account;
import com.busstation.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserRepositoryCustom {
    Page<Account> getFilter(String keyword, String role, Pageable pageable);
}
