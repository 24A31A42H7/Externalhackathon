// src/data/timetableData.js

const timetableData = {
  "1 YEAR": {
    "CSE-A": {
      Monday: [
        { time: "09:00 - 10:00", subject: "LA&C", faculty: "Mrs V Indira Priyadarshini", room: "S-21" },
        { time: "10:00 - 11:00", subject: "NSS/NCC", faculty: "Mr P Raj Shekhar" },
        { time: "11:00 - 12:00", subject: "BEEE", faculty: "Mr B T S S K Gopal" },
        {time:"12:00-01:00",subject:"Ep",faculty:"Mr N Ramakrishna"},
        {time:"01:00-01:30",subject:"Lunch",faculty:""},
        {time:"01:30-04:00",subject:"EEE LAB",faculty:"Mrs K Dharma Rathnam",room:"LAB"}
      ],
      Tuesday: [
        { time: "09:00 - 10:00", subject: "ITWS LAB", faculty: "Mrs K Sham Sri" },
        { time: "10:00 - 11:00", subject: "IP", faculty: "Trainer I" },
      ]
    },

    "ECE-A": {
      Monday: [
        { time: "09:00 - 11:00", subject: "CHE LAB", faculty: "Mr R Veerababu",room:"S-22" },
        { time: "11:00 - 12:00", subject: "CHE", faculty: "Mr R Veerababu" },
        {time:"12:00-01:00",subject:"CE",faculty:"Ms K Gowthami Sri"},
        {time:"01:00-01:30",subject:"Lunch",faculty:""},
        {time:"01:30-04:00",subject:"Ip",faculty:"Trainer IV",room:"S-25"},
      ]
    }
  }
};

export default timetableData;
