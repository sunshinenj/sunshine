package acceptancetests.vbfacquisition.pharmacylocator;

import gherkin.formatter.model.DataTableRow;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.junit.Assert;
import org.openqa.selenium.WebDriver;
import org.springframework.beans.factory.annotation.Autowired;

import pages.acquisition.bluelayer.AcquisitionHomePage;
import pages.acquisition.bluelayer.PharmacyResultPage;
import pages.acquisition.bluelayer.PharmacySearchPage;
import acceptancetests.data.CommonConstants;
import acceptancetests.data.PageConstants;
import atdd.framework.MRScenario;
import cucumber.api.DataTable;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;


/**
 * Functionality: PharmacyLocator
 */

public class PharmacyLocatorStepDefinitionUHC {

	@Autowired
	MRScenario loginScenario;

	public MRScenario getLoginScenario() {
		return loginScenario;
	}

	/**
	 * @toDo:user is on the UMS Medicare Site landing page
	 */
	@Given("^the user is on the UMS Medicare Site landing page$")
	public void registered_member_located_pharmacy_UMS() {
		WebDriver wd = getLoginScenario().getWebDriver();
		getLoginScenario().saveBean(CommonConstants.WEBDRIVER, wd);

		AcquisitionHomePage acqusitionHomePage = new AcquisitionHomePage(wd);

		if (acqusitionHomePage != null) {
			getLoginScenario().saveBean(PageConstants.ACQUISITION_HOME_PAGE,
					acqusitionHomePage);
			Assert.assertTrue(true);
		}
	}

	/**
	 * @toDo:user hovers to Our Plans and select Request More Help and Information for following plan type
	 */
	@When("^the user hovers to Our Plans and select Request More Help and Information for following plan type$")
	public void user_hovers_to_our_plans_and_select_request_more_help_and_information(DataTable planAttributes){

		String planType = planAttributes.getGherkinRows().get(0).getCells()
				.get(0);
		getLoginScenario().saveBean(PharmacySearchCommonConstants.PLAN_TYPE, planType);
		AcquisitionHomePage acqusitionHomePage = (AcquisitionHomePage) getLoginScenario()
				.getBean(PageConstants.ACQUISITION_HOME_PAGE);
		acqusitionHomePage.navigateToRequestMoreHelpAndInformation(planType);
	}

	/**
	 * @toDo:user navigates to pharmacy search page in UMS Site
	 */
	@When("^the user navigates to pharmacy search page in UMS Site$")
	public void user_views_pharmacy_locator_UMS() {
		AcquisitionHomePage acqusitionHomePage = (AcquisitionHomePage) getLoginScenario()
				.getBean(PageConstants.ACQUISITION_HOME_PAGE);
		String planType = (String) getLoginScenario().getBean(PharmacySearchCommonConstants.PLAN_TYPE);
		PharmacySearchPage pharmacySearchPage = acqusitionHomePage
				.navigateToPharmacyLocator(planType);

		if (pharmacySearchPage != null) {
			getLoginScenario().saveBean(PageConstants.PHARMACY_SEARCH_PAGE,
					pharmacySearchPage);
			Assert.assertTrue(true);
			pharmacySearchPage.validateDefaultChooseaPlanSection();
		} else {
			Assert.fail("Failed to load Pharmacy search page");
		}

	}

