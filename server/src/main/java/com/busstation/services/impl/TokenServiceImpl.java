package com.busstation.services.impl;

import com.busstation.entities.Token;
import com.busstation.repositories.TokenRepository;
import com.busstation.services.TokenService;
import com.busstation.utils.JwtProviderUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TokenServiceImpl implements TokenService {

    @Autowired
    private JwtProviderUtils jwtProviderUtils;

    @Autowired
    private TokenRepository tokenRepository;

    @Override
    public void heckTokenExpired() {
        List<Token> tokens = tokenRepository.findAllByExpired(Boolean.TRUE);
        for(Token token:tokens){
            if(!jwtProviderUtils.validateToken(token.getToken())){
                Token newToken=token;
                newToken.setExpired(Boolean.TRUE);
                tokenRepository.save(newToken);
            }
        }
    }
}
