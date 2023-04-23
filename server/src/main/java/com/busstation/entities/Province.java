package com.busstation.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "tbl_province")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class Province implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "province_id", updatable = false , length = 11)
	private int provinceId;

	@Column(name = "name", nullable = false, length = 50)
	private String name;

	@OneToMany(mappedBy = "province", cascade = CascadeType.ALL)
	private Set<Location> locations;

}
