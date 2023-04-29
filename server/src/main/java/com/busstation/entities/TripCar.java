package com.busstation.entities;

import com.busstation.repositories.mtm.TripCarIdMtm;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Table(name = "tbl_trip_car")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@IdClass(TripCarIdMtm.class)
public class TripCar implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "trip_id", length = 36, nullable = false)
    private String tripId;

    @Id
    @Column(name = "car_id", length = 36, nullable = false)
    private String carId;

}