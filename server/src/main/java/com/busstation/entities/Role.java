package com.busstation.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tbl_role")
public class Role implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "role_id", length = 20, nullable = false)
    private String roleId;

    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @OneToMany (mappedBy ="role")
    public Set<Account> users = new HashSet<>();
}
