package com.busstation.services.impl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Writer;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.busstation.entities.Account;
import com.busstation.entities.Role;
import com.busstation.entities.User;
import com.busstation.exception.DataExistException;
import com.busstation.repositories.AccountRepository;
import com.busstation.repositories.RoleRepository;
import com.busstation.repositories.UserRepository;
import com.busstation.services.CsvFileService;

@Service
public class CsvFileServiceImpl implements CsvFileService {

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Override
	public void exportUsesToCsv(Writer writer) {
		String[] HEADERS = { "full_name", "username", "password", "role_name", "phone_number", "email", "address",
				"status" };
		CSVFormat csvFormat = CSVFormat.DEFAULT.builder().setHeader(HEADERS).build();

		List<User> users = userRepository.findAll();

		try (final CSVPrinter printer = new CSVPrinter(writer, csvFormat)) {
			for (User user : users) {
				printer.printRecord(user.getFullName(), user.getAccount().getUsername(),
						user.getAccount().getPassword(), user.getAccount().getRole().getName(), user.getPhoneNumber(),
						user.getEmail(), user.getAddress(), user.getStatus());
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void importUserstoCsvFile(BufferedReader reader) {
		String[] HEADERS = { "full_name", "username", "password", "role_name", "phone_number", "email", "address",
				"status" };
		CSVFormat csvFormat = CSVFormat.DEFAULT.builder().setHeader(HEADERS).build();

		try (final CSVParser parser = new CSVParser(reader, csvFormat)) {
			for (CSVRecord record : parser) {
				if (record.getRecordNumber() == 1) {
					continue;
				}
				String fullName = record.get("full_name");
				String username = record.get("username");
				String password = record.get("password");
				String role_name = record.get("role_name");
				String phoneNumber = record.get("phone_number");
				String email = record.get("email");
				String address = record.get("address");
				String stt = record.get("status");
				boolean status = Boolean.parseBoolean(stt);

				if (accountRepository.existsByusername(username)) {
					throw new DataExistException("This user with username: " + username + " already exist");
				} else {
					Account account = new Account();
					account.setUsername(username);
					account.setPassword(password);
					Role role = roleRepository.findByName(role_name);
					if (role == null) {
						throw new DataExistException("This role with name: " + role_name + " not valid.");
					} else {
						account.setRole(role);
						accountRepository.save(account);
						User user = new User();
						user.setAccount(accountRepository.findById(account.getAccountId()).get());
						user.setFullName(fullName);
						user.setPhoneNumber(phoneNumber);
						user.setEmail(email);
						user.setAddress(address);
						user.setStatus(status);
						userRepository.save(user);
					}

				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

}