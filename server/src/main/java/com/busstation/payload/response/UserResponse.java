package com.busstation.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

    private String userId;

    private String fullName;

    private  String phoneNumber;

    private  String email;

    private String address;

    private boolean status;

    public boolean getStatus() {
        return this.status;
    }
}
