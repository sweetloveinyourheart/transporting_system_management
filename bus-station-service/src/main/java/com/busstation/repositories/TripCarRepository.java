package com.busstation.repositories;

import com.busstation.entities.TripCar;
import com.busstation.repositories.mtm.TripCarIdMtm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripCarRepository extends JpaRepository<TripCar, TripCarIdMtm> {
}
