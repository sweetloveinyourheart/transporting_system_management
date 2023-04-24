package com.busstation.repositories.mtm;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class TripUserIdMtm implements Serializable {
    private static final long serialVersionUID = 1L;

    private String tripId;

    private String userId;
}
