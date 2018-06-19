/**
 * 
 */
package pages.acquisition.bluelayer;

import java.util.List;

import junit.framework.Assert;
import pages.acquisition.ulayer.PageTitleConstants;

import org.json.JSONException;
import org.json.JSONObject;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.FindBys;
import org.openqa.selenium.support.PageFactory;

import acceptancetests.data.CommonConstants;
import acceptancetests.data.ElementData;
import acceptancetests.data.PageData;
import acceptancetests.util.CommonUtility;
import atdd.framework.MRScenario;
import atdd.framework.UhcDriver;

/**
 * @author pagarwa5
 *
 */
public class PharmacySearchPage extends UhcDriver {

	@FindBy(id = "zipcodeTxt")
	private WebElement zipcodeField;

	
	@FindBy(id = "zipcode-button")
	private WebElement zipcodeSearchButton;

	@FindBy(id = "selectcounty_box")
	private WebElement countyPopOut;

	@FindBys(value = { @FindBy(xpath = "//select[@id='plan-type']/option") })
	private List<WebElement> planNamesList;
	
	@FindBys(value = { @FindBy(xpath = "//select[@id='lang-select']/option") })
	private List<WebElement> langList;

	//@FindBys(value = { @FindBy(xpath = "//table[@id='selectcountytable']/tbody/tr") })
	//private List<WebElement> countyList;
	
	@FindBys(value = { @FindBy(xpath = "//div[@id='selectCounty']/p") })
	private List<WebElement> countyList;
	

	@FindBy(id = "services")
	private WebElement particularServices;

	@FindBy(id = "find_searchbtn")
	private WebElement searchPharmaciesButton;

	@FindBys(value = { @FindBy(xpath = "//select[@id='distance']/option") })
	private List<WebElement> distanceDropDown;

	@FindBys(value = { @FindBy(xpath = "//ul[@id='pharm_services']/li") })
	private List<WebElement> pharmacyTypesCheckboxes;


	//@FindBy(xpath = "//div[@id='medicareTitle']/h1")
	@FindBy(xpath = "//*[@id='site-wrapper']/div[4]/div/div/div/div/div/main/div/div[3]/div/div[1]/div/div[1]/div/div/div[1]/h2")
	private WebElement pharmacyResultHeader;
	
	@FindBy(id = "services")
	private WebElement pharmacyTypeSelectionRadioButton;

	@FindBy(xpath = "//div[@class='pharmacyListScroll']")
	private WebElement pharmacyTable;
	
	@FindBys(value = { @FindBy(xpath = "//select[@class='pharmacyDropDown']/option") })
	private List<WebElement> pharmacyDropDowmElements;

	@FindBys(value = { @FindBy(xpath = "//select[@class='milesDropDown']/option") })
	private List<WebElement> milesDropDownElements;
	
	@FindBy(xpath = "//select[@id='plan-type']")
	private WebElement seletPlandropdown;

	@FindBy(id = "pharmacy-preffered")
	private WebElement preferredPharmacy;

	@FindBy(id = "pharmacy-standard")
	private WebElement standardPharmacy;
	
	
	@FindBy(className = "dceBlueBtn")
	WebElement selectLink;

	@FindBy(className = "rowBorder")
	List<WebElement> pharmacyRows;
	
	@FindBy(xpath = "//div[contains(@class,'callus')]")
	WebElement customercare;

	@FindBy(className = "errorHeader")
	WebElement errorHeader;
	
	@FindBy(className = "errorPoints")
	WebElement errorPoints;
	
	//@FindBy(xpath = "//div/h2[contains(@class, 'pharmacy-count')]")
	@FindBy(xpath = "//*[contains(@class, 'pharmacy-count')]")
	private WebElement pharmacyCount;

	@FindBy(xpath = "//div[@class='pharmacy-search-resultParsys']/div/div/div[1]/div/div[2]")
	WebElement pharmacyResults;

	@FindBy(xpath = "//div[@class='pharmacy-search-resultParsys']/div/div/div[1]/div/div[1]")
	WebElement zeropharmacyResults;

	//@FindBy(xpath = "//div[@class='pharmacy-search-resultParsys']/div/div/div[1]/div/div[2]/div/ul[@class='map-toggle']")
	@FindBy(xpath = "//*[@class='map-toggle']")
	WebElement mapToggleElement;

	@FindBy(id="collapseMap")
	//@FindBy(xpath = "//div[@class='pharmacy-search-resultParsys']/div/div/div[1]/div/div[2]/div/div[@class='collapse-wrapper']/div")
	WebElement mapView;

	//@FindBy(xpath = "//div[@class='pharmacy-search-resultParsys']//ol[@class='pharmacy-list']")
	@FindBy(xpath = "//*[@class='pharmacy-list']")
	WebElement pharmacyList;

