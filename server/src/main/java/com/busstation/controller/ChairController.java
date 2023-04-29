package com.busstation.controller;

import com.busstation.payload.request.ChairRequest;
import com.busstation.payload.response.ChairResponse;
import com.busstation.services.ChairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController(value = "chairAPIofWeb")
@RequestMapping("/api/v1/chairs")
public class ChairController {

    @Autowired
    private ChairService chairService;

    //Show all chair by Car
    @GetMapping("/{carId}")
    public ResponseEntity<?> showAllChairNumberByCar(@PathVariable("carId") String carId, @RequestParam(value = "pageNo", defaultValue = "0") int pageNo, @RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {

        return new ResponseEntity<>(chairService.showAllChair(carId, pageNo, pageSize), HttpStatus.OK);
    }

    //Search ChairNumber by CarId
    @GetMapping("/{carId}/{chairNumber}")
    public ResponseEntity<?> searchChairNumber(@PathVariable("carId") String carId, @PathVariable("chairNumber") int chairNumber) {
        return new ResponseEntity<>(chairService.searchChairNumber(carId, chairNumber), HttpStatus.OK);

    }

    @PostMapping()
    public ResponseEntity<?> createChair(@RequestBody ChairRequest chairRequest) {
        ChairResponse chairResponse = chairService.addChair(chairRequest);
        return new ResponseEntity<>(chairResponse, HttpStatus.CREATED);
    }

    @PutMapping("/{chairId}")
    @PreAuthorize("hasAnyRole('ROLE_EMPLOYEE','ROLE_ADMIN')")
    public ResponseEntity<?> updateChair(@RequestBody ChairRequest request, @PathVariable("chairId") String chairId) {
        chairService.updateChair(chairId, request);
        return new ResponseEntity<>("Updated !!!", HttpStatus.OK);
    }

    @DeleteMapping("/{chairId}")
    @PreAuthorize("hasAnyRole('ROLE_EMPLOYEE','ROLE_ADMIN')")
    public ResponseEntity<?> deleteChiar(@PathVariable("chairId") String chairId) {
        if (chairService.deleteChair(chairId)) {
            return new ResponseEntity<>("Deleted !!!", HttpStatus.OK);
        }
        return new ResponseEntity<>("Delete failed !!!", HttpStatus.BAD_GATEWAY);
    }
}
