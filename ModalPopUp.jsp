<%@include file="/libs/foundation/global.jsp"%>
<%@page session="false"%>
<body class="theme-uhc-mir">
    <main role="main" id="site-wrapper">
        <div class="modal-overlay show" style="overflow: scroll;">
            <div id="ole-cancel-confirm" class="popup-modal active">
                <div class="modal-title">
                    <h3>${properties.cancelPopupTitle}</h3>
                </div>
                <div class="uhc-modal-body">
                    <div class="uhc-modal-content">
                        ${properties.cancelPopupContent}
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="#" class="cta-button close-modal secondary" style="background-color:${properties.backBtnColor};">${properties.backBtn}</a>
                    <a href="#" class="cta-button" style="background-color:${properties.cancelBtnColor};">${properties.cancelBtn}</a>
                </div>
            </div>
            <div id="view-learn-enrollment" class="popup-modal active" style="top: 51%;">
                <div class="modal-title">
                    <h3>${properties.learnMoreAbtOETitle}</h3>
                </div>
                <div class="uhc-modal-body">
                    <div class="uhc-modal-content">
                        ${properties.learnMoreAbtOEContent}
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="#" class="cta-button close-modal secondary" style="background-color:${properties.returnToAppBtnColor};">${properties.returnToAppBtn}</a>
                </div>
            </div>

            <div id="sample-linkrouter" class="popup-modal active">
        <div class="modal-title">
            ${properties.leavingsitepopupTitle}
        </div>
        <div class="uhc-modal-body">
            <div id="redirect_content">
                <div class="parsys contentPar"><div class="parbase section borderlesscontentarea">    
                  ${properties.leavingsitepopupContent}
                </div>
              </div>
        </div>
        <div class="modal-footer">
            <a href="https://www.aarp.org/" class="cta-button close-modal secondary" id="proceed" style="background-color:${properties.proceedBtnColor};">${properties.proceedBtn}</a>
          <a class="cta-button cta-button" (click)="back()"style="background-color:${properties.cancelButtonColor};">${properties.cancelButton}</a>
        </div>
      </div>
  </div>
        </div>
    </main>
</body>
