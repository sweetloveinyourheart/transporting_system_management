package com.busstation.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tbl_userr")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "user_id", length = 36, nullable = false)
    private String userId;

    @Column(name = "full_name", length = 50, nullable = false)
    private String fullName;

    @Column(name = "phone_number", length = 12, nullable = false)
    private  String phoneNumber;

    @Column(name = "email", length = 50, nullable = false,unique = true)
    private  String email;

    @Column(name = "address", length = 50, nullable = false)
    private String address;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "created_at", nullable = false)
    @CreationTimestamp
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @OneToMany (mappedBy ="user", fetch = FetchType.LAZY)
    public Set<Leave> leaves = new HashSet<>();

    @OneToOne(fetch = FetchType.EAGER, mappedBy = "user")
    private Employee employee;

    @ManyToMany(mappedBy = "users", fetch = FetchType.LAZY)
    private Set<Trip> trips = new HashSet<>();

    @OneToMany (mappedBy ="user", fetch = FetchType.LAZY)
    public Set<Order> orders = new HashSet<>();


    public Boolean getStatus() {
        return status;
    }

    public Boolean setStatus(Boolean status){
        return this.status = status;
    }
}
