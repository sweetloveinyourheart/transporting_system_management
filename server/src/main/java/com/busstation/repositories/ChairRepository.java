package com.busstation.repositories;

import com.busstation.entities.Car;
import com.busstation.entities.Chair;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ChairRepository extends JpaRepository<Chair, String> {


    Page<Chair> findAllByCar(Car car, Pageable pageable);

    List<Chair> findAllByCar(Car car);
    Chair findAllByCarAndChairNumber(Car car, int chairNumber);

}
