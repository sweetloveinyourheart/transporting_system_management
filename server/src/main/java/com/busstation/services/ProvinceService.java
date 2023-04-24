package com.busstation.services;

import com.busstation.entities.Location;
import com.busstation.entities.Province;
import com.busstation.payload.request.ProvinceRequest;
import com.busstation.payload.response.LocationResponse;
import com.busstation.payload.response.ProvinceResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProvinceService {
    boolean createProvince(List<Province> provinces);

    boolean createLocation(List<Location> locations);

    List<ProvinceResponse> getAll();

    List<ProvinceResponse> getAllProvince();

    List<LocationResponse> getAllLocation();

    List<LocationResponse> getAllLocationByProvince(int provinceId);

    ProvinceResponse createProvince(ProvinceRequest request);

    ProvinceResponse updateProvince(ProvinceRequest request, int provinceId);

    ProvinceResponse updateLocation(ProvinceRequest request, int locationId);

    Boolean deleteProvince(int provinceId);


    Boolean exportProvinces();

    List<ProvinceResponse> importProvinces(MultipartFile file) throws IOException;
}
