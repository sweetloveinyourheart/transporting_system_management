package com.busstation.services;


import com.busstation.payload.request.ChairRequest;
import com.busstation.payload.response.ChairResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ChairService {
    Page<ChairResponse> showAllChair(String carId, int pageNumber, int pageSize);

    List<ChairResponse> showAllChair(String carId);

    ChairResponse searchChairNumber(String carId, int chairNumber);

    ChairResponse addChair(ChairRequest request);

    boolean updateChair(String chairId, ChairRequest request);

    ChairResponse updateStatus(String chairId);

    boolean deleteChair(String chairId);
}
