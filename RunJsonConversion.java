package com.uhg.mr.report;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

public class RunJsonConversion {

	public static final int STORY_ID_IDX = 4;
	public static final int STATGE_STATUS_IDX = 14;
	public static final int TESTA_STATUS_IDX = 13;
	public static final int LOCAL_STATUS_IDX = 12;

	List<String> list = new ArrayList<String>();
	Map<String, String> statusMapStage = new HashMap<String, String>();
	Map<String, String> statusMapTesta = new HashMap<String, String>();
	Map<String, String> statusMapLocal = new HashMap<String, String>();
	List<String> updatedRecords = new ArrayList<String>();
	List<String> updatedRecords2 = new ArrayList<String>();
	List<String> updatedRecords3 = new ArrayList<String>();

	public static void main(String[] args) {

		RunJsonConversion runJsonConversion = new RunJsonConversion();
		
		 //run from servlet , so comment out;
				
		//runJsonConversion.getDataByJson("C:\\Work\\mr\\conversion\\src\\json\\cmStg.json","stage");
		//runJsonConversion.getDataByJson("C:\\Work\\mr\\conversion\\src\\json\\cmTest.json","testa");
		//runJsonConversion.getDataByJson("C:\\Work\\mr\\conversion\\src\\json\\cmLocal.json","local");
		//runJsonConversion.getRallyData("C:\\Work\\mr\\conversion\\src\\json\\test.csv");
		runJsonConversion.getDataByJson("C:\\Work\\testData\\cmStg.json","stage");
		runJsonConversion.getDataByJson("C:\\Work\\testData\\cmTest.json","testa");
		runJsonConversion.getDataByJson("C:\\Work\\testData\\cmLocal.json","local");
		runJsonConversion.getRallyData("C:\\Work\\testData\\test.csv");
	}
	
	public void runProcess(){
		RunJsonConversion runJsonConversion = new RunJsonConversion();
		runJsonConversion.getDataByJson("C:\\Work\\mr\\conversion\\src\\json\\codeMonkey.json","stage");
		runJsonConversion.getDataByJson("C:\\Work\\mr\\conversion\\src\\json\\codeMonkey_testa.json","testa");
		runJsonConversion.getDataByJson("C:\\Work\\mr\\conversion\\src\\json\\codeMonkey_local.json","local");
		runJsonConversion.getRallyData("C:\\Work\\mr\\conversion\\src\\json\\test.csv");
	}

	private String updateRecord(String[] items, String status, String environment) {

		String updatedRecord = "";
		for (int i = 0; i < items.length; i++) {
			if (i == 0)
				updatedRecord += items[i];
			else if ((i == STATGE_STATUS_IDX) &&("stage".equalsIgnoreCase(environment)))
				updatedRecord += "," + status;
			else if ((i == TESTA_STATUS_IDX) &&("testa".equalsIgnoreCase(environment)))
				updatedRecord += "," + status;
			else if ((i == LOCAL_STATUS_IDX)&&("local".equalsIgnoreCase(environment)))
				updatedRecord += "," + status;
			else
				updatedRecord += "," + items[i];
				
		}

		return updatedRecord;
	}

	private void getRecordStatus(String storyId) {

		// Get status and update JSON file
		// statusMap.forEach((k, v) -> {
		// System.out.println("sotryId:" + k + "|status:" + v);
		// });

	}

