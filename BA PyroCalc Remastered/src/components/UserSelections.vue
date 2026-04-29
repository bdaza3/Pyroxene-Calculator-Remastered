<template>
	<section id="calculator" class="calculator">
		<h3 id="days-header" style="display:none">Days until banner starts:</h3>

		<div class="btn-group">
			<button class="btn" id="upcoming-banner-btn">Select Upcoming Banner</button>
		</div>

		<div class="btn-group" id="header-div">
			<div id="select-header">Income Select</div>
		</div>

		<Banners />

		<div class="calc-inputs">
			<ul>
				<label class="check-inputs">
					<input type="checkbox" id="daily" />
					Daily Login
					<div class="image-container">
						<img src="@/assets/Pyroxene.png" class="side-image" />
						<div class="number-box">x150</div>
					</div>
				</label>

				<label class="check-inputs">
					<input type="checkbox" id="daily-task" data-pyroxene="20" />
					Daily Tasks
					<div class="image-container">
						<img src="@/assets/Pyroxene.png" class="side-image" />
						<div class="number-box">x20</div>
					</div>
				</label>

				<label class="check-inputs">
					<input type="checkbox" id="weekly" />
					Weekly Tasks
					<div class="image-container">
						<img src="@/assets/Pyroxene.png" class="side-image" />
						<div class="number-box">x120</div>
					</div>
				</label>

				<label class="check-inputs">
					<input type="checkbox" id="maintenance" />
					Maintenance Compensation
					<div class="image-container">
						<img src="@/assets/Pyroxene.png" class="side-image" />
						<div class="number-box">x840</div>
					</div>
				</label>

				<label class="check-inputs">
					<input type="checkbox" id="event" />
					Event Rewards
					<img src="@/assets/Event_Point_0.png" class="side-image" />
				</label>

				<label class="check-inputs">
					<input type="checkbox" id="pvp" />
					Tactical Challenge
					<img src="@/assets/Arena_Coin.png" class="side-image" />
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

				<label class="check-inputs">
					<input type="checkbox" id="totalcheck" />
					Total Assault
					<img src="@/assets/Total_War_Coin.png" class="side-image" />
					<img src="@/assets/Rare_Coin.png" class="side-image" />
				</label>

				<select id="total-rank" style="width: 25vh; height: 5vh;">
					<option value="bronze">Bronze</option>
					<option value="silver">Silver</option>
					<option value="gold">Gold</option>
					<option value="platinum">Platinum</option>
				</select>

				<label class="check-inputs">
					<input type="checkbox" id="grand" />
					Grand Assault
					<img src="@/assets/Great_Coin.png" class="side-image" />
					<img src="@/assets/Rare_Great_Coin.png" class="side-image" />
					<img src="@/assets/10x_Gacha_Ticket.png" class="side-image" />
				</label>

				<div class="check-inputs" id="ticketsdiv">
					<input type="checkbox" id="tickets" /> Include x10 Tickets in Pyroxenes
				</div>
			</ul>
		</div>

		<div class="btn-group" id="header-div">
			<div id="select-header">Pack Select</div>
		</div>
		<div class="packs">
			<ul>
				<label class="check-inputs">
					<input type="checkbox" id="bimonthly-pyropack" />
					Bimonthly Pyroxene Pack
					<img src="@/assets/arona-packbi.png" class="side-image" />
				</label>
				<label class="check-inputs">
					<input type="checkbox" id="monthly-pyropack" />
					Monthly Pyroxene Pack
					<img src="@/assets/arona-packmo.png" class="side-image" />
				</label>
			</ul>
		</div>

		<div class="calculator-card">
			<div class="btn-group" id="header-div">
				<div id="select-header" style="font-size: 1.6vh">
					Current Pyroxenes
					<h3 style="font-size: 1.5vh;">(Optional)</h3>
				</div>
			</div>
			<div class="input-group">
				<input type="number" id="current-pyroxenes" min="0" max="1000000" placeholder="e.g. 24000" class="current-input" />
			</div>

			<div class="btn-group">
				<button id="calculate-btn" class="btn" disabled>Calculate</button>
			</div>
		</div>
	</section>
</template>

<script setup>
import Banners from './Banners.vue'
// kept intentionally minimal; behavior is provided by src/assets/script.js
</script>

<!-- styles are now provided by Tailwind; component-specific CSS removed -->