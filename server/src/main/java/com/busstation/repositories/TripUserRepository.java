package com.busstation.repositories;

import com.busstation.entities.TripUser;
import com.busstation.entities.User;
import com.busstation.repositories.mtm.TripUserIdMtm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripUserRepository extends JpaRepository<TripUser, TripUserIdMtm> {
    TripUser findTripUserByUserId(String userId);
}