	public StringBuilder getRallyData(String path) {
		
		StringBuilder rallyCsv =null;
		
		File input = new File(path);
		try {
			Scanner inputStream = new Scanner(input);
			inputStream.hasNext();
			boolean firstLineStg = false;
			boolean firstLineTesta = false;
			boolean firstLineLocal = false;
			while (inputStream.hasNext()) {
				
					String record = inputStream.nextLine();
					//System.out.println("line=" + record);
					if(!firstLineStg){
						firstLineStg = true;
						updatedRecords.add(record);
					}
					else{
					// Get soryId from line
					String[] items = record.split(",");
					//System.out.println("storyId=" + items[STORY_ID_IDX]);
	
					// Match storyId with Status and then update record
					String status = "N/A";
					String storyId = items[STORY_ID_IDX];
						if (statusMapStage.containsKey(storyId)) {
							status = statusMapStage.get(storyId);
		
							//System.out.println("status=" + status);
							String updatedRecord = updateRecord(items, status,"stage");
		
							// Write updated records List
							updatedRecords.add(updatedRecord);
						} else
						{
							String updatedRecordNAStg = updateRecord(items, status,"stage");
							updatedRecords.add(updatedRecordNAStg);
						}
				}
			}
				inputStream.close();
			
			 for (String line : updatedRecords) {
				
				String[] itemsTesta = line.split(",");
				if(!firstLineTesta){
					firstLineTesta = true;
					updatedRecords2.add(line);
				}
				else{
				String statusTesta = "N/A";
				String storyIdTesta = itemsTesta[STORY_ID_IDX];
					if (statusMapTesta.containsKey(storyIdTesta)) {
						statusTesta = statusMapStage.get(storyIdTesta);
	
						//System.out.println("status=" + status);
						String updatedRecord2 = updateRecord(itemsTesta, statusTesta,"testa");
						
						// Write updated records List
						updatedRecords2.add(updatedRecord2);
						//System.out.println("updatedRecord2:" + updatedRecord2);
					} else
					{
						String updatedRecordNATest = updateRecord(itemsTesta, statusTesta,"testa");
						updatedRecords2.add(updatedRecordNATest);
					//output.append(line);
					}
				}
			}
			
			for (String line : updatedRecords2) {
				
				String[] itemsLocal = line.split(",");
				if(!firstLineLocal){
					firstLineLocal = true;
					updatedRecords3.add(line);
				}
				else{
				String statusLocal = "N/A";
				String storyIdLocal = itemsLocal[STORY_ID_IDX];
					if (statusMapTesta.containsKey(storyIdLocal)) {
						statusLocal = statusMapStage.get(storyIdLocal);
	
						//System.out.println("status=" + status);
						String updatedRecord3 = updateRecord(itemsLocal, statusLocal,"local");
						
						// Write updated records List
						updatedRecords3.add(updatedRecord3);
						//System.out.println("updatedRecord2:" + updatedRecord3);
					} else
					{
						String updatedRecordNALocal = updateRecord(itemsLocal, statusLocal,"local");
						updatedRecords3.add(updatedRecordNALocal);
					//output.append(line);
					}
				}
			}

			// ObjectMapper mapper = new ObjectMapper();
			// mapper.enable(SerializationFeature.INDENT_OUTPUT);

			// Write JSON formated data to output.json file
			// mapper.writerWithDefaultPrettyPrinter().writeValue(output, line);

			// Write JSON formated data to stdout
			// System.out.println(mapper.writerWithDefaultPrettyPrinter().writeValueAsString(line));
			rallyCsv= writeCSVFile();
			

		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return rallyCsv;
	}

	private StringBuilder writeCSVFile() {
		byte[] strBytes = null;
		StringBuilder output = new StringBuilder();
		try {
			// Write output to a csv file
			Path pathCsv = Paths.get("C:\\Work\\mr\\conversion\\src\\json\\report.csv");
			Files.delete(pathCsv);

			
			boolean firstLine = false;

			for (String line : updatedRecords3) {
				String storyId = "";
				if (!firstLine) {
					firstLine = true;
				} else
					output.append("\n");
				//System.out.println("line before csv:"+line);
				output.append(line);
				
			}

			strBytes = output.toString().getBytes();
			Files.write(pathCsv, strBytes);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("output before csv:"+output);
		return output;
	}

	public void getDataByJson(String path, String environment) {
		
		String pathProvider = path;
		
		System.out.println("path 2: " + path);
		System.out.println("path 2 pathProvider: " + pathProvider);
		getData(pathProvider, environment);
		//System.out.println("statusMapSatge=" + statusMapStage);
		// getData(pathPharmacy);
		// list.addAll(listJson);

		/*
		 * try { // Write output to a csv file Path pathCsv =
		 * Paths.get("C:\\Work\\mr\\conversion\\test1.csv");
		 * Files.delete(pathCsv);
		 * 
		 * StringBuilder output = new StringBuilder(); boolean firstLine =
		 * false;
		 * 
		 * 
		 * for (String line : list) { String storyId = ""; if (!firstLine) {
		 * firstLine = true; } else output.append("\n");
		 * 
		 * output.append(line); }
		 * 
		 * byte[] strBytes = output.toString().getBytes(); Files.write(pathCsv,
		 * strBytes); } catch (FileNotFoundException e) { e.printStackTrace(); }
		 * catch (IOException e) { e.printStackTrace(); } catch (Exception e) {
		 * e.printStackTrace(); }
		 */

	}

	public void getData(String path, String environment) {
		// TODO Auto-generated method stub

		JSONParser parser = new JSONParser();
		int index;
		FileInputStream fileInputStream = null;
		String data = "";
		StringBuffer stringBuffer = new StringBuffer("");
		try {
			System.out.println("path: "+ path);
			fileInputStream = new FileInputStream(path);
			
			while ((index = fileInputStream.read()) != -1) {
				stringBuffer.append((char) index);
			}
			data = stringBuffer.toString();

			// loop arraygot
			JSONArray jArray = (JSONArray) parser.parse(data);

			boolean storyStatus = true;
			String storyId = null;
			int f = 0;

			for (int i = 0; i < jArray.size(); i++) {

				JSONObject jObject = (JSONObject) jArray.get(i);
				// System.out.println("jObject=" + jObject);
				JSONArray jArrayElement = (JSONArray) jObject.get("elements");
				// System.out.println("jArrayElement=" + jArrayElement);

				for (int j = 0; j < jArrayElement.size(); j++) {
					JSONObject jObjectElem = (JSONObject) jArrayElement.get(j);
					//System.out.println("jObject2=" + jObjectElem);
					JSONArray jArraySteps = (JSONArray) jObjectElem.get("steps");
					//System.out.println("jArraySteps=" + jArraySteps);

					JSONArray jArrayTags = (JSONArray) jObject.get("tags");
					// System.out.println("jArrayTags=" + jArrayTags);

					if (jArraySteps != null) {
						for (int k = 0; k < jArraySteps.size(); k++) {

							JSONObject jObjectSteps = (JSONObject) jArraySteps.get(k);
							JSONObject jObjectResult = (JSONObject) jObjectSteps.get("result");
							String status = (String) jObjectResult.get("status");
							// System.out.println("status=" + status);

							if ("failed".equals(status))
								f++;
							// storyStatus = false;

						}
					}

					if (jArrayTags != null) {
						for (int l = 0; l < jArrayTags.size(); l++) {
							JSONObject jObjectTags = (JSONObject) jArrayTags.get(l);
							String id = (String) jObjectTags.get("name");
							if (id != null && id.startsWith("@US")) {
								// System.out.println("id=" + id);
								id = id.replace("@", "");
								storyId = id;
							}
						}
					}
					if (f == 3) {
						storyStatus = false;
						f = 0;
					}

				}
				if("stage".equals(environment)){
					if (storyStatus)
						statusMapStage.put(storyId, "Yes");
					else
						statusMapStage.put(storyId, "No");
				}
				else if("testa".equals(environment)){
					if (storyStatus)
						statusMapTesta.put(storyId, "Yes");
					else
						statusMapTesta.put(storyId, "No");
				}
				else if("local".equals(environment)){
					if (storyStatus)
						statusMapLocal.put(storyId, "Yes");
					else
						statusMapLocal.put(storyId, "No");
				}
				// System.out.println(output);
			}

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