	/**
	 * @toDo: user enters following details for pharmacy search
	 */
	@And("^the user enters following details for pharmacy search in UMS Site$")
	public void user_enters_zipcode_distance_details_UMS(DataTable zipAttributes) {
		List<DataTableRow> zipAttributesRow = zipAttributes.getGherkinRows();
		Map<String, String> zipAttributesMap = new LinkedHashMap<String, String>();
		for (int i = 0; i < zipAttributesRow.size(); i++) {

			zipAttributesMap.put(zipAttributesRow.get(i).getCells().get(0),
					zipAttributesRow.get(i).getCells().get(1));
		}
		String zipcode = zipAttributesMap.get("Zip Code");
		getLoginScenario().saveBean(PharmacySearchCommonConstants.ZIPCODE,
				zipcode);
		String distance = zipAttributesMap.get("Distance");
		getLoginScenario().saveBean(PharmacySearchCommonConstants.DISTANCE,
				distance);
		String county = zipAttributesMap.get("County Name");
		getLoginScenario().saveBean(PharmacySearchCommonConstants.COUNTY,
				county);

		PharmacySearchPage pharmacySearchPage = (PharmacySearchPage) getLoginScenario()
				.getBean(PageConstants.PHARMACY_SEARCH_PAGE);
		pharmacySearchPage = pharmacySearchPage.enterZipDistanceDetails(
				zipcode, distance, county);

		if (pharmacySearchPage != null) {
			getLoginScenario().saveBean(PageConstants.PHARMACY_SEARCH_PAGE,
					pharmacySearchPage);
			Assert.assertTrue(true);
			pharmacySearchPage.validateChoosePlanSectionAfterzipcodeSearch();
		} else {
			Assert.fail("Failed to load Pharmacy search page");
		}
	}

	/**
	 * @toDo:user chooses a plan from dropdown 
	 */
	@And("^the user chooses a plan from dropdown in UMS Site$")
	public void user_chooses_plan_dropdown_UMS(DataTable planAttributes) {

		String planName = planAttributes.getGherkinRows().get(0).getCells()
				.get(0);
		getLoginScenario().saveBean(PharmacySearchCommonConstants.PLAN_NAME, planName);
		PharmacySearchPage pharmacySearchPage = (PharmacySearchPage) getLoginScenario()
				.getBean(PageConstants.PHARMACY_SEARCH_PAGE);
		pharmacySearchPage = pharmacySearchPage.selectsPlanName(planName);

		if (pharmacySearchPage != null) {
			getLoginScenario().saveBean(PageConstants.PHARMACY_SEARCH_PAGE,
					pharmacySearchPage);
			Assert.assertTrue(true);
			pharmacySearchPage.validatePharmaciesSectionAfterplanSelection();
		} else {
			Assert.fail("Failed to load Pharmacy search page");
		}

	}

	/**
	 * @toDo: user chooses the Pharmacy Type
	 */
	@Then("^the user chooses the Pharmacy Type blayer$")
	public void the_user_chooses_the_pharmacy_type_blayer(DataTable pharmacyTypeAttribute){
		
		String PharmacyType = pharmacyTypeAttribute.getGherkinRows().get(0).getCells()
				.get(0);
		PharmacySearchPage pharmacySearchPage = (PharmacySearchPage) getLoginScenario()
				.getBean(PageConstants.PHARMACY_SEARCH_PAGE);
		pharmacySearchPage = pharmacySearchPage.selectPharmacyandServices(PharmacyType);
		
		if (pharmacySearchPage != null) {
			getLoginScenario().saveBean(PageConstants.PHARMACY_SEARCH_PAGE,
					pharmacySearchPage);			 
		} else {
			Assert.fail("Failed to load Pharmacy search page");
		}
		
	}
	
	/**
	 * @toDo: user chooses the Service Type blayer
	 */
	@Then("^the user chooses the Service Type blayer$")
	public void the_user_chooses_the_service_type_blayer(DataTable serviceTypeAttribute){
		
		String serviceType = serviceTypeAttribute.getGherkinRows().get(0).getCells()
				.get(0);
		PharmacySearchPage pharmacySearchPage = (PharmacySearchPage) getLoginScenario()
				.getBean(PageConstants.PHARMACY_SEARCH_PAGE);
		pharmacySearchPage = pharmacySearchPage.selectPharmacyandServices(serviceType);
		
		if (pharmacySearchPage != null) {
			getLoginScenario().saveBean(PageConstants.PHARMACY_SEARCH_PAGE,
					pharmacySearchPage);			 
		} else {
			Assert.fail("Failed to load Pharmacy search page");
		}
		
		
	}
	
