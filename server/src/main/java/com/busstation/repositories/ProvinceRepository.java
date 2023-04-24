package com.busstation.repositories;

import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

import com.busstation.entities.Province;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProvinceRepository extends JpaRepository<Province , Integer>{
    Province findByName(String name);

    @Query(value = "FROM Province province JOIN province.locations")
    @NotNull
    List<Province> findAll();
}
