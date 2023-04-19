package com.busstation.services.impl;


import com.busstation.entities.Car;
import com.busstation.entities.Chair;
import com.busstation.payload.request.ChairRequest;
import com.busstation.payload.response.ChairResponse;
import com.busstation.repositories.CarRepository;
import com.busstation.repositories.ChairRepository;
import com.busstation.services.ChairService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChairServiceImpl implements ChairService {
	@Autowired
	private ChairRepository chairRepository;

	@Autowired
	private CarRepository carRepository;
	@Override
	public Page<ChairResponse> showAllChair(String carId, int pageNumber, int pageSize) {
		Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("chairNumber").ascending());

		Car car = carRepository.findById(carId).orElseThrow(() -> new EntityNotFoundException("Car does not exist"));

		Page<Chair> chairs = chairRepository.findAllByCar(car, pageable);


		return chairs.map(ChairResponse::new);
	}

	@Override
	public List<ChairResponse> showAllChair(String carId) {
		System.out.println(carId+"nnnguyen");
		Car car = carRepository.findById(carId).orElseThrow(() -> new EntityNotFoundException("Car does not exist"));
		List<Chair> chairs= chairRepository.findAllByCar(car);
		return  chairs.stream().map(item->new ChairResponse((Chair) item)).collect(Collectors.toList());
	}

	@Override
	public ChairResponse searchChairNumber(String carId, int chairNumber) {

		Car car = carRepository.findById(carId).orElseThrow(() -> new EntityNotFoundException("Car does not exist"));
		Chair chairs = chairRepository.findAllByCarAndChairNumber(car, chairNumber);

		ChairResponse chairResponse = new ChairResponse();
		chairResponse.setChairId(chairs.getChairId());
		chairResponse.setCarId(chairs.getCar().getCarId());
		chairResponse.setChairNumber(chairs.getChairNumber());
		chairResponse.setStatus(chairs.getStatus());
		return chairResponse;
	}

	@Override
	public ChairResponse addChair(ChairRequest request) {
		Car car = carRepository.findById(request.getCarId())
				.orElseThrow(() -> new RuntimeException("Car ID does not exist"));
		Chair chair = new Chair();
		chair.setChairNumber(request.getChairNumber());
		chair.setCar(car);
		chair.setStatus(request.getStatus());
		chairRepository.save(chair);

		Chair newChair = chairRepository.save(chair);
		ChairResponse chairResponse = new ChairResponse();
		chairResponse.setChairId(newChair.getChairId());
		chairResponse.setChairNumber(newChair.getChairNumber());
		chairResponse.setCarId(newChair.getCar().getCarId());
		chairResponse.setStatus(newChair.getStatus());

		//No exception handling : chair number

		return chairResponse;
	}

	@Override
	public boolean updateChair(String chairId, ChairRequest request) {
		Chair chair = chairRepository.findById(chairId)
				.orElseThrow(() -> new RuntimeException("Chair does not exist"));
		Car car = carRepository.findById(request.getCarId())
				.orElseThrow(() -> new RuntimeException("Car ID does not exist"));
		chair.setCar(car);
		chair.setChairNumber(request.getChairNumber());
		chair.setStatus(request.getStatus());
		chairRepository.save(chair);

		//No exception handling : chair number

		return true;
	}

	@Override
	public ChairResponse updateStatus(String chairId) {
		Chair chair = chairRepository.findById(chairId)
				.orElseThrow(() -> new RuntimeException("Chair does not exist"));
		chair.setStatus(Boolean.FALSE);

		Chair newChair = chairRepository.save(chair);

		ChairResponse chairResponse = new ChairResponse();
		chairResponse.setChairId(newChair.getChairId());
		chairResponse.setChairNumber(newChair.getChairNumber());
		chairResponse.setCarId(newChair.getCar().getCarId());
		chairResponse.setStatus(newChair.getStatus());


		return chairResponse;

	}

	@Override
	public boolean deleteChair(String chairId) {
		Chair chair = chairRepository.findById(chairId)
				.orElseThrow(()-> new RuntimeException("Id does not exist"));
		chairRepository.delete(chair);
		return true;
	}
}
