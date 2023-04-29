package com.busstation.repositories;

import com.busstation.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {

    boolean existsByusername(String username);
    Account findByusername(String username);
    Account findByUsernameAndPassword(String username, String password);
}
