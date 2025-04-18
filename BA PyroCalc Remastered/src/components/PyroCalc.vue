<script setup>
import {onMounted} from 'vue'
import {checkBoxes} from '@/assets/script.js'

onMounted(() => {
  checkBoxes();
  //banners();
  //calculatePyroxene();
})
</script>

<template>
  <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="Easy to use tool to calculate and plan your Pyroxene earnings for upcoming banners!" />
    <meta property="og:title" content="Pyroxene Calculator for Blue Archive">
    <meta property="og:description" content="Easy to use tool to calculate and estimate your Pyroxene earnings for upcoming banners! Simply check your pyroxene earnings, and hit calculate!"> 
    <title>Blue Archive Pyroxene Calculator</title>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="/arona-googleicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
  </head>
  <body>

<div class = "main-container">

  <div class = "left-section">
    <section id="calculator" class="calculator">
      <h3 id="days-header" style: hidden>Days until banner starts:</h3>

      <div class="btn-group">
        <button class="btn" id="upcoming-banner-btn">Select Upcoming Banner</button>
      </div>

      <div class="btn-group" id = "header-div">
        <div id = "select-header">Income Select</div>
      </div>
      
      <!-- Popup -->
      <div id="popup" class="popup">
        <div class="popup-content">
          <span class="close-btn" id="close-popup">&times;</span>
          <h2>Upcoming Banners</h2>
          <h3>Select a banner to estimate your Pyroxene earnings for.</h3>
          <div class="popup-scrollable">
            <!-- Boxes will be dynamically populated here -->
          </div>
        </div>
      </div>

      <div class="calc-inputs">
        <ul>
          <label class = check-inputs>
            <input type="checkbox" id="daily">
              Daily Login
            <div class="image-container">
              <img src="@/assets/Pyroxene.png" class="side-image">
              <div class="number-box">x150</div>
            </div>
          </label>

          <label class = check-inputs>
            <input type="checkbox" id="daily-task" data-pyroxene="20">
              Daily Tasks
              <div class="image-container">
                <img src="@/assets/Pyroxene.png" class="side-image">
                <div class="number-box">x20</div>
              </div>
          </label>

          <label class = check-inputs>
            <input type="checkbox" id="weekly">
              Weekly Tasks        
              <div class="image-container">
                <img src="@/assets/Pyroxene.png" class="side-image">
                <div class="number-box">x120</div>
              </div>          
            </label>

          <label class = check-inputs>
            <input type="checkbox" id="maintenance">
              Maintenance Compensation    
              <div class="image-container">
                <img src="@/assets/Pyroxene.png" class="side-image">
                <div class="number-box">x840</div>
              </div>
          </label>

          <label class = check-inputs>
            <input type="checkbox" id="event">
              Event Rewards            
            <img src="@/assets/Event_Point_0.png" class="side-image">
          </label>

          <label class = check-inputs>
            <input type="checkbox" id="pvp">
              Tactical Challenge            
            <img src="@/assets/Arena_Coin.png" class="side-image">
          </label>

          <li>
            <select id="pvp-rank" style="width: 25vh; height: 5vh;">
              <option value="rank15000">Rank 8001 - 15000</option>
              <option value="rank8000">Rank 4001 - 8000</option>
              <option value="rank4000">Rank 2001 - 4000</option>
              <option value="rank2000">Rank 1001 - 2000</option>
              <option value="rank1000">Rank 501 - 1000</option>
              <option value="rank500">Rank 201 - 500</option>
              <option value="rank200">Rank 101 - 200</option>
              <option value="rank100">Rank 11 - 100</option>
              <option value="rank10">Rank 3 - 10</option>
              <option value="rank2">Rank 2</option>
              <option value="rank1">Rank 1</option>
            </select>          
          </li>

          <label class = check-inputs>
            <input type="checkbox" id="totalcheck">
              Total Assault          
              <img src = "@/assets/Total_War_Coin.png" class="side-image">
              <img src = "@/assets/Rare_Coin.png" class="side-image">
          </label>

          <select id="total-rank" style="width: 25vh; height: 5vh;">
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
          </select>          

          <label class = check-inputs>
            <input type="checkbox" id="grand">
              Grand Assault            
              <img src = "@/assets/Great_Coin.png" class="side-image">
              <img src = "@/assets/Rare_Great_Coin.png" class="side-image">
              <img src="@/assets/10x_Gacha_Ticket.png" class="side-image">
          </label>

          <div class = check-inputs id="ticketsdiv">
            <input type="checkbox" id = "tickets">
          Include x10 Tickets in Pyroxenes
          </div>     
        </ul>
      </div>

      <div class="btn-group" id = "header-div">
        <div id = "select-header">Pack Select</div>
      </div>
      <div class="packs">
        <ul>
          <label class = check-inputs>
              <input type="checkbox" id="bimonthly-pyropack">
              Bimonthly Pyroxene Pack
              <img src="@/assets/arona-packbi.png" class="side-image">

          </label>
          <label class = check-inputs>
              <input type="checkbox" id="monthly-pyropack">
              Monthly Pyroxene Pack
              <img src="@/assets/arona-packmo.png" class="side-image">
          </label>
        </ul>
      </div>

          <div class="calculator-card">
            <div class="btn-group" id = "header-div">
              <div id = "select-header" style="font-size: 1.6vh">Current Pyroxenes
                <h3 style= 'font-size: 1.5vh;'>(Optional)</h3>
              </div>
            </div>            
            <div class="input-group">
              <input type="number" id="current-pyroxenes" min="0" max="1000000" placeholder="e.g. 24000" class = "current-input">
            </div>

            <div class="btn-group">
              <button id = "calculate-btn" class="btn" disabled>
                Calculate
              </button>
            </div>
          </div>
    </section> <!-- Calculator -->

  </div> <!-- Left side -->
    <div class = "right-section">
      <section id = "result-popup" class="result-popup">
        <div class="result-container hidden" id = result-container>
          <div class="amount-box-top" id = "amount-box-top">
            <p id="result" class = "totalpyro">Total Pyroxenes: x0
            </p>

            <div class="total-calc-image-container">
              <img src="@/assets/Pyroxene.png" class="total-side-image">
              <div id = "resultpyro" class="total-number-box">x0</div>
            </div>

          </div>
          <div class="calculations">
            <h3>Calculations</h3>
            <table class="calc-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Pyroxene Rate</th>
                  <th>Earnings</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Daily Login</td>
                  <td>
                    <div class="calc-image-container">
                      <img src="@/assets/Pyroxene.png" class="side-image">
                      <div class="number-box">x150</div>
                    </div>
                    <div class="daily-calc-rate">
                      Per 10 days
                    </div>
                  </td>
                  <td>
                    <div class="calc-image-container">
                      <img src="@/assets/Pyroxene.png" class="side-image">
                      <div class="number-box" id = "daily-calc">x0</div>
                    </div>
                  </td>                
                </tr>
                <tr>
                  <td>Daily Tasks</td>
                  <td>
                    <div class="calc-image-container">
                      <img src="@/assets/Pyroxene.png" class="side-image">
                      <div class="number-box">x20</div>
                    </div>   
                    <div class="daily-calc-rate">
                      Per day
                    </div>
                  </td>
                  <td>
                    <div class="calc-image-container">
                      <img src="@/assets/Pyroxene.png" class="side-image">
                      <div class="number-box" id = "daily-task-calc">x0</div>
                    </div>
                  </td>                    
                </tr>
                <tr>
                  <td>Weekly Tasks</td>
                  <td>
                    <div class="calc-image-container">
                      <img src="@/assets/Pyroxene.png" class="side-image">
                      <div class="number-box">x120</div>
                    </div>   
                    <div class="daily-calc-rate">
                      Per 7 days
                    </div>
                  </td>
                  <td>
                    <div class="calc-image-container">
                      <img src="@/assets/Pyroxene.png" class="side-image">
                      <div class="number-box" id = "weekly-calc">x0
                    </div>
                  </div>
                  </td>    
                </tr>
                <tr>
                  <td>Maintenance Compensation</td>
                  <td>                    
                    <div class="calc-image-container">
                    <img src="@/assets/Pyroxene.png" class="side-image">
                    <div class="number-box">x840</div>
                  </div>   
                  <div class="daily-calc-rate">
                    Per maintenance
                  </div>
                  </td>
                  <td>
                    <div class="calc-image-container">
                      <img src="@/assets/Pyroxene.png" class="side-image">
                      <div class="number-box" id = "maintenance-calc">x0
                    </div>  
                  </div>                
                  </td>
                </tr>
                <tr>
                  <td>Event Rewards</td>
                  <td>
                    <div class="calc-image-container">
                      <img src="@/assets/Pyroxene.png" class="side-image">
                      <div class="number-box">x1650</div>
                    </div>   
                    <div class="daily-calc-rate">
                      Per event
                    </div>
                  </td>
                  <td>
                    <div class="calc-image-container">
                      <img src="@/assets/Pyroxene.png" class="side-image">
                      <div class="number-box" id = "event-calc">x0
                    </div>
                    </div>
                  </td>   
                </tr>
                <tr>
                  <td>Tactical Challenge</td>
                  <td>
                    <div class="calc-image-container">
                      <img src="@/assets/Pyroxene.png" class="side-image">
                      <div class="number-box" id = "pvp-calc-rate">x0</div>
                    </div>
                    <div class="daily-calc-rate">
                      Per day
                    </div>
                  </td>
                  <td>
                    <div class="calc-image-container">
                      <img src="@/assets/Pyroxene.png" class="side-image">
                      <div class="number-box" id = "pvp-calc">x0</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Total Assault</td>
                  <td>
                    <div class="calc-image-container">
                      <img src="@/assets/Pyroxene.png" class="side-image">
                      <div class="number-box" id = "total-calc-rate">x0</div>
                    </div>
                    <div class="daily-calc-rate">
                      Per raid
                    </div>
                  </td>
                  <td>
                    <div class="calc-image-container">
                      <img src="@/assets/Pyroxene.png" class="side-image">
                      <div class="number-box" id = "total-calc">x0
                    </div>
                    </div>
                  </td>                   
                </tr>
                <tr>
                  <td>Grand Assault</td>
                  <td>
                    <div class="calc-image-container">
                      <img src="@/assets/Pyroxene.png" class="side-image">
                      <div class="number-box" id = "grand-calc-rate">x0</div>
                    </div>
                    <div class="daily-calc-rate">
                      Per raid
                    </div>
                  </td>
                    <td>
                      <div class="calc-image-container">
                        <img src="@/assets/Pyroxene.png" class="side-image">
                        <div class="number-box" id = "grand-calc">x0</div>
                      </div>
                    </td>
                </tr>
                <tr>
                  <td>Bimonthly Pyroxene Pack</td>
                  <td>
                    <div class = "packperday">
                      <div class="calc-image-container">
                        <img src="@/assets/Pyroxene.png" class="side-image">
                        <div class="number-box">x176</div>
                      </div>   
                      <div class="daily-calc-rate">
                        Per 15 days
                      </div>
                    </div>
                    
                    <div class="daily-calc-rate">
                      +
                    </div>
                    
                    <div class = "packperday">
                      <div class="calc-image-container">
                      <img src="@/assets/Pyroxene.png" class="side-image">
                      <div class="number-box">x20</div>
                      </div>  
                      <div class="daily-calc-rate">
                      Per day
                      </div>
                    </div>
                  </td>
                    <td>
                      <div class="calc-image-container">
                        <img src="@/assets/Pyroxene.png" class="side-image">
                        <div class="number-box" id = "bimonthly-calc">x0
                      </div>
                    </div>
                  </td>
                                    
                </tr>
                <tr>
                  <td>Monthly Pyroxene Pack</td>
                  <td>
                      <div class = "packperday">
                        <div class="calc-image-container">
                          <img src="@/assets/Pyroxene.png" class="side-image">
                          <div class="number-box">x392</div>
                        </div>   
                        <div class="daily-calc-rate">
                          Per 30 days
                        </div>
                      </div>   
                    <div class="daily-calc-rate">
                      +
                    </div>
                    <div class = "packperday">
                      <div class="calc-image-container">
                      <img src="@/assets/Pyroxene.png" class="side-image">
                      <div class="number-box">x40</div>
                      </div>  
                      <div class="daily-calc-rate">
                      Per day
                      </div>
                    </div>
                  </td>
                    <td>
                      <div class="calc-image-container">
                        <img src="@/assets/Pyroxene.png" class="side-image">
                        <div class="number-box" id = "monthly-calc">x0
                      </div>
                    </div>
                    </td>                   
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section> <!-- Result Popup -->
    </div> <!-- Right side -->

    <div class = "remainder-area">
      <div id= "raidslist" class = "raidslist">
        <div id = "totalAssault"></div>
        <div id = "grandAssault"></div>
        <div id = "eventList"></div>
      </div> 

      <div id = "assumptions" class = "assumptions">
        <h3>Assumptions</h3>
        <ul>
          <li>- Total Pyroxenes does not include MomoTalks, Main Story, Achievements, or other ways not listed.</li>
          <li>- Anniversary logins, bonuses, and tickets are not included.</li>
          <li>- Event rewards in exchanges and shops is averaged between x600 and x1200 Pyroxenes.</li>
          <li>- Each Event assumes full clear of 10 Stories, 12 Quests, and 3 Challenge Stages, averaged to x1650 per event.</li>
          <li>- Each Raid assumes full points from rewards initially totaling x650 Pyroxenes. </li>
          <li>- Grand Assault tickets are assumed to be non-expiring.</li>
          <li>- Maintenance rewards are averaged between x720 and x920 Pyroxenes for each event release.</li>
          <li>- Weekly tasks are gained every 7 days, and login rewards are gained every 10 days.</li>
          <li>- The anticipated schedule is approximated as the Global and JP server gap slowly shortens to 3 months. </li>
        </ul>
      </div>
    </div>
  </div> <!-- Main Container -->
  <footer class="footer">
    <p>© 2025 Pyroxene Calculator. All rights reserved. Some content is sourced from the <a href="https://bluearchive.wiki/wiki/Main_Page" target="_blank">Blue Archive Wiki.</a></p>
      
    <p>This website is not affiliated with Yostar or Nexon, and is not an official Blue Archive website.
      All images, artwork, and information used are the property and copyright of their respective owners.
    </p>
  </footer>
  </body>
</html>
</template>

<style scoped>
</style>
