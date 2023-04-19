package com.busstation.entities;

import com.busstation.repositories.mtm.TripUserIdMtm;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Table(name = "tbl_trip_user")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@IdClass(TripUserIdMtm.class)
public class TripUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "trip_id", length = 36, nullable = false)
    private String tripId;

    @Id
    @Column(name = "user_id", length = 36, nullable = false)
    private String userId;
}
