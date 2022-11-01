<script>
  import {
    onMount,
  } from 'svelte';
  import {
    Temporal,
  } from '@js-temporal/polyfill';

  const calendar = new Temporal.Calendar('iso8601');
  const zNow = Temporal.Now.zonedDateTimeISO().withCalendar(calendar);
  const currentDate = Temporal.PlainDate.from(zNow);
  const dayNames = Object.freeze(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']);
  /** @type {Array<Temporal.ZonedDateTime>} */
  let dates = [];
  const freeDays = [
    Temporal.Now.zonedDateTimeISO().withCalendar(calendar).add({ days: 2 }),
    Temporal.Now.zonedDateTimeISO().withCalendar(calendar).add({ days: 3 }),
  ];

  const isCurrentDayOfWeek = (/** @type {String} */ day) => currentDate.dayOfWeek - 1 === dayNames.indexOf(day);
  const isCurentDate = (/** @type {Number} */ date) => currentDate.day === date;
  const isFreeDate = (/** @type {Temporal.ZonedDateTime} */ date) => freeDays.some((freeDay) => freeDay.day === date.day && freeDay.month === date.month && freeDay.year === date.year );

  onMount(() => {
    const currentMondayDiff = 1 - currentDate.dayOfWeek;
    let startDate = zNow.add({ days: currentMondayDiff });
    const endDate = startDate.add({ days: 14 });

    while (Temporal.ZonedDateTime.compare(startDate, endDate) === -1) {
      dates.push(startDate);

      startDate = startDate.add({ days: 1 });
    }

    dates = dates;
  });
</script>

<style>
  section {
    grid-area: week-grid;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-template-areas:
      'mon tue wed thu fri sat sun'
    ;
    gap: min(1vh, 1vw);
  }

  .day {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.75rem;
    border: 1px solid var(--theme-none);
    color: var(--theme-light_gray_bright);
  }
  
  .mon {
    grid-area: mon;
  }

  .tue {
    grid-area: tue;
  }

  .wed {
    grid-area: wed;
  }

  .thu {
    grid-area: thu;
  }

  .fri {
    grid-area: fri;
  }

  .sat {
    grid-area: sat;
  }

  .sun {
    grid-area: sun;
  }

  .isCurrentDayOfWeek {
    background-color: var(--theme-blue) !important;
    color: var(--theme-darkest_white) !important;
  }

  .isCurentDate {
    color: var(--theme-darker_white) !important;
  }

  .isFreeDate {
    background-color: var(--theme-green) !important;
    color: var(--theme-darker_white) !important;
  }
</style>

<section>
  {#each dayNames as dayName}
    <div class='{dayName} day' class:isCurrentDayOfWeek={isCurrentDayOfWeek(dayName)}>{dayName}</div>
  {/each}

  {#each dates as d}
    <div class='day' class:isCurentDate={isCurentDate(d.day)} class:isFreeDate={isFreeDate(d)}>{d.day}</div>
  {/each}
</section>