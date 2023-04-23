package com.busstation.entities;

import com.busstation.enums.TokenEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;

@Entity
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Table(name = "tbl_token")
public class Token implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "token_id", length = 36, nullable = false)
    public String tokenId;

    @Column( length = 250, nullable = false,unique = true)
    public String token;

    @Enumerated(EnumType.STRING)
    public TokenEnum tokenType = TokenEnum.BEARER;

    @Column(name = "revoked")
    public boolean revoked;

    @Column(name="expired")
    public boolean expired;

    @ManyToOne
    @JoinColumn(name = "account_id")
    public Account account;
}
