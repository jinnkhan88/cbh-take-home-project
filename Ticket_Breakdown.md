# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### 1. Add the ability to store custom agent id for each agent the facility is working with.

    ### Assumptions: Facility table has a unique ids for facilities and agents have a system wide unique id as well.

    Implementation Details:
    - Create a relationship table `facility_has_agent` which holds the ids of agents along with facility id and custom id for the agent for the particular facility

        id | facility_id | agent_id

    - Existing agents will be assigned a new id a new script will create assign the custom id to existing agents.
    Acceptance Criteria:

    - Each agent should have a unique id based on each facility id they are assigned to.
    - Each new agent will be assigned a unique id as they are added to the facility
    - Existing agents will be assigned a unique id.

    Time: 5 hours.

### 2. Update `getShiftsByFacility` to fetch agent's custom id from `facility_has_agent` table and adds it to the metadata.

    ### Assumptions: `getShiftsByFacility` uses the system wide id for agents to reference them.

    Implementation Details:
     - change `getShiftsByFacility` to fetch agents custom id from `facility_has_agent` table based on the agent internal database id and add it to the metadata based on the facility id provided as the custom id is under the default column of `id` the function should create a new key in metadata object as `agentIdForFacility` and assign the id to it.

    Acceptance Criteria:
    - The metadata object should contain the custom id for agent as key titled `agentIdForFacility` also the internal database id as well.

    Time: 2 hours.

### 3. Update `generateReport` to use custom agent id to generate reports.

    Implementation Details:
    - change `generateReport` to use the new `agentIdForFacility` to generate reports. this function should now use this agentIdForFacility to get Agent details and generate report for them.

    Acceptance Criteria
    - `generateReport` should use and display the internal id `agentIdForFacility` to generate reports

    Time: 2 hours.

## This is not a ticket breakdown but an idea / design implementation detail discussion with other team members.

### Update shifts database table to use `agentIdForFacility` for agents (optional)

As per previous assumption the `getShiftsByFacility` uses the system wide id for agents however if we want to change that we can change shifts table to reference the custom id for agents based on facility id but this ticket would be open for review / discussion with other team members.
