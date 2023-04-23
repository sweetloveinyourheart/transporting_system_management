package com.busstation.repositories;

import com.busstation.entities.Car;
import com.busstation.entities.Trip;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Repository
public interface TripRepository extends JpaRepository<Trip,String> {

    @Query(value = "FROM Trip trip WHERE trip.timeStart >= CURRENT_TIMESTAMP AND trip.status = true")
    Page<Trip> findAllTrips(Pageable pageable);

    @Query(value = "FROM Trip trip WHERE trip.timeStart >= CURRENT_TIMESTAMP AND trip.status = true AND :car MEMBER OF trip.cars")
    List<Trip> findAllByCar(@Param("car") Car car);

    @Query(value = "FROM Trip trip WHERE trip.timeStart >= CURRENT_TIMESTAMP AND trip.provinceStart = :province_start " +
            "AND trip.provinceEnd = :province_end AND trip.status = true AND trip.timeStart = :dateTime")
    Optional<Trip> findByProvinceStartAndProvinceEnd(@Param("province_start") String provinceStart, @Param("province_end") String provinceEnd,
                                                     @Param("dateTime") LocalDateTime dateTime);

    @Query(value = "FROM Trip trip WHERE trip.timeStart >= CURRENT_TIMESTAMP" +
            " AND trip.provinceStart = :province_start AND trip.provinceEnd = :province_end AND trip.status = true")
    Page<Trip> findByProvinceStartAndProvinceEnd(@Param("province_start") String provinceStart, @Param("province_end") String provinceEnd, Pageable pageable);

    @Query("FROM Trip trip WHERE trip.timeStart >= CURRENT_TIMESTAMP" +
            " AND trip.provinceStart = :provinceStart AND trip.provinceEnd = :provinceEnd" +
            " AND date(trip.timeStart) = date(:dateTime) AND trip.status = true")
    Page<Trip> findByProvinceStartAndProvinceEndAndDateTime(@Param("provinceStart") String provinceStart, @Param("provinceEnd") String provinceEnd,
                                                            @Param("dateTime") LocalDateTime dateTime, Pageable pageable);
    List<Trip> findByCars(Car car);

    List<Trip> findAllByCars(Car car);
}