	/**
	 * @toDo: user searches available pharmacies by selecting Show pharmacies for ALL types
	 */
	@And("^the user searches available pharmacies by selecting \"Show pharmacies for ALL types\"$")
	public void user_selects_show_pharmacy_for_all_pharmacy_types_ums() {
		PharmacySearchPage pharmacySearchPage = (PharmacySearchPage) getLoginScenario()
				.getBean(PageConstants.PHARMACY_SEARCH_PAGE);
		
		PharmacyResultPage pharmacyResultPage = pharmacySearchPage
				.showAllPharmacies();

		if (pharmacyResultPage != null) {
			getLoginScenario().saveBean(PageConstants.PHARMACY_RESULTS_PAGE,
					pharmacyResultPage);

		
			/* Get actual data */
			JSONObject pharmacyResultActualJson = pharmacyResultPage.pharmacyResultJson;
			getLoginScenario().saveBean(
					PharmacySearchCommonConstants.PHARMACY_RESULT_ACTUAL,
					pharmacyResultActualJson);

		} else {
			Assert.fail("Failed to load Pharmacy search page");
		}

	}

	/**
	 * @toDo:user searches available pharmacies by selecting 
	 */
	@And("the user searches available pharmacies by selecting \"Show pharmacies for these services.\"$")
	public void  user_searches_pharmacies_by_choosing_pharmacy_types_ums(DataTable pharmacyTypeAttributes)
	{
		String[] pharmacyTypeArray = pharmacyTypeAttributes.getGherkinRows().get(0).getCells().get(0).split(",");

		PharmacySearchPage pharmacySearchPage = (PharmacySearchPage) getLoginScenario()
				.getBean(PageConstants.PHARMACY_SEARCH_PAGE);

		PharmacyResultPage pharmacyResultPage = pharmacySearchPage.searchSelectingPharmacyTypes(pharmacyTypeArray);

		if (pharmacyResultPage != null) {
			getLoginScenario().saveBean(PageConstants.PHARMACY_RESULTS_PAGE,
					pharmacyResultPage);

			/* Get actual data */
			JSONObject pharmacyResultActualJson = pharmacyResultPage.pharmacyResultJson;
			getLoginScenario().saveBean(
					PharmacySearchCommonConstants.PHARMACY_RESULT_ACTUAL,
					pharmacyResultActualJson);

		} else {
			Assert.fail("Failed to load Pharmacy search page");
		}

	}

	/**
	 * @toDo: user validates the error message for no pharmacies found for below pharmacy
	 */
	@Then("^the user validates the error message for no pharmacies found for below pharmacy$")
	public void validates_error_msg_for_no_pharmacies_found(DataTable pharmacyTypeAttributes){
		

		 getLoginScenario().getBean(PageConstants.PHARMACY_SEARCH_PAGE);
		//jchen118 remove the non existing btn start
		//pharmacySearchPage.validateNoPharmacyErrormsg(pharmacyTypeArray);
		//jchen118 remove the non existing btn end
	}

	/**
	 * @toDo:user clicks on SearchAgain and navigates to pharmacies search
	 */
	@Then("^the user clicks on SearchAgain and navigates to pharmacies search page$")
	public void clicks_searchAgain_navigates_to_pharmaacies_search_page(){
		PharmacyResultPage pharmacyResultPage = (PharmacyResultPage) getLoginScenario()
				.getBean(PageConstants.PHARMACY_RESULTS_PAGE);

		if(pharmacyResultPage.navigateTopharmacySearch()){
			Assert.assertTrue(true);
		} else {
			Assert.fail("Failed to load Pharmacy search page");
		}

	}

