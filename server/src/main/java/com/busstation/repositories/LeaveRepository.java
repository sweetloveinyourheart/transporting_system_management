package com.busstation.repositories;

import com.busstation.entities.Leave;
import com.busstation.entities.Trip;
import com.busstation.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveRepository extends JpaRepository<Leave, String> {
    Page<Leave> findAllByUser_UserId(String userId, Pageable pageable);

    @Query(value = "FROM Leave leave WHERE date(leave.dateStart) >= date(CURRENT_TIMESTAMP) AND leave.approved = false")
    Page<Leave> findAllLeaves(Pageable pageable);
}
