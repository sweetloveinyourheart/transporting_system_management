package com.busstation.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.jetbrains.annotations.NotNull;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class LoginRequest {

    private String username;

    private String password;
    
}