	/**
	 * @toDo:user validates the available pharmacies page 
	 */
	@Then("^the user validates the available pharmacies page in UMS site$")
	public void user_validates_available_pharmacies_UMS() {
	
		PharmacySearchPage pharmacySearchPage = (PharmacySearchPage) getLoginScenario()
				.getBean(PageConstants.PHARMACY_SEARCH_PAGE);
		if(pharmacySearchPage.validatePharmacyResults()){
			Assert.assertTrue(true);
		} else {
			Assert.fail("Error in validating Pharmacy Results ");
		}
		

	}

	/**
	 * @toDo:user validates the right rail widget and logo slider
	 */
	@Then("^the user validates the right rail widget and logo slider$")
	public void validates_Right_Rail_Widget_And_Logo_UMS(){
		
	}

	/**
	 * @toDo:user validates Pharmacy Locator tool plan dropdown menu for the Medica and PCP member
	 */
	@Then("^the user validates Pharmacy Locator tool plan dropdown menu for the Medica and PCP member plan$")
	public void validates_Pharmacy_Locator_Tool_Plan_UMS(){
	
	}
	
	/**
	 * @toDo: user validates Search checkbox displayed dynamically related to the pharmacy network
	 */
	@Then("^the user validates Search checkbox displayed dynamically related to the pharmacy network$")
	public void validates_Pharmacy_Network_Displayed_Dynamically_UMS(){
		}
	
	/**
	 * @toDo:the user selects a language from dropdown in UMS Site
	 */
	@And("^the user selects a language from dropdown in UMS Site$")
	public void user_selects_language_ums(DataTable languageAttributes) {

		String langName = languageAttributes.getGherkinRows().get(0).getCells()
				.get(0);
		if(langName.equals("Spanish")){
			langName = "espa";	
		}else if(langName.equals("Chinese")){
			langName = "ä¸­æ";	
		}else{
			langName = "English";	
		}
		PharmacySearchPage pharmacySearchPage = (PharmacySearchPage) getLoginScenario()
				.getBean(PageConstants.PHARMACY_SEARCH_PAGE);
		pharmacySearchPage = pharmacySearchPage.selectLanguage(langName);

		if (pharmacySearchPage != null) {
			getLoginScenario().saveBean(PageConstants.PHARMACY_SEARCH_PAGE,
					pharmacySearchPage);
			Assert.assertTrue(true);
		} else {
			Assert.fail("Failed to load Pharmacy search page");
		}
	}
	
	/**
	 * @toDo:the user should see county popup
	 */
	@Then("^the user should see county popup in UMS site$")
	public void user_should_see_county_popup_ums() {
		PharmacySearchPage pharmacySearchPage = (PharmacySearchPage) getLoginScenario()
				.getBean(PageConstants.PHARMACY_SEARCH_PAGE);
		if(pharmacySearchPage.validateCountypopoup()){
			Assert.assertTrue(true);
		} else {
			Assert.fail("County Pop up did not appear");
		}
	}
	
	/**
	 * @toDo:the user selects the county
	 */
	@When("^the user selects the county in UMS site$")
	public void user_selects_county_ums(DataTable countyAttributes){
		String countyName = countyAttributes.getGherkinRows().get(0).getCells()
				.get(0);
		PharmacySearchPage pharmacySearchPage = (PharmacySearchPage) getLoginScenario()
				.getBean(PageConstants.PHARMACY_SEARCH_PAGE);
		pharmacySearchPage.selectCounty(countyName);
	}
	
	/**
	 * @toDo:the user should see choose a plan
	 */
	@Then("^the user should see choose a plan in UMS site$")
	public void user_should_see_choose_plan_ums(){
		PharmacySearchPage pharmacySearchPage = (PharmacySearchPage) getLoginScenario()
				.getBean(PageConstants.PHARMACY_SEARCH_PAGE);
		pharmacySearchPage.validateChoosePlanSectionAfterzipcodeSearch();
	}
}
