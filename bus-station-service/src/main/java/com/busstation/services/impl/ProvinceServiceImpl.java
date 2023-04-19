package com.busstation.services.impl;

import com.busstation.common.Constant;
import com.busstation.entities.Location;
import com.busstation.entities.Province;
import com.busstation.exception.DataNotFoundException;
import com.busstation.payload.request.ProvinceRequest;
import com.busstation.payload.response.LocationResponse;
import com.busstation.payload.response.ProvinceResponse;
import com.busstation.repositories.LocationRepository;
import com.busstation.repositories.ProvinceRepository;
import com.busstation.services.ProvinceService;
import jakarta.transaction.Transactional;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.*;

@Service
public class ProvinceServiceImpl implements ProvinceService {

    private static final String FILE_PATH = Constant.EXCEL_PARH +"/provinces.xlsx";
    @Autowired
    ProvinceRepository provinceRepository;

    @Autowired
    LocationRepository locationRepository;

    @Override
    public boolean createProvince(List<Province> provinces) {
        if(provinceRepository.saveAll(provinces) != null)
            return true;
        return false;
    }

    @Override
    public boolean createLocation(List<Location> locations) {
        if(locationRepository.saveAll(locations) != null)
            return true;
        return false;
    }

    @Override
    public List<ProvinceResponse> getAll() {

        List<Province> provinces = provinceRepository.findAll();

        List<ProvinceResponse> provinceResponseList = new ArrayList<>();
        for (Province province : provinces){

            ProvinceResponse provinceResponse = new ProvinceResponse();
            provinceResponse.setProvinceId(province.getProvinceId());
            provinceResponse.setName(province.getName());
            provinceResponse.setLocation(setupResponsesLocation(province));
            provinceResponseList.add(provinceResponse);
        }
        return provinceResponseList;
    }

    @Override
    public List<ProvinceResponse> getAllProvince() {
        List<Province> provinces = provinceRepository.findAll();

        List<ProvinceResponse> provinceResponseList = new ArrayList<>();
        for (Province province : provinces){

            ProvinceResponse provinceResponse = new ProvinceResponse();
            provinceResponse.setProvinceId(province.getProvinceId());
            provinceResponse.setName(province.getName());
            provinceResponseList.add(provinceResponse);
        }
        return provinceResponseList;
    }

    @Override
    public List<LocationResponse> getAllLocation() {

        List<Location> locations = locationRepository.findAll();

        List<LocationResponse> locationResponses = new ArrayList<>();

        for(Location location : locations){
            LocationResponse locationResponse = new LocationResponse();
            locationResponse.setLocationId(location.getLocationId());
            locationResponse.setName(location.getName());

            locationResponses.add(locationResponse);
        }

        return locationResponses;
    }

    @Override
    public List<LocationResponse> getAllLocationByProvince(int provinceId) {

        Optional<Province> checkProvince = provinceRepository.findById(provinceId);

        if(checkProvince.isPresent()){
            return setupResponsesLocation(checkProvince.get());
        }

        return null;
    }

    @Override
    @Transactional
    public ProvinceResponse createProvince(ProvinceRequest request) {

        Location checkLocation = locationRepository.findByName(request.getNameLocation());

        if(Objects.nonNull(checkLocation)){
            return null;
        }

        Province checkProvince = provinceRepository.findByName(request.getNameProvince());

        Province newProvince;

        ProvinceResponse response = new ProvinceResponse();

        Province province = new Province();

        Location location = new Location();

        if(Objects.isNull(checkProvince)){

            province.setName(request.getNameProvince());
            newProvince = provinceRepository.save(province);

            location.setProvince(newProvince);
            location.setName(request.getNameLocation());

            locationRepository.save(location);

            response.setProvinceId(newProvince.getProvinceId());
            response.setName(newProvince.getName());

            response.setLocation(setupResponsesLocation(newProvince));
        }
        else {
            location.setProvince(checkProvince);
            location.setName(request.getNameLocation());

            locationRepository.save(location);

            response.setProvinceId(checkProvince.getProvinceId());
            response.setName(checkProvince.getName());

            response.setLocation(setupResponsesLocation(checkProvince));
        }

        return response;
    }

