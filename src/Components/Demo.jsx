import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import {
  ViewState,
  GroupingState,
  IntegratedGrouping,
  IntegratedEditing,
  EditingState,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Resources,
  Appointments,
  AppointmentTooltip,
  GroupingPanel,
  WeekView,
  DragDropProvider,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import { indigo } from "@mui/material/colors";
import { useEffect } from "react";

const owners = [
  {
    text: "Andrew Glover",
    id: 1,
    color: indigo,
  },
];

const locations = [{ text: "Room 1", id: 1 }];

const Demo = () => {
  const localSchedule = localStorage.getItem("horario");
  const [data, setData] = useState();
  const [resources, setResources] = useState([
    {
      fieldName: "members",
      title: "Members",
      instances: owners,
      allowMultiple: true,
    },
    {
      fieldName: "roomId",
      title: "Location",
      instances: locations,
    },
  ]);

  const [grouping, setGrouping] = useState([
    {
      resourceName: "roomId",
    },
    {
      resourceName: "members",
    },
  ]);

  useEffect(() => {
    const schedule = localStorage.getItem("horario");
    if (schedule) {
      setData(localStorage.getItem("horario"));
      console.log(schedule);
    } else {
      setData([
        {
          id: 0,
          title: "Watercolor Landscape",
          members: [1, 2],
          roomId: 1,
          startDate: new Date(2017, 4, 28, 9, 30),
          endDate: new Date(2017, 4, 28, 12, 0),
        },
        {
          id: 1,
          title: "Oil Painting for Beginners",
          members: [1],
          roomId: 2,
          startDate: new Date(2017, 4, 28, 12, 30),
          endDate: new Date(2017, 4, 28, 14, 30),
        },
        {
          id: 2,
          title: "Testing",
          members: [1, 2],
          roomId: 1,
          startDate: new Date(2017, 4, 29, 12, 30),
          endDate: new Date(2017, 4, 29, 14, 30),
        },
        {
          id: 3,
          title: "Final exams",
          members: [1, 2],
          roomId: 2,
          startDate: new Date(2017, 4, 29, 9, 30),
          endDate: new Date(2017, 4, 29, 12, 0),
        },
      ]);
    }
  }, []);

  const commitChanges = ({ added, changed, deleted }) => {
    setData((prevData) => {
      let newData = [...prevData];
      if (added) {
        const startingAddedId =
          newData.length > 0 ? newData[newData.length - 1].id + 1 : 0;
        newData = [...newData, { id: startingAddedId, ...added }];
      }
      if (changed) {
        newData = newData.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        newData = newData.filter((appointment) => appointment.id !== deleted);
      }
      localStorage.setItem("horario", data);
      return newData;
    });
    console.log(data);
  };

  return (
    <Paper>
      <Scheduler data={data} height={550}>
        <ViewState defaultCurrentDate="2017-05-28" />
        <EditingState onCommitChanges={commitChanges} />
        <GroupingState
          grouping={grouping}
          groupOrientation={() => "Horizontal"}
        />

        <WeekView
          startDayHour={9}
          endDayHour={17}
          excludedDays={[0, 6]}
          cellDuration={60}
          name="Vertical Orientation"
        />
        {/* <DayView startDayHour={9} endDayHour={15} intervalCount={2} /> */}
        <Appointments />
        <Resources data={resources} mainResourceName="members" />

        <IntegratedGrouping />
        <IntegratedEditing />

        <AppointmentTooltip showOpenButton />
        <AppointmentForm />
        <GroupingPanel />
        <DragDropProvider />
      </Scheduler>
    </Paper>
  );
};
export default Demo;
