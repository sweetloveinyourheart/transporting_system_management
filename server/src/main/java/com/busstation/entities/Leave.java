package com.busstation.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "tbl_leave")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class Leave implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "leave_id",length = 36)
    private String leaveId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @Column(name = "date_start", nullable = false)
    private Date dateStart;
    @Column(name = "date_end", nullable = false)
    private Date dateEnd;

    @Column(name = "reason", nullable = false, length = 500)
    private String reason;
    @Column(name = "created_at", nullable = false)
    @CreationTimestamp
    private Date createAt;

    @Column(name = "approved", nullable = false)
    private boolean approved = false;
}
