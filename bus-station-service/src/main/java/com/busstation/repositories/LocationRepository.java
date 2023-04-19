package com.busstation.repositories;

import com.busstation.entities.Location;
import com.busstation.entities.Province;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer>{

    List<Location> findAllByProvince_ProvinceId(int provinceId);

    Location findByName(String nameLocation);
}