    @Override
    public ProvinceResponse updateProvince(ProvinceRequest request, int provinceId) {

        Province province = provinceRepository.findById(provinceId).orElseThrow(()->new DataNotFoundException("Province not found"));

        if(province.getName().equals(request.getNameProvince()))
            return null;

        province.setName(request.getNameProvince());
        Province updateProvince = provinceRepository.save(province);

        ProvinceResponse response = new ProvinceResponse();
        response.setProvinceId(updateProvince.getProvinceId());
        response.setName(updateProvince.getName());

        response.setLocation(setupResponsesLocation(updateProvince));

        return response;
    }

    @Override
    public ProvinceResponse updateLocation(ProvinceRequest request, int locationId) {

        Location location = locationRepository.findById(locationId).orElseThrow(()->new DataNotFoundException("Location not found"));

        if(location.getName().equals(request.getNameLocation()))
            return null;

        location.setName(request.getNameLocation());
        locationRepository.save(location);

        ProvinceResponse response = new ProvinceResponse();
        response.setProvinceId(location.getProvince().getProvinceId());
        response.setName(location.getProvince().getName());

        response.setLocation(setupResponsesLocation(location.getProvince()));

        return response;
    }

    @Override
    public Boolean deleteProvince(int provinceId) {

        Optional<Province> province = provinceRepository.findById(provinceId);

        if(province.isPresent()){
            provinceRepository.delete(province.get());
            return true;
        }
        return false;
    }

    //fix code I/O Provinces
    @Override
    public Boolean exportProvinces() {

        try (Workbook workbook = new XSSFWorkbook()) {
            File dataDir = new File(Constant.EXCEL_PARH);
            if (!dataDir.exists()) {
                dataDir.mkdir();
            }



            List<Province> provinces = provinceRepository.findAll();
            Sheet sheet = workbook.createSheet("Provinces");

            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("ID Province");
            header.createCell(1).setCellValue("Provinces Name");
            header.createCell(2).setCellValue("ID City");
            header.createCell(3).setCellValue("City Name");

            for (int i = 0; i < provinces.size(); i++) {
                Province province = provinces.get(i);
                Row row = sheet.createRow(i + 1);
                row.createCell(0).setCellValue(province.getProvinceId());
                row.createCell(1).setCellValue(province.getName());
            }

            try (FileOutputStream fileOutputStream = new FileOutputStream(FILE_PATH)) {
                workbook.write(fileOutputStream);
                return true;
            } catch (IOException e) {
                e.printStackTrace();
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public List<ProvinceResponse> importProvinces(MultipartFile file) throws IOException {
        List<ProvinceResponse> provinceResponses = new ArrayList<>();

        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())){
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rows = sheet.iterator();

            if(rows.hasNext()){
                rows.next();
            }

            while(rows.hasNext()){
                Row row = rows.next();

                int idProvince = (int) row.getCell(0).getNumericCellValue();
                String provinceName = row.getCell(1).getStringCellValue();
                int idCity = (int) row.getCell(2).getNumericCellValue();
                String cityName = row.getCell(3).getStringCellValue();

                Province province = new Province(idProvince, provinceName, null);

                provinceRepository.save(province);

                LocationResponse locationResponse = new LocationResponse(idCity, cityName);

            }

        }catch (IOException e){
            e.printStackTrace();
            throw e;
        }

        return provinceResponses;
    }

    private List<LocationResponse> setupResponsesLocation(Province province){

        List<Location> locations = locationRepository.findAllByProvince_ProvinceId(province.getProvinceId());

        List<LocationResponse> locationResponses = new ArrayList<>();

        for(Location location : locations){

            LocationResponse locationResponse = new LocationResponse();
            locationResponse.setLocationId(location.getLocationId());
            locationResponse.setName(location.getName());

            locationResponses.add(locationResponse);
        }

        return locationResponses;
    }

}
