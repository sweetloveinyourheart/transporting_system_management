package com.busstation.repositories;

import com.busstation.entities.Employee;
import com.busstation.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,String> {

    Employee findByUser(User userId);

    Page<Employee> findAllByCarIsNotNull(Pageable pageable);


}
