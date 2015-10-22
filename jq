  (function(){dust.register("promotionsHistory",body_0);function body_0(chk,ctx){return chk.write("<div class=\"contentArea\"><table width=\"100%\" class=\"HeaderTable marginBottom\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td width=\"45%\"><hr class=\"headerline\"></td><th width=\"10%\"><h1 class=\"center\"><div class=\"noWrap marginRight marginLeft\">Promotions History</div></h1></th><td width=\"41%\"><hr class=\"headerline\"></td>\t\t<td width=\"4%\"><!--Help --><div id=\"\" style=\"\"><a href=\"#\" title=\"Help Menu\" role=\"button\"><img id=\"promotionsHistoryHelp").reference(ctx.get("tabId"),ctx,"h").write("\" width=\"16px\" height=\"16px\" src=\"\" alt = \"Help Menu\"  style=\"border:none; cursor:pointer;\"></a></div><!--End Help --></td></tr></table><div><table class=\"StandardForm\" ><tr><td width=\"3%\"><input type='radio' name='levelRadio").reference(ctx.get("tabId"),ctx,"h").write("' id='lineLevelRadio").reference(ctx.get("tabId"),ctx,"h").write("' value='LINE' checked /></td><td width=\"30%\"><label for='lineLevelRadio").reference(ctx.get("tabId"),ctx,"h").write("'>Line Level History</label></td><td width=\"10%\">&nbsp;</td><td width=\"3%\"><input type='radio' name='levelRadio").reference(ctx.get("tabId"),ctx,"h").write("' id='accountLevelRadio").reference(ctx.get("tabId"),ctx,"h").write("' value='ACCOUNT'/></td><td width=\"54%\"><label for='accountLevelRadio").reference(ctx.get("tabId"),ctx,"h").write("'>Account Level History</label></td></tr></table></div><div><div id='lineGrid").reference(ctx.get("tabId"),ctx,"h").write("'><table id=\"gridData_promotionsHistory").reference(ctx.get("tabId"),ctx,"h").write("\"></table><div id=\"navPromotionsHistory").reference(ctx.get("tabId"),ctx,"h").write("\"></div></div><div id='accountGrid").reference(ctx.get("tabId"),ctx,"h").write("' style='display:none'><table id=\"gridData_accountpromotionsHistory").reference(ctx.get("tabId"),ctx,"h").write("\"></table><div id=\"navAccountPromotionsHistory").reference(ctx.get("tabId"),ctx,"h").write("\"></div></div><table class=\"StandardForm\" width=\"100%\" cellspacing=\"5\" cellpadding=\"0\" border=\"0\"><tr><td width=\"100%\"><div> </div></td></tr><tr><td width=\"100%\" align='right' style='padding-top:5px'><button id=\"promotionsHistoryBtnRemarks").reference(ctx.get("tabId"),ctx,"h").write("\" class=\"burgundybutton btnWidth120\"  title=\"View Remarks\">View Remarks</button></td></tr></table></div></div>");}return body_0;})();
  
