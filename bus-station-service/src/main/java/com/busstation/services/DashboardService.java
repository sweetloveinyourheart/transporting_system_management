package com.busstation.services;

import com.busstation.payload.request.DashboardByDateRequest;
import com.busstation.payload.request.DashboardRequest;
import com.busstation.payload.response.dashboard.YearlyRevenueResponse;

import java.util.Map;

public interface DashboardService {

	YearlyRevenueResponse getRevenueDataForYear(int year);

	Map<String, Object> statistic(DashboardRequest dashboardRequest);

	Map<String, Object> statistics(DashboardByDateRequest dashboardByDateRequest);
}
