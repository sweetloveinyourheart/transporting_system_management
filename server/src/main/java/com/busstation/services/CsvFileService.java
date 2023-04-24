package com.busstation.services;

import java.io.BufferedReader;
import java.io.Writer;

public interface CsvFileService {

	public void exportUsesToCsv(Writer writer);

	public void importUserstoCsvFile(BufferedReader reader);

}