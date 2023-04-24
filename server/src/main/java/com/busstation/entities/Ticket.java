package com.busstation.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;


import java.io.Serializable;
import java.math.BigDecimal;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "tbl_ticket")
public class Ticket implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "ticket_id", length = 36, nullable = false)
    private String ticketId;

    @Column(name = "address_start", length = 50, nullable = false)
    private String addressStart;
    @Column(name = "address_end", length = 50,nullable = false)
    private String addressEnd;

    @Column(name = "price", nullable = false, length = 18)
    private BigDecimal price;

    @Column(name = "pick_up_location" , length = 50)
    private String pickupLocation;

    @Column(name = "drop_off_location " , length = 50)
    private String dropOffLocation ;
}
