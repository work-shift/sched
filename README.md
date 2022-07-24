# sched

damn simple shared calendar for tiny groups.

[![GuardRails badge](https://api.guardrails.io/v2/badges/work-shift/sched.svg?token=94013b89377fc9d3584ea3498ab11692c6ae17cbf4d8ae86b691d03ddc1a91fa&provider=github)](https://dashboard.guardrails.io/gh/work-shift/repos/139436)

## functionality

1. [authentication](docs/AUTH.md) via WebAuthN;
2. authorization via google macaroons;
3. protocol: secure webwockets
4. groups:
   - create a group
   - invite to the group
   - kick out from the group ( requires voting )
5. calendar
   - self-assign a time scope for a specific day
   - self-unassign from a time scope for a specific day
6. restrictions
   - mobile only
   - chrome only
7. payments
   - annual subscription
   - personalized verwendungszwek ( for bank transfer )
   - banking account for payments