	//@FindBy(xpath = "//div[@class='pharmacy-search-resultParsys']//ol[@class='pharmacy-list']/li")
	@FindBy(xpath = "//*[@class='pharmacy-list']/li")
	List<WebElement> pharmacyListItems;
	
	@FindBys(value = { @FindBy(xpath = "//ul[1][@class='filter-list']/li/label") })
	private List<WebElement> pharmacyTypesandServices;
	
	public JSONObject availablePharmaciesJson;
	
	public JSONObject locatePharmacyJson;
	
	private PageData locatePharmacy;
	
	public PageData pharmacyInfo;
	
	public PharmacySearchPage(WebDriver driver) {
		super(driver);
		PageFactory.initElements(driver, this);

		String fileName = CommonConstants.LOCATE_PHARMACIES_PAGE_DATA;
		locatePharmacy = CommonUtility.readPageData(fileName,
				CommonConstants.PAGE_OBJECT_DIRECTORY_BLUELAYER_ACQ);
		
		//String pharmacyInfoFileName = CommonConstants.PHARMACY_INFORMATION_PAGE_DATA;
		//pharmacyInfo = CommonUtility.readPageData(pharmacyInfoFileName,
				//CommonConstants.PAGE_OBJECT_DIRECTORY_BLUELAYER_ACQ);

		openAndValidate();
	}

