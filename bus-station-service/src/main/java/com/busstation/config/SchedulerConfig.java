package com.busstation.config;


import com.busstation.services.TokenService;
import com.busstation.utils.JwtProviderUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@EnableScheduling
@Configuration
public class SchedulerConfig {

    @Autowired
    private TokenService tokenService;


//    @Scheduled(fixedDelay =360000000)
//    public void  checkTokenExpired(){
//        tokenService.heckTokenExpired();
//    }
}
