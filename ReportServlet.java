package com.uhg.mr.servlet;

import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.uhg.mr.report.RunJsonConversion;

/**
 * Servlet implementation class ReportServlet
 */
public class ReportServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public ReportServlet() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		//String rallyPath = request.getParameterName("rallyCsvPath");
		//Enumeration params = request.getParameterNames();
		String paramsRallyCsv =request.getParameter("rallyCsvPath");
		String paramsJenkinsJsonStage =request.getParameter("jenkinsJsonPathStage");
		String paramsJenkinsJsonTesta =request.getParameter("jenkinsJsonPathTesta");
		String paramsJenkinsJsonLocal =request.getParameter("jenkinsJsonPathLocal");
		//System.out.println("paramsRallyCsv:" + paramsRallyCsv);
		//System.out.println("paramsJenkinsJsonStage:" + paramsJenkinsJsonStage);
		//System.out.println("paramsJenkinsJsonTesta:" + paramsJenkinsJsonTesta);
		//System.out.println("paramsJenkinsJsonLocal:" + paramsJenkinsJsonLocal);
		RunJsonConversion runJsonConversion = new RunJsonConversion();
		//runJsonConversion.runProcess();
		runJsonConversion.getDataByJson(paramsJenkinsJsonStage,"stage");
		runJsonConversion.getDataByJson(paramsJenkinsJsonTesta,"testa");
		runJsonConversion.getDataByJson(paramsJenkinsJsonLocal,"local");
		StringBuilder finalData =  runJsonConversion.getRallyData(paramsRallyCsv);
		//System.out.println("finalData:" + finalData);
		response.setContentType("text/csv");
		String reportName= "report.csv";
		response.setHeader("Content-disposition", "attachment; " +
                "filename=" + reportName); 
		response.getWriter().append(finalData);
		//response.getOutputStream().
		//response.sendRedirect("index.jsp");
		

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
