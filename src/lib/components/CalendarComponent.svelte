<script>
	import {createEventDispatcher, onMount} from 'svelte';

	export var headers = [];
	export let days = [];
	export let items = [];
	
	let dispatch = createEventDispatcher();
</script>

<div class="calendar">
	{#each headers as header}
	<span class="day-name">{header}</span>
	{/each}

  {#each days as day}
    <div
      class="day-wrapper"
      style="grid-column: {day.col}; grid-row: {day.row};"
    >
      <div
        class="day {day.enabled ? '' : 'day-disabled'}"
      >
        {day.name}
    </div>

    {#each items.filter(item =>
      item.date.getFullYear() === day.date.getFullYear() &&
      item.date.getMonth() === day.date.getMonth() &&
      item.date.getDate() === day.date.getDate()
    ) as item}
      <a
      href={item.href}
      class="task {item.className}"
      style="align-self: {item.isBottom ? 'end' : 'center'};">
      {item.title}
      </a>
    {/each}
    </div>
  {/each}
		
</div>

<style>
.calendar {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, minmax(120px, 1fr));
  grid-template-rows: 50px;
  grid-auto-rows: minmax(120px, auto);
  overflow-y: auto;
}
.day {
  text-align: right;
  font-size: 14px;
  color: #98a0a6;
  margin-bottom: 6px;
}
.day:nth-of-type(7n + 7) {
  border-right: 0;
}
.day:nth-of-type(n + 1):nth-of-type(-n + 7) {
  grid-row: 1;
}
.day:nth-of-type(n + 8):nth-of-type(-n + 14) {
  grid-row: 2;
}
.day:nth-of-type(n + 15):nth-of-type(-n + 21) {
  grid-row: 3;
}
.day:nth-of-type(n + 22):nth-of-type(-n + 28) {
  grid-row: 4;
}
.day:nth-of-type(n + 29):nth-of-type(-n + 35) {
  grid-row: 5;
}
.day:nth-of-type(n + 36):nth-of-type(-n + 42) {
  grid-row: 6;
}
.day:nth-of-type(7n + 1) {
  grid-column: 1/1;
}
.day:nth-of-type(7n + 2) {
  grid-column: 2/2;
}
.day:nth-of-type(7n + 3) {
  grid-column: 3/3;
}
.day:nth-of-type(7n + 4) {
  grid-column: 4/4;
}
.day:nth-of-type(7n + 5) {
  grid-column: 5/5;
}
.day:nth-of-type(7n + 6) {
  grid-column: 6/6;
}
.day:nth-of-type(7n + 7) {
  grid-column: 7/7;
}
.day-name {
  font-size: 12px;
  text-transform: uppercase;
  color: #e9a1a7;
  text-align: center;
  border-bottom: 1px solid rgba(166, 168, 179, 0.12);
  line-height: 50px;
  font-weight: 500;
}
.day-disabled {
  color: rgba(152, 160, 166, 0.5);
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fdf9ff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
  cursor: not-allowed;
}

.task {
  margin-bottom: 4px;
  padding: 4px 6px;
  font-size: 13px;
  border-left: 3px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
}
.task--warning {
  border-left-color: #fdb44d;
  background: #fef0db;
  color: #fc9b10;
  margin-top: -5px;
}
.task--danger {
  border-left-color: #fa607e;
  grid-column: 2 / span 3;
  grid-row: 3;
  margin-top: 15px;
  background: rgba(253, 197, 208, 0.7);
  color: #f8254e;
}
.task--info {
  border-left-color: #4786ff;
  margin-top: 15px;
  background: rgba(218, 231, 255, 0.7);
  color: #0a5eff;
}
.task--primary {
  background: #4786ff;
  border: 0;
  border-radius: 14px;
  color: #fff;
  box-shadow: 0 10px 14px rgba(71, 134, 255, 0.4);
}
.task-container {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 4px;
  z-index: 2;
  overflow: visible;
}
.day-wrapper {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(166, 168, 179, 0.12);
  padding: 6px;
  overflow: hidden;
  height: 100%;
  box-sizing: border-box;
}
</style>