	public PharmacySearchPage enterZipDistanceDetails(String zipcode,
			String distance, String county) {

		
		selectFromDropDown(distanceDropDown, distance);

		sendkeys(zipcodeField, zipcode);
		
		zipcodeSearchButton.click();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		CommonUtility.checkPageIsReady(driver);
		try{
		if (countyPopOut.isDisplayed()) {
			for (WebElement webElement : countyList) {
				try {
					Thread.sleep(2000);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				if (webElement.getText().contains(county)) {
					try {
						Thread.sleep(2000);
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					WebElement countylink = driver.findElement(By.linkText(webElement.getText()));

					countylink.click();
					break;
				}
			}
		}
		}catch(Exception e ){
			System.out.println("County not exists");
		}
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(driver.getTitle());
		if (driver.getTitle().equalsIgnoreCase(
				PageTitleConstants.BLAYER_LOCATE_A_PHARMACY_UNITEDHEALTHCARE)) {
			return new PharmacySearchPage(driver);
		}
		if (driver.getTitle().equalsIgnoreCase(
				PageTitleConstants.BLAYER_FIND_A_PHARMACY_AARP_MEDICARE_PLANS_FROM_UNITEDHEALTHCARE)) {
			return new PharmacySearchPage(driver);
		}
		return null;
	}

	public PharmacySearchPage selectsPlanName(String planName) {
		selectFromDropDown(planNamesList, planName);
		for(int i=0;i<10;i++){
			try {
				Thread.sleep(5000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
		if (driver.getTitle().equalsIgnoreCase(
				PageTitleConstants.BLAYER_LOCATE_A_PHARMACY_UNITEDHEALTHCARE)) {
			return new PharmacySearchPage(driver);
		}
		return null;
	}

	public PharmacyResultPage searchesPharmacy() {

		searchPharmaciesButton.click();
		CommonUtility.checkPageIsReady(driver);

		if (pharmacyResultHeader.getText().equalsIgnoreCase(
				"Pharmacies Available in Your Area")) {
			return new PharmacyResultPage(driver);
		}
		return null;

	}



	public PharmacyResultPage showAllPharmacies() {
		//allPharmacies.click();
		//searchPharmaciesButton.click();
		for(int i=0;i<10;i++){
			try {
				Thread.sleep(5000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if(pharmacyResultHeader.isDisplayed())
			{
				return new PharmacyResultPage(driver);
			}
				//break;			
		}
		/*if (pharmacyResultHeader.getText().equalsIgnoreCase(
				"Pharmacies Available in Your Area")) {
			return new PharmacyResultPage(driver);
		}*/
		return null;
	}

	public PharmacySearchPage showParticularService() {
		particularServices.click();
		return new PharmacySearchPage(driver);

	}
	
	
public PharmacySearchPage selectPharmacyandServices(String pharmacytype) {
		
		
		
		for (WebElement webElement : pharmacyTypesandServices) {
			try {
				Thread.sleep(2000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if (webElement.getText().contains(pharmacytype)) {
				try {
					Thread.sleep(4000);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				 //driver.findElement(By.linkText(webElement.getText())).click();;
				System.out.println(webElement.getText());
				waitforElement(webElement);
				 webElement.click();
				break;
			}
		}
	
			return new PharmacySearchPage(driver);
  
	}
	
	

	public PharmacyResultPage searchSelectingPharmacyTypes(
			String[] pharmacyTypeArray) {

		//pharmacyTypeSelectionRadioButton.click();
		/*for (String pharmacyType : pharmacyTypeArray) {
			for (WebElement checkBox : pharmacyTypesCheckboxes) {
				if (checkBox.getText().equalsIgnoreCase(pharmacyType)) {
					ElementData elementData = new ElementData("id",
							"pharmacyTypesCheckboxes");
					findChildElement(elementData, checkBox).click();
				}
				
			}
		}*/
		//searchPharmaciesButton.click();
		/*for(int i=0;i<10;i++){
			try {
				Thread.sleep(10000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			if(pharmacyResultHeader.isDisplayed())
				break;
			
		}
		if (pharmacyResultHeader.getText().equalsIgnoreCase(
				"Pharmacies Available in Your Area")) {
			return new PharmacyResultPage(driver);
		}*/
		//if(pharmacyResultHeader.isDisplayed())
		//{
			return new PharmacyResultPage(driver);
		//}
		//return null;
	}
	
		public AddDrugPage selectPharmacy(String pharmacyName) {
			for (WebElement element : pharmacyRows) {
				if (element.getText().contains(pharmacyName)) {
					ElementData elementData = new ElementData("className",
							"dceBlueBtn");
					WebElement selectLink = findChildElement(elementData, element);
					selectLink.click();
					break;
				}

			}
			try {
				if (pharmacyTable.isDisplayed()) {
					CommonUtility.waitForElementToDisappear(driver, pharmacyTable,
							CommonConstants.TIMEOUT_30);
				}
			} catch (NoSuchElementException e) {
				System.out.println("pharmacyTable not found");
			} catch (TimeoutException ex) {
				System.out.println("pharmacyTable not found");
			} catch (Exception e) {
				System.out.println("pharmacyTable not found");
			}
			if (currentUrl().contains("manageDrugList")) {
				return new AddDrugPage(driver);
			} else {
				return null;
			}
		}

		public PharmacySearchPage searchPharmacies(String pharmacyType,
				String distance) {
			try {
				Thread.sleep(5000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			/*ElementData pharmacyTypeElement = new ElementData("select:className",
					"pharmacyDropDown");
			List<WebElement> pharmacyTypeOptions = findElements(pharmacyTypeElement);
	*/
			for (WebElement pharmacyTypeOption : pharmacyDropDowmElements) {
				if (pharmacyTypeOption.getText().equalsIgnoreCase(pharmacyType)) {
					pharmacyTypeOption.click();
				}
			}
	/*
			ElementData distanceElement = new ElementData("select:className",
					"milesDropDown");
			List<WebElement> distanceOptions = findElements(distanceElement);*/

			for (WebElement distanceOption : milesDropDownElements) {
				if (distanceOption.getText().equalsIgnoreCase(distance)) {
					distanceOption.click();
				}
			}
			return new PharmacySearchPage(driver);
		}
	
	@SuppressWarnings("deprecation")
	@Override
	public void openAndValidate() {

		
		JSONObject jsonObject = new JSONObject();
		for (String key : locatePharmacy.getExpectedData().keySet()) {
			List<WebElement> elements = findElements(locatePharmacy
					.getExpectedData().get(key));
			if (elements.size() == 1) {
				if (elements.get(0) != null) {
					if (validate(elements.get(0))) {
						try {
							jsonObject.put(key, elements.get(0).getText());
						} catch (JSONException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}
			}else if(elements.size() > 1){
				if (elements.get(0) != null) {
					if (validate(elements.get(0))) {
						try {
							jsonObject.put(key, elements.get(0).getText());
						} catch (JSONException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}
			}
		}
		locatePharmacyJson = jsonObject;
		System.out.println("locatePharmacyJson----->"
				+ locatePharmacyJson);
		
		validate(customercare);
		
	}
	
	@SuppressWarnings("deprecation")
	public void validateDefaultChooseaPlanSection(){
		int[] expectedDropdownmiles ={1,2,5,10,15,25};
		for(int i=0;(i<distanceDropDown.size());i++){
			System.out.println(distanceDropDown.get(i).getText());
			Assert.assertTrue("Expected dropdown miles is not available",Integer.parseInt(distanceDropDown.get(i).getText().split(" ")[0])==expectedDropdownmiles[i]);
		}

		Assert.assertTrue("Select Plan drop down is not disabled", !seletPlandropdown.isEnabled());
		Assert.assertTrue("Preferred Pharmacy is selected by default",!preferredPharmacy.isSelected());
		Assert.assertTrue("Standard Pharmacy is selected by default",!standardPharmacy.isSelected());

		/*for(int i = 0; i<pharmaciesList.size();i++){
			Assert.assertTrue("Pharmacies List not displayed", pharmaciesList.get(i).isDisplayed());
			Assert.assertTrue("Check box for "+ pharmaciesList.get(i).getText()+" is not disabled",pharmaciesListCheckbox.get(i).getAttribute("disabled").equals("true"));
		}*/
	}
	
	@SuppressWarnings("deprecation")
	public void validateChoosePlanSectionAfterzipcodeSearch(){
		Assert.assertTrue("Select Plan drop down is not enabled", seletPlandropdown.isEnabled());
		Assert.assertTrue("Preferred Pharmacy is selected by default",!preferredPharmacy.isSelected());
		Assert.assertTrue("Standard Pharmacy is selected by default",!standardPharmacy.isSelected());

		/*for(int i = 0; i<pharmaciesList.size();i++){
			Assert.assertTrue("Pharmacies List not displayed", pharmaciesList.get(i).isDisplayed());
			Assert.assertTrue("Check box for "+ pharmaciesList.get(i).getText()+" is not disabled",pharmaciesListCheckbox.get(i).getAttribute("disabled").equals("true"));
		}*/
	}
	
	@SuppressWarnings("deprecation")
	public void validateNoPharmacyErrormsg(String[] pharmacyTypeArray){
		pharmacyTypeSelectionRadioButton.click();
		for (String pharmacyType : pharmacyTypeArray) {
			for (WebElement checkBox : pharmacyTypesCheckboxes) {
				if (checkBox.getText().equalsIgnoreCase(pharmacyType)) {
					ElementData elementData = new ElementData("id",
							"pharmacyTypesCheckboxes");
					findChildElement(elementData, checkBox).click();
				}
				
			}
		}
		searchPharmaciesButton.click();
		try {
			Thread.sleep(10000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String expectedErrormsg="There were errors in the information you submitted.\nPlease correct the errors in the following fields:"
				+ "There were no results found for the requested search. Broadening your search criteria may help you get a different result.";
		System.out.println(errorHeader.getText() + errorPoints.getText());
		Assert.assertTrue("Incorrect error message displayed",expectedErrormsg.equals(errorHeader.getText() + errorPoints.getText()));
	}
	
	@SuppressWarnings("deprecation")
	public void validatePharmaciesSectionAfterplanSelection(){
		Assert.assertTrue("Preferred Pharmacy is selected by default",!preferredPharmacy.isSelected());
		Assert.assertTrue("Standard Pharmacy is selected by default",!standardPharmacy.isSelected());
	}

	public JSONObject getExpectedData(String fileName, String directory) {
		JSONObject availablePharmaciesExpectedJson = MRScenario
				.readExpectedJson(fileName, directory);
		return availablePharmaciesExpectedJson;
	}
	
	public String getPharmacyList() {

		return pharmacyTable.getText();
	}
	
	public boolean validatePharmacyResults(){
		try {
			Thread.sleep(10000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		boolean flag = true;
		System.out.println(pharmacyCount.getText());
		if(pharmacyCount.getText().split(" ")[0].equals("") || Integer.parseInt(pharmacyCount.getText().split(" ")[0])==0)
			flag =  false;

		if(pharmacyResults.getAttribute("class").toString().contains("ng-hide"))
			flag = false;
		else{
			if(!mapToggleElement.isDisplayed())
				flag = false;
			if(!pharmacyList.isDisplayed())
				flag = false;
			if(mapView.getAttribute("class").contains("ng-hide"))
				flag = false;
			if(!(pharmacyListItems.size()>1))
				flag = false;
		}
		return flag;
	}
	
	public PharmacySearchPage selectLanguage(String langName) {
		selectFromDropDown(langList, langName);

		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		if (driver.getTitle().equalsIgnoreCase(
				PageTitleConstants.BLAYER_LOCATE_A_PHARMACY_UNITEDHEALTHCARE)) {
			return new PharmacySearchPage(driver);
		}
		return null;
	}
	public boolean validateCountypopoup(){
		boolean flag = false;

		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		CommonUtility.checkPageIsReady(driver);

		if (countyPopOut.isDisplayed()) 
			flag=true;

		return flag;
	}
	
	public void selectCounty(String county){
		try {
			if (countyPopOut.isDisplayed()) {
				for (WebElement webElement : countyList) {
					try {
						Thread.sleep(2000);
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					if (webElement.getText().contains(county)) {
						try {
							Thread.sleep(2000);
						} catch (InterruptedException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						WebElement countylink = driver.findElement(By.linkText(webElement.getText()));

						countylink.click();
						break;
					}
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
	}



}
