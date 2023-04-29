package com.busstation.payload.response;

import com.busstation.entities.Leave;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaveResponse {
    private String leaveId;
    private String userId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date dateStart;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date dateEnd;
    private String reason;

    private Date createdAt;
    private boolean approved;

    public LeaveResponse(Leave leave) {
        this.leaveId = leave.getLeaveId();
        this.userId = leave.getUser().getUserId();
        this.dateStart = leave.getDateStart();
        this.dateEnd = leave.getDateEnd();
        this.reason = leave.getReason();
        this.createdAt = leave.getCreateAt();
        this.approved = leave.isApproved();
    }
}
