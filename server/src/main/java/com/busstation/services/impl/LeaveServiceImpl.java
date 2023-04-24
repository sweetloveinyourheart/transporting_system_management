package com.busstation.services.impl;

import com.busstation.entities.Account;
import com.busstation.entities.Leave;
import com.busstation.entities.User;
import com.busstation.exception.DataNotFoundException;
import com.busstation.payload.request.ApproveLeaveRequest;
import com.busstation.payload.request.LeaveRequest;
import com.busstation.payload.response.LeaveResponse;
import com.busstation.repositories.AccountRepository;
import com.busstation.repositories.LeaveRepository;
import com.busstation.repositories.UserRepository;
import com.busstation.services.LeaveService;
import com.busstation.utils.GetUserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class LeaveServiceImpl implements LeaveService {


    @Autowired
    private LeaveRepository leaveRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AccountRepository accountRepository;



//    @Override
//    public LeaveResponse updatedLeave(String leaveId, LeaveRequest request) {
//        Leave updateLeave = leaveRepository.findById(leaveId).orElseThrow(() -> new RuntimeException("Leave does not exist"));
//        updateLeave.setDateStart(request.getDateStart());
//        updateLeave.setDateEnd(request.getDateEnd());
//        updateLeave.setReason(request.getReason());
//        leaveRepository.save(updateLeave);
//
//        return getLeaveResponse(updateLeave);
//    }

    @Override
    public Page<LeaveResponse> showAllLeave(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("createAt").ascending());

        Page<Leave> leaves = leaveRepository.findAll(pageable);

        return leaves.map(LeaveResponse::new);
    }

    @Override
    public Page<LeaveResponse> showAllLeaveActive(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("createAt").ascending());

        Page<Leave> leaves = leaveRepository.findAllLeaves(pageable);

        return leaves.map(LeaveResponse::new);
    }

    @Override
    public LeaveResponse addLeave(LeaveRequest request) {
        Account account = accountRepository.findByusername(new GetUserUtil().GetUserName());

        User user = userRepository.findById(account.getUser().getUserId())
                .orElseThrow(()->new DataNotFoundException("User does not exist"));
        Leave leave = new Leave();
        leave.setUser(user);
        leave.setDateStart(request.getDateStart());
        leave.setDateEnd(request.getDateEnd());
        leave.setReason(request.getReason());
        leaveRepository.save(leave);

        Leave newLeave = leaveRepository.save(leave);
        return getLeaveResponse(newLeave);
    }

    @Override
    public Leave updateLeaveStatus(String leaveId, ApproveLeaveRequest request) {
        Leave leave = leaveRepository.findById(leaveId).orElseThrow(() -> new DataNotFoundException("Leave does not found"));
        leave.setApproved(request.isApprove());
        return leaveRepository.save(leave);
    }
    @Override
    public Boolean deleteLeave(String leaveId) {
        Leave leave = leaveRepository.findById(leaveId).orElseThrow(()-> new RuntimeException("This id does not exist"));
        leaveRepository.delete(leave);
        return true;
    }

    @Override
    public Page<LeaveResponse> findByUserId(String userId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("createAt").descending());

        Page<Leave> leaves = leaveRepository.findAllByUser_UserId(userId, pageable);
        return leaves.map(LeaveResponse::new);
    }


    @Override
    public LeaveResponse getLeaveResponse(Leave newLeave) {
        LeaveResponse leaveResponse = new LeaveResponse();
        leaveResponse.setLeaveId(newLeave.getLeaveId());
        leaveResponse.setDateStart(newLeave.getDateStart());
        leaveResponse.setDateEnd(newLeave.getDateEnd());
        leaveResponse.setReason(newLeave.getReason());
        leaveResponse.setUserId(newLeave.getUser().getUserId());
        leaveResponse.setCreatedAt(newLeave.getCreateAt());
        leaveResponse.setApproved(newLeave.isApproved());

        return leaveResponse;
    }




}
