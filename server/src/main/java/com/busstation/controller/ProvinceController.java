package com.busstation.controller;

import com.busstation.entities.Location;
import com.busstation.entities.Province;
import com.busstation.payload.request.ProvinceRequest;
import com.busstation.payload.response.ProvinceResponse;
import com.busstation.services.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController(value = "provinceAPIofWeb")
@RequestMapping(value = "/api/v1/provinces")
public class ProvinceController {
    @Autowired
    ProvinceService provinceService;
    @PostMapping(value = "/addListProvince")
    @PreAuthorize("hasAnyRole('ROLE_EMPLOYEE','ROLE_ADMIN')")
    public ResponseEntity<?> saveProvince(@RequestBody List<Province> provinceList){
        return new ResponseEntity<>(provinceService.createProvince(provinceList), HttpStatus.OK);
    }

    @PostMapping(value = "/addListLocation")
    @PreAuthorize("hasAnyRole('ROLE_EMPLOYEE','ROLE_ADMIN')")
    public ResponseEntity<?> saves(@RequestBody List<Location> locations){
        return new ResponseEntity<>(provinceService.createLocation(locations), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getAll(){
        return new ResponseEntity<>(provinceService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/getAllProvinces")
    public ResponseEntity<?> getAllProvince(){
        return new ResponseEntity<>(provinceService.getAllProvince(), HttpStatus.OK);
    }

    @GetMapping("/getAllLocations")
    public ResponseEntity<?> getAllLocation(){
        return new ResponseEntity<>(provinceService.getAllLocation(), HttpStatus.OK);
    }

    @GetMapping("/getAllLocations/{province_id}")
    public ResponseEntity<?> getAllLocationByProvince(@PathVariable("province_id") int provinceId){
        return new ResponseEntity<>(provinceService.getAllLocationByProvince(provinceId), HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> create(@RequestBody ProvinceRequest request){
        ProvinceResponse provinceResponse = provinceService.createProvince(request);
        if(Objects.isNull(provinceResponse))
            return new ResponseEntity<>("Location already exists ", HttpStatus.OK);
        return new ResponseEntity<>(provinceResponse, HttpStatus.CREATED);
    }

    @PutMapping("/{province_id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> update(@RequestBody ProvinceRequest request, @PathVariable("province_id") int provinceId){

        ProvinceResponse provinceResponse = provinceService.updateProvince(request,provinceId);
        if(Objects.isNull(provinceResponse))
            return new ResponseEntity<>("Province already exists ", HttpStatus.OK);
        return new ResponseEntity<>(provinceResponse, HttpStatus.CREATED);
    }

    @PutMapping("/locations/{location_id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateLocation(@RequestBody ProvinceRequest request, @PathVariable("location_id") int locationId){

        ProvinceResponse provinceResponse = provinceService.updateLocation(request,locationId);
        if(Objects.isNull(provinceResponse))
            return new ResponseEntity<>("Location already exists ", HttpStatus.OK);
        return new ResponseEntity<>(provinceResponse, HttpStatus.CREATED);
    }

    @DeleteMapping("/{province_id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable("province_id") int provinceId){
        Boolean deleted = provinceService.deleteProvince(provinceId);
        return new ResponseEntity<>(deleted,HttpStatus.OK);
    }

    @PostMapping("/exportExcel")
    public ResponseEntity<?> exportProvinces(){
        if(provinceService.exportProvinces()){
            return new ResponseEntity<>("Export file excel successfully !", HttpStatus.OK);
        }
        return new ResponseEntity<>("Export file excel failed", HttpStatus.OK);
    }

    @PostMapping("/importExcel")
    public ResponseEntity<?> importProvinces(@RequestParam("file") MultipartFile file){
        try {
            List<ProvinceResponse> provinceResponses = provinceService.importProvinces(file);
            return new ResponseEntity<>(provinceResponses, HttpStatus.OK);
        }catch (IOException e){
            e.printStackTrace();
            return new ResponseEntity<>("Import file excel failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