var promotionsHistory = {
	process: function(jsonData) {
		
		var me = this;
		this.uniqueId = jsonData.uniqueId;
		
		this.remarksLevel = new Object();
		
		this._accountInfo = ACAAFM.getAcssDataAcctInfo(jsonData.tabId);
		
		ACAAFM.callServicePost("RetrieveHistoryService", {
			customerId: me._accountInfo.customerId
			,billAccountNumber: me._accountInfo.accountNumber
			,billTypeCode: me._accountInfo.billTypeCode
			,mdn: me._accountInfo.mtn
			,serviceName: ACSSConstants.HistoryService.DETAIL_MTN_PROMOTIONS_HISTORY_INQUIRY
			,mtnEffectiveDate: me._accountInfo.mtnEffectiveDate
		}, function(data) {
			me.gridData = [];
			me.acctGridData = [];
			if (data.serResp && data.serResp.acssService && data.serResp.acssService.response && data.serResp.acssService.response.mtnPromotionList && data.serResp.acssService.response.mtnPromotionList.mtnPromotion) {
				me.gridData = data.serResp.acssService.response.mtnPromotionList.mtnPromotion;
			}
			if (data.serResp && data.serResp.acssService && data.serResp.acssService.response && data.serResp.acssService.response.productInfoList && data.serResp.acssService.response.productInfoList.productOfferInfo) {
				me.acctGridData = data.serResp.acssService.response.productInfoList.productOfferInfo;
			}
			
			dust.render("promotionsHistory", {tabId: me.uniqueId}, function(err, out) {
				if(err != null){
					
					alert("Error loading page");
				 } 
				
				if(!ACAAFM.IsEmptyOrNull(me.uniqueId)){
				me.uxComponent.html(out);
				me.onRender();
				me.onRenderAccountGrid();
				
				$jq("input[name=levelRadio"+me.uniqueId+"]").change(function() {
					me.radioClick();
				});
				}
				
			});
		});
	}
	,onRender: function() {
		var me = this;
		this.uxGrid = $jq('#gridData_promotionsHistory'+this.uniqueId);
		this.uxPager = $jq('#navPromotionsHistory'+this.uniqueId);
		this.uxBtnClose = this.uxComponent.find("#promotionsHistoryBtnClose"+this.uniqueId);
		this.uxBtnRemarks = this.uxComponent.find("#promotionsHistoryBtnRemarks"+this.uniqueId);
		
		me.uxGrid.jqGrid({
			data: me.gridData
			,datatype: 'local'
			,rowNum: 65535
			,colNames: ['ID', 'Description', 'Eff Date', 'End Date', 'Minutes Avail (Type)', 'Months Left', 'Act', 'Priority Ind', 'Allow Share?', 'Monthly / Term', 'Allowance Type']
			,colModel: [{name:'promotionId', index:'promotionId', sorttype: 'int', width: '6%', align: 'center'}
				,{name:'promotionDescription', index:'promotionDescription', width: '22%'}
			    ,{name:'promotionEffectiveDate', index:'promotionEffectiveDate', align: 'center', width: '8%',sorttype: 'date', datefmt: 'm/d/Y'}
			    ,{name:'promotionEndDate', index:'promotionEndDate', align: 'center', width: '8%',sorttype: 'date', datefmt: 'm/d/Y'}
			    ,{name:'minutesAvailable', index:'minutesAvailable', align: 'center', width: '7%'}
			    ,{name:'monthsLeft', index:'monthsLeft', sorttype: 'int', align: 'center', width: '7%'}
			    ,{name:'lastActiveCode', index:'lastActiveCode', align: 'center', width: '4%'}
			    ,{name:'priorityIndicator', index:'priorityIndicator', align: 'center', width: '7%'}
			    ,{name:'allowanceShareIndicator', index:'allowanceShareIndicator', align: 'center', width: '7%'}
			    ,{name:'allowCreditType', index:'allowCreditType', align: 'center', width: '7%'}
			    ,{name:'allowanceTypeCode', index:'allowanceTypeCode', width: '17%'}
			 ]
			,viewrecords: true
			,sortorder: "desc"
			,hidegrid: false
			,height: '150'
			,headertitles : true
			,width: me.uxGrid.parent().width()
			,gridComplete: function () {
				ACAAFM.ModifyGridDefaultStyles(me.uxGrid.attr("id"));
				try 
				{
					me.uxGrid.setSelection(1, true);	
				} catch(e){}											
			},
			
			onSelectRow: function(id)
			{				
				var rowData = me.uxGrid.jqGrid('getRowData', id);	
				//console.log("ID:::",id,"rowdrta::",rowData);
				me.remarksLevel.isMdnLevel = true;
				me.remarksLevel.action = "PROMO";
				me.remarksLevel.selectedMDNStartDate = rowData['promotionEffectiveDate'];
				me.remarksLevel.selectedMDNEndDate = rowData['promotionEndDate'];					
			}
			
		});
		
		if (me.gridData.length == 0) {
			
			me.uxBtnRemarks.addClass("disable").removeClass("burgundybutton").attr("disabled","disabled");
			
		}
		
		this.uxBtnClose.click(function() {
			me.uxComponent.parent().dialog("close");
		});
		
		this.uxBtnRemarks.click(function() {
			
			ACAAFM.createPopup("retrieveRemarksView", {}, null, {isLaunchedFromHistoryScreen:true, isMdnLevel:me.remarksLevel.isMdnLevel,startDate: me.remarksLevel.selectedMDNStartDate, endDate: me.remarksLevel.selectedMDNEndDate, action: me.remarksLevel.action});
			
			var radioValue = $jq("input[name=levelRadio"+me.uniqueId+"]:checked").val();
			if(radioValue == "ACCOUNT"){
				ACAAFM.insertUsageMetrics({ACTION_ID : 'VIEW_REMARKS_ACCOUNT_LEVEL' , EVENT_ID: 'HISTORY_PROMO',NOTES : ""}, function() {});
			}
		});
		
		
		addHelpMenuandLinkHtml("#promotionsHistoryHelp"+this.uniqueId,"acssweb_promohist_help.htm","");
	},
	onRenderAccountGrid:function(){
		var me = this;
		this.uxAcctGrid = $jq('#gridData_accountpromotionsHistory'+this.uniqueId);
		this.uxAcctPager = $jq('#navAccountPromotionsHistory'+this.uniqueId);
		
		me.uxAcctGrid.jqGrid({
			data: me.acctGridData
			,datatype: 'local'
			,rowNum: 65535
			,colNames: ['ID', 'Description', 'Eff Date', 'Exp Date', 'End Date', 'Allowance','Allowance Type', 'Act',   'Qualifying MDN']
			,colModel: [{name:'productId', index:'productId', sorttype: 'int', width: '6%', align: 'center'}
				,{name:'productBillDesc', index:'productBillDesc', width: '22%'}
			    ,{name:'effectiveDate', index:'effectiveDate', align: 'center', width: '8%',sorttype: 'date', datefmt: 'm/d/Y'}
				,{name:'expirationDate', index:'expirationDate', align: 'center', width: '8%',sorttype: 'date', datefmt: 'm/d/Y'}
			    ,{name:'endDate', index:'endDate', align: 'center', width: '8%',sorttype: 'date', datefmt: 'm/d/Y'}
			    ,{name:'productAllowAmount', index:'productAllowAmount', sorttype: 'int', align: 'center', width: '7%'}
			    ,{name:'productAllowTypeCode', index:'productAllowTypeCode', width: '17%', align:'center'}
				,{name:'lastActivityCode', index:'lastActivityCode', align: 'center', width: '4%'}
				,{name:'mtn', index:'mtn', width: '17%', align:'center'}
			 ]
			,viewrecords: true
			,sortorder: "desc"
			,hidegrid: false
			,height: '150'
			,headertitles : true
			,width: me.uxAcctGrid.parent().parent().width()
			,gridComplete: function () {
				ACAAFM.ModifyGridDefaultStyles(me.uxAcctGrid.attr("id"));
				try 
				{
					me.uxAcctGrid.setSelection(1, true);	
				} catch(e){}											
			},
			
			onSelectRow: function(id)
			{				
				var rowData = me.uxAcctGrid.jqGrid('getRowData', id);					    	   	
				me.remarksLevel.isMdnLevel = false;
				me.remarksLevel.action = "OFFER";
				me.remarksLevel.selectedMDNStartDate = rowData['effectiveDate'];
				me.remarksLevel.selectedMDNEndDate = rowData['endDate'];					
			}
			
		});
		
		
		
	},
	radioClick:function(){
		var me = this;
		var radioValue = $jq("input[name=levelRadio"+me.uniqueId+"]:checked").val();
		me.uxBtnRemarks.addClass("burgundybutton").removeClass("disable").removeAttr("disabled");
		if(radioValue == "LINE"){
			$jq('#accountGrid'+me.uniqueId).hide();
			$jq('#lineGrid'+me.uniqueId).show();
			if (me.gridData.length == 0) {
				me.uxBtnRemarks.addClass("disable").removeClass("burgundybutton").attr("disabled","disabled");
			}
		}else if(radioValue == "ACCOUNT"){
			$jq('#lineGrid'+me.uniqueId).hide();
			$jq('#accountGrid'+me.uniqueId).show();
			if (me.acctGridData.length == 0) {
				me.uxBtnRemarks.addClass("disable").removeClass("burgundybutton").attr("disabled","disabled");				
			}
			ACAAFM.insertUsageMetrics({ACTION_ID : 'VIEW_ACCOUNT_LEVEL' , EVENT_ID: 'HISTORY_PROMO',NOTES : ""}, function() {});
		}
		me.setRemarksData(radioValue);
	},
	setRemarksData:function(type){
		var me = this;
		var gridId = "";
		if(type=='LINE'){
			gridId = '#gridData_promotionsHistory'+me.uniqueId;
		}else if(type=='ACCOUNT'){
			gridId = '#gridData_accountpromotionsHistory'+me.uniqueId;
		}
		me.remarksLevel = {};
		
		var rowId = jQuery(gridId).jqGrid('getGridParam','selrow');
		var rowData = $jq(gridId).jqGrid('getRowData', rowId);					    	   	
		
				if(rowData!=null){	
					me.remarksLevel.isMdnLevel = true;
					me.remarksLevel.action = "PROMO";
					if(type=='ACCOUNT'){
						me.remarksLevel.selectedMDNStartDate = rowData['effectiveDate'];
						me.remarksLevel.selectedMDNEndDate = rowData['endDate'];		
						me.remarksLevel.action = "OFFER";
						me.remarksLevel.isMdnLevel = false;
					}else if(type=='LINE'){
						me.remarksLevel.selectedMDNStartDate = rowData['promotionEffectiveDate'];
						me.remarksLevel.selectedMDNEndDate = rowData['promotionEndDate'];		
					}
				}
	},beforeClose:function(){
		
		$jq("input[name=levelRadio"+this.uniqueId+"]").unbind();
		$jq("input[name=levelRadio"+this.uniqueId+"]").remove();
		
		$jq('#navPromotionsHistory'+this.uniqueId).remove();
		
		$jq("#promotionsHistoryHelp"+this.uniqueId).unbind();
		$jq("#promotionsHistoryHelp"+this.uniqueId).remove();
		
		$jq("#promotionsHistoryBtnClose"+this.uniqueId).unbind();
		$jq("#promotionsHistoryBtnClose"+this.uniqueId).remove();
		
		$jq('#navAccountPromotionsHistory'+this.uniqueId).remove();
		
		$jq("#promotionsHistoryBtnRemarks"+this.uniqueId).unbind();
		$jq("#promotionsHistoryBtnRemarks"+this.uniqueId).remove();
		
		$jq('#gridData_promotionsHistory'+this.uniqueId).GridDestroy();
		$jq('#gridData_accountpromotionsHistory'+this.uniqueId).GridDestroy();
	}	
};
