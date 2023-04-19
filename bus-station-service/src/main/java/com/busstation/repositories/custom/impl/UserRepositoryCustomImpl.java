package com.busstation.repositories.custom.impl;

import com.busstation.common.Validate;
import com.busstation.entities.Account;
import com.busstation.entities.Role;
import com.busstation.entities.User;
import com.busstation.enums.NameRoleEnum;
import com.busstation.repositories.custom.UserRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class UserRepositoryCustomImpl implements UserRepositoryCustom {
    @Autowired
    private EntityManager entityManager;

    @Override
    public Page<Account> getFilter(String keyword, String role, Pageable pageable) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Account> query = cb.createQuery(Account.class);
        Root<Account> root = query.from(Account.class);
        List<Predicate> predList = new ArrayList<>();
        Join<Account,User> join = root.join("user", JoinType.LEFT);
        Join<Account, Role> roleJoin = root.join("role", JoinType.LEFT);
        if (Validate.checkStringNotEmptyOrNull(keyword)) {
            predList.add(cb.or((cb.like(join.get("email"), "%" + keyword + "%")), cb.like(join.get("phoneNumber"), "%" + keyword + "%")));
        }
        predList.add(cb.equal(join.get("status"),Boolean.TRUE));
        if (role.equalsIgnoreCase(NameRoleEnum.ROLE_USER.toString())) {
            predList.add(cb.equal(roleJoin.get("name"), NameRoleEnum.ROLE_USER.toString()));
        } else if (role.equalsIgnoreCase(NameRoleEnum.ROLE_DRIVER.toString())) {
            predList.add(cb.equal(roleJoin.get("name"), NameRoleEnum.ROLE_DRIVER.toString()));
        } else if (role.equalsIgnoreCase(NameRoleEnum.ROLE_EMPLOYEE.toString())) {
            predList.add(cb.equal(roleJoin.get("name"), NameRoleEnum.ROLE_EMPLOYEE.toString()));
        }
        Predicate[] predArray = new Predicate[predList.size()];
        predList.toArray(predArray);
        query.where(predArray);
        query.select(root);

        List<Account> typedQuery = entityManager.createQuery(query).setFirstResult((int) pageable.getOffset())
                .setMaxResults(pageable.getPageSize())
                .getResultList();
        Page<Account> accounts = new PageImpl<>(typedQuery, pageable, typedQuery.size());
        return accounts;
    }
}
