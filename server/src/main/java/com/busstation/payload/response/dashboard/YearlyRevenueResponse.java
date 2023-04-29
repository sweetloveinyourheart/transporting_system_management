package com.busstation.payload.response.dashboard;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class YearlyRevenueResponse {

	private List<Integer> revenue;
	private List<Integer> order;
	private final int[] month = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 };
	private int totalOrder;
	private Integer totalRevenue;

}
