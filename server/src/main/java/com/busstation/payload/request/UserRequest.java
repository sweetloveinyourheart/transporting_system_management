package com.busstation.payload.request;

import lombok.*;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@ToString
public class UserRequest {

    private String fullName;

    private String phoneNumber;

    private String email;

    private String address;

    private Boolean status;

}
