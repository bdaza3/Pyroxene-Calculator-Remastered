<template>
	<section id="result-popup" class="result-popup">
		<div class="result-container" id="result-container">
			<div class="amount-box-top" id="amount-box-top">
				<p id="result" class="totalpyro">Total Pyroxenes: x0</p>

				<div class="total-calc-image-container">
					<img src="@/assets/Pyroxene.png" class="total-side-image" />
					<div id="resultpyro" class="total-number-box">x0</div>
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
									<img src="@/assets/Pyroxene.png" class="side-image" />
									<div class="number-box">x150</div>
								</div>
								<div class="daily-calc-rate">Per 10 days</div>
							</td>
							<td>
								<div class="calc-image-container">
									<img src="@/assets/Pyroxene.png" class="side-image" />
									<div class="number-box" id="daily-calc">x0</div>
								</div>
							</td>
						</tr>
						<tr>
							<td>Daily Tasks</td>
							<td>
								<div class="calc-image-container">
									<img src="@/assets/Pyroxene.png" class="side-image" />
									<div class="number-box">x20</div>
								</div>
								<div class="daily-calc-rate">Per day</div>
							</td>
							<td>
								<div class="calc-image-container">
									<img src="@/assets/Pyroxene.png" class="side-image" />
									<div class="number-box" id="daily-task-calc">x0</div>
								</div>
							</td>
						</tr>
						<tr>
							<td>Weekly Tasks</td>
							<td>
								<div class="calc-image-container">
									<img src="@/assets/Pyroxene.png" class="side-image" />
									<div class="number-box">x120</div>
								</div>
								<div class="daily-calc-rate">Per 7 days</div>
							</td>
							<td>
								<div class="calc-image-container">
									<img src="@/assets/Pyroxene.png" class="side-image" />
									<div class="number-box" id="weekly-calc">x0</div>
								</div>
							</td>
						</tr>
						<tr>
							<td>Maintenance Compensation</td>
							<td>
								<div class="calc-image-container">
									<img src="@/assets/Pyroxene.png" class="side-image" />
									<div class="number-box">x840</div>
								</div>
								<div class="daily-calc-rate">Per maintenance</div>
							</td>
							<td>
								<div class="calc-image-container">
									<img src="@/assets/Pyroxene.png" class="side-image" />
									<div class="number-box" id="maintenance-calc">x0</div>
								</div>
							</td>
						</tr>
						<tr>
							<td>Event Rewards</td>
							<td>
								<div class="calc-image-container">
									<img src="@/assets/Pyroxene.png" class="side-image" />
									<div class="number-box">x1650</div>
								</div>
								<div class="daily-calc-rate">Per event</div>
							</td>
							<td>
								<div class="calc-image-container">
									<img src="@/assets/Pyroxene.png" class="side-image" />
									<div class="number-box" id="event-calc">x0</div>
								</div>
							</td>
						</tr>
						<tr>
							<td>Tactical Challenge</td>
							<td>
								<div class="calc-image-container">
									<img src="@/assets/Pyroxene.png" class="side-image" />
									<div class="number-box" id="pvp-calc-rate">x0</div>
								</div>
								<div class="daily-calc-rate">Per day</div>
							</td>
							<td>
								<div class="calc-image-container">
									<img src="@/assets/Pyroxene.png" class="side-image" />
									<div class="number-box" id="pvp-calc">x0</div>
								</div>
							</td>
						</tr>
						<tr>
							<td>Total Assault</td>
							<td>
								<div class="calc-image-container">
									<img src="@/assets/Pyroxene.png" class="side-image" />
									<div class="number-box" id="total-calc-rate">x0</div>
								</div>
								<div class="daily-calc-rate">Per raid</div>
							</td>
							<td>
								<div class="calc-image-container">
									<img src="@/assets/Pyroxene.png" class="side-image" />
									<div class="number-box" id="total-calc">x0</div>
								</div>
							</td>
						</tr>
						<tr>
							<td>Grand Assault</td>
							<td>
								<div class="calc-image-container">
									<img src="@/assets/Pyroxene.png" class="side-image" />
									<div class="number-box" id="grand-calc-rate">x0</div>
								</div>
								<div class="daily-calc-rate">Per raid</div>
							</td>
							<td>
								<div class="calc-image-container">
									<img src="@/assets/Pyroxene.png" class="side-image" />
									<div class="number-box" id="grand-calc">x0</div>
								</div>
							</td>
						</tr>
						<tr>
							<td>Bimonthly Pyroxene Pack</td>
							<td>
								<div class="packperday">
									<div class="calc-image-container">
										<img src="@/assets/Pyroxene.png" class="side-image" />
										<div class="number-box">x176</div>
									</div>
									<div class="daily-calc-rate">Per 15 days</div>
								</div>
								<div class="daily-calc-rate">+</div>
								<div class="packperday">
									<div class="calc-image-container">
										<img src="@/assets/Pyroxene.png" class="side-image" />
										<div class="number-box">x20</div>
									</div>
									<div class="daily-calc-rate">Per day</div>
								</div>
							</td>
							<td>
								<div class="calc-image-container">
									<img src="@/assets/Pyroxene.png" class="side-image" />
									<div class="number-box" id="bimonthly-calc">x0</div>
								</div>
							</td>
						</tr>
						<tr>
							<td>Monthly Pyroxene Pack</td>
							<td>
								<div class="packperday">
									<div class="calc-image-container">
										<img src="@/assets/Pyroxene.png" class="side-image" />
										<div class="number-box">x392</div>
									</div>
									<div class="daily-calc-rate">Per 30 days</div>
								</div>
								<div class="daily-calc-rate">+</div>
								<div class="packperday">
									<div class="calc-image-container">
										<img src="@/assets/Pyroxene.png" class="side-image" />
										<div class="number-box">x40</div>
									</div>
									<div class="daily-calc-rate">Per day</div>
								</div>
							</td>
							<td>
								<div class="calc-image-container">
									<img src="@/assets/Pyroxene.png" class="side-image" />
									<div class="number-box" id="monthly-calc">x0</div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</section>

	<div class="remainder-area">
		<div id="raidslist" class="raidslist">
			<div id="totalAssault"></div>
			<div id="grandAssault"></div>
			<div id="eventList"></div>
		</div>

		<div id="assumptions" class="assumptions">
			<h3>Assumptions</h3>
			<ul>
				<li>- Total Pyroxenes does not include MomoTalks, Main Story, Achievements, or other ways not listed.</li>
				<li>- Anniversary logins, bonuses, and tickets are not included.</li>
				<li>- Event rewards in exchanges and shops is averaged between x600 and x1200 Pyroxenes.</li>
				<li>- Each Event assumes full clear of 10 Stories, 12 Quests, and 3 Challenge Stages, averaged to x1650 per event.</li>
				<li>- Each Raid assumes full points from rewards initially totaling x650 Pyroxenes.</li>
				<li>- Grand Assault tickets are assumed to be non-expiring.</li>
				<li>- Maintenance rewards are averaged between x720 and x920 Pyroxenes for each event release.</li>
				<li>- Weekly tasks are gained every 7 days, and login rewards are gained every 10 days.</li>
				<li>- The anticipated schedule is approximated as the Global and JP server gap slowly shortens to 3 months.</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
// kept intentionally minimal; behavior is provided by src/assets/script.js
</script>

<!-- styles are now provided by Tailwind; component-specific CSS removed -->