package com.busstation.repositories;

import com.busstation.entities.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, String> {
    @Query(value = """
			select t from Token t inner join Account a\s
			on t.account.accountId = a.accountId\s
			where a.accountId = :id and (t.expired = false or t.revoked = false)\s
			""")
    List<Token> findAllValidTokenByUser(String id);

    Optional<Token> findByToken(String token);

	List<Token> findAllByExpired(Boolean exprired);
}
