document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll(".expand-btn").forEach(n=>{n.addEventListener("click",function(){const e=this.getAttribute("data-row"),s=document.querySelector(`.data-table-expanded-row[data-row="${e}"]`);if(this.classList.contains("expanded"))this.classList.remove("expanded"),s.style.display="none";else{this.classList.add("expanded"),s.style.display="table-row";const a=s.querySelector(`.expanded-placeholder[data-row="${e}"]`);a&&!a.hasAttribute("data-populated")&&(t(a),a.setAttribute("data-populated","true"))}})})});function t(d,n){const e=`
    <div class="expanded-section">
      <div class="expanded-section-title">
        <svg class="icon" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Violation Details
      </div>
      <div class="expanded-section-content">
        <div class="expanded-key-value">
          <span class="expanded-key">ID:</span>
          <span class="expanded-value">197</span>
        </div>
        <div class="expanded-key-value">
          <span class="expanded-key">Timestamp:</span>
          <span class="expanded-value">7/30/2025, 1:37:10 PM</span>
        </div>
        <div class="expanded-key-value">
          <span class="expanded-key">Path:</span>
          <span class="expanded-value">/home/ubuntu/bomfather-private/agent/example/protected/protected1</span>
        </div>
      </div>
    </div>
    
    <div class="expanded-section">
      <div class="expanded-section-title">
        <svg class="icon" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
        </svg>
        Process Information
      </div>
      <div class="expanded-section-content">
        <div class="expanded-key-value">
          <span class="expanded-key">PID:</span>
          <span class="expanded-value">77962</span>
        </div>
        <div class="expanded-key-value">
          <span class="expanded-key">Start:</span>
          <span class="expanded-value">7/30/2025, 1:37:10 PM</span>
        </div>
        <div class="expanded-key-value">
          <span class="expanded-key">End:</span>
          <span class="expanded-value">12/31/1, 6:09:24 PM</span>
        </div>
      </div>
    </div>
    
    <div class="expanded-section">
      <div class="expanded-section-title">
        <svg class="icon" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
        </svg>
        Container Information
      </div>
      <div class="expanded-section-content">
        <div class="expanded-key-value">
          <span class="expanded-key">Status:</span>
          <span class="expanded-value">Not Implemented</span>
        </div>
        <div class="expanded-key-value">
          <span class="expanded-key">ID:</span>
          <span class="expanded-value">1</span>
        </div>
        <div class="expanded-key-value">
          <span class="expanded-key">CGroup:</span>
          <span class="expanded-value">0</span>
        </div>
      </div>
    </div>
  `;d.innerHTML=e}
