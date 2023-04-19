package com.busstation.services.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.*;

import com.busstation.payload.request.DashboardByDateRequest;
import com.busstation.payload.request.DashboardRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.busstation.payload.response.dashboard.YearlyRevenueResponse;
import com.busstation.repositories.OrderDetailRepository;
import com.busstation.repositories.OrderRepository;
import com.busstation.services.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService{

	@Autowired
	private OrderDetailRepository orderDetailRepository;

	@Autowired
	private OrderRepository orderRepository;

	public int getTotalRevenueForMonth(int month, int year) {
		double sum = 0.0;
		List<Double> lstPriceForMonth = new ArrayList<>();
		lstPriceForMonth = orderDetailRepository.getPriceByMonthAndUpdateAt(month, year);
		if(lstPriceForMonth == null || lstPriceForMonth.isEmpty()) {
			lstPriceForMonth = orderDetailRepository.getPriceByMonthAndCreateAt(month, year);
			if(lstPriceForMonth == null || lstPriceForMonth.isEmpty()) {
				return 0;
			}
		}
		for(Double price: lstPriceForMonth) {
			sum += price;
		}
		int result = (int) sum;
		return result;
	}

	public int getTotalRevenueForYear(int year) {
		double sum = 0.0;
		List<Double> lstPrice = new ArrayList<>();
		lstPrice = orderDetailRepository.getPriceByYearAndUpdateAt(year);
		if(lstPrice == null || lstPrice.isEmpty()) {
			lstPrice = orderDetailRepository.getPriceByYearAndCreateAt(year);
			if(lstPrice == null || lstPrice.isEmpty()) {
				return 0;
			}
		}
		for(Double price: lstPrice) {
			sum += price;
		}
		int result = (int) sum;
		return result;
	}

	public List<Integer> getOrderForMonths(int year) {

		List<Integer> lstOrder = new ArrayList<>();
		for(int i = 1; i<=12; i++) {
			lstOrder.add(orderRepository.countOrdersByMonthAndYear(i, year));
		}
		return lstOrder;
	}

	public int getTotalOrderForYear(int year) {
		List<Integer> lstOrder = getOrderForMonths(year);
		int sum = 0;
		for(Integer i:lstOrder) {
			sum += i;
		}
		return sum;
	}

	public List<Integer> getRevenueForMonths(int year) {
		List<Integer> lstPrice = new ArrayList<>();
		for(int i = 1; i<=12; i++) {
			lstPrice.add(getTotalRevenueForMonth(i, year));
		}
		return lstPrice;
	}

	@Override
	public YearlyRevenueResponse getRevenueDataForYear(int year) {
		YearlyRevenueResponse yrr = new YearlyRevenueResponse();
		yrr.setRevenue(getRevenueForMonths(year));
		yrr.setOrder(getOrderForMonths(year));
		yrr.setTotalRevenue(getTotalRevenueForYear(year));
		yrr.setTotalOrder(getTotalOrderForYear(year));
		return yrr;
	}
	@Override
	public Map<String, Object> statistic(DashboardRequest dashboardRequest) {
		List<Object[]> resultList = orderDetailRepository.getOrderDetailsByMonth(dashboardRequest.getMonth(),
				dashboardRequest.getYear());
		List<Integer> revenueList = new ArrayList<>();
		List<Integer> orderList = new ArrayList<>();
		List<Integer> dayList = new ArrayList<>();
		BigDecimal totalRevenue = BigDecimal.ZERO;
		int totalOrder = 0;
		int dayOfMonth = getNumberOfDays(dashboardRequest.getYear(), dashboardRequest.getMonth());

		for (int i = 1; i <= dayOfMonth; i++) {
			int revenue = 0;
			int order = 0;
			for (Object[] obj : resultList) {
				int day = ((Number) obj[2]).intValue();
				if (day == i) {
					BigDecimal revenueValue = obj[0] == null ? BigDecimal.ZERO : (BigDecimal) obj[0];
					revenue += revenueValue.setScale(0, RoundingMode.DOWN).intValue();
					order += ((Number) obj[1]).intValue();
					totalRevenue = totalRevenue.add(revenueValue);
					totalOrder += ((Number) obj[1]).intValue();
				}
			}
			revenueList.add(revenue);
			orderList.add(order);
			dayList.add(i);
		}

		Map<String, Object> response = new HashMap<>();
		response.put("revenue", revenueList);
		response.put("order", orderList);
		response.put("day", dayList);
		response.put("totalOrder", totalOrder);
		response.put("totalRevenue", totalRevenue.setScale(0, RoundingMode.DOWN).intValue());
		return response;
	}


	@Override
	public Map<String, Object> statistics(DashboardByDateRequest dashboardByDateRequest) {
		List<Object[]> resultList = orderDetailRepository.getOrderDetailsByDate(dashboardByDateRequest.getStart(),
				dashboardByDateRequest.getEnd());
		List<Integer> revenueList = new ArrayList<>();
		List<Integer> orderList = new ArrayList<>();
		List<Integer> dayList = new ArrayList<>();
		BigDecimal totalRevenue = BigDecimal.ZERO;
		int totalOrder = 0;
		Date startDate = dashboardByDateRequest.getStart();
		Date endDate = dashboardByDateRequest.getEnd();

		LocalDate startLocalDate = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
		LocalDate endLocalDate = endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

		long daysBetween = ChronoUnit.DAYS.between(startLocalDate, endLocalDate);
		int days = (int) daysBetween;

		for (int i = 1; i <= days; i++) {
			int revenue = 0;
			int order = 0;
			for (Object[] obj : resultList) {
				int day = ((Number) obj[2]).intValue();
				if (day == i) {
					BigDecimal revenueValue = obj[0] == null ? BigDecimal.ZERO : (BigDecimal) obj[0];
					revenue += revenueValue.setScale(0, RoundingMode.DOWN).intValue();
					order += ((Number) obj[1]).intValue();
					totalRevenue = totalRevenue.add(revenueValue);
					totalOrder += ((Number) obj[1]).intValue();
				}
			}
			revenueList.add(revenue);
			orderList.add(order);
			dayList.add(i);
		}

		Map<String, Object> response = new HashMap<>();
		response.put("revenue", revenueList);
		response.put("order", orderList);
		response.put("day", dayList);
		response.put("totalOrder", totalOrder);
		response.put("totalRevenue", totalRevenue.setScale(0, RoundingMode.DOWN).intValue());
		return response;
	}

	public int getNumberOfDays(int year, int month) {
		YearMonth yearMonth = YearMonth.of(year, month);
		return yearMonth.lengthOfMonth();
	}

}
