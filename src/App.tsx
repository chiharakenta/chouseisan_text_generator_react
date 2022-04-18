import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { State } from './types/State';
import { Schedule } from './types/Schedule';
import { Time } from './types/Time';

import Title from 'components/Title';
import SelectEventForm from 'components/SelectEventForm';
import ScheduleText from 'components/ScheduleText';
import ScheduleTimeline from 'components/ScheduleTimeline';
class App extends Component {
  state: State = {
    schedules: [],
    show: false,
  };

  componentWillMount = () => {
    const today: Date = new Date();
    const daysToSunday: number = 7 - today.getDay();
    let schedules: Array<Schedule> = [];
    const dayString: Array<string> = ['日', '月', '火', '水', '木', '金', '土'];
    for (let i: number = 0; i <= daysToSunday; i++) {
      const times: Array<Time> = [];
      for (let i: number = 0; i < 24; i++) {
        times.push({
          time: i,
          active: false,
          timestamp: String(today.getTime()) + String(i),
        });
      }
      schedules.push({
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        date: today.getDate(),
        day: dayString[today.getDay()],
        times: times,
      });
      today.setDate(today.getDate() + 1);
    }
    this.setState({
      schedules: schedules,
    });
  };

  componentDidMount = () => {
    this.setQuietTimeSchedule();
  };

  handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.currentTarget.id === 'quietTime') this.setQuietTimeSchedule();
    if (event.currentTarget.id === 'farm') this.setFarmSchedule();
  };

  setQuietTimeSchedule = () => {
    const quietTimeElement: any = document.getElementById('quietTime')!;
    if (!quietTimeElement.checked) quietTimeElement.checked = true;
    const quietTimeSchedules: Array<any> = [
      {
        day: '日',
        times: [14, 15, 16, 17, 18, 19, 20],
      },
    ];
    this.setEventTimeSchedule(quietTimeSchedules);
  };

  setFarmSchedule = () => {
    const farmSchedules: Array<any> = [
      {
        day: '土',
        times: [10, 11, 12, 13, 14, 15, 16, 17],
      },
      {
        day: '日',
        times: [14, 15, 16, 17],
      },
    ];
    this.setEventTimeSchedule(farmSchedules);
  };

  setEventTimeSchedule = (eventTimeSchedules: Array<any>) => {
    this.clearSelect();
    const stateSchedules: Array<Schedule> = this.state.schedules.slice();
    let dateIndex: number;
    eventTimeSchedules.forEach((eventTimeSchedule) => {
      // searchDate
      for (let i: number = 0; i < stateSchedules.length; i++) {
        if (stateSchedules[i].day === eventTimeSchedule.day) {
          dateIndex = i;
        }
      }
      eventTimeSchedule.times.forEach((quietTimeTime: number) => {
        for (
          let i: number = 0;
          i < stateSchedules[dateIndex].times.length;
          i++
        ) {
          if (stateSchedules[dateIndex].times[i].time === quietTimeTime) {
            stateSchedules[dateIndex].times[i].active = true;
          }
        }
      });
    });
    this.setState({
      schedules: stateSchedules,
    });
    this.createScheduleText();
  };

  selectSchedule: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    let schedules = this.state.schedules?.slice();
    for (let i: number = 0; i < schedules?.length; i++) {
      for (let j: number = 0; j < schedules[i].times.length; j++) {
        if (
          schedules[i].times[j].timestamp ===
          event.currentTarget.dataset.timestamp
        ) {
          schedules[i].times[j].active = !schedules[i].times[j].active;
          this.setState({
            schedules: schedules,
          });
          this.createScheduleText();
          return;
        }
      }
    }
  };

  clearSelect = () => {
    const schedules: Array<Schedule> = this.state.schedules.slice();
    for (const i in schedules) {
      for (const j in schedules[i].times) {
        schedules[i].times[j].active = false;
      }
    }
    this.setState({
      schedules: schedules,
    });
  };

  createScheduleText = () => {
    let scheduleText: string = '';
    this.state.schedules.forEach((schedule: Schedule) => {
      schedule.times.forEach((time: Time) => {
        if (time.active) {
          const dateText = `${schedule.month}/${schedule.date}(${schedule.day})`;
          const timeText = `${time.time}:00~${time.time + 1}:00`;
          scheduleText = scheduleText + dateText + ' ' + timeText + '\n';
        }
      });
    });
    const scheduleTextElement: HTMLElement =
      document.getElementById('scheduleText')!;
    scheduleTextElement.textContent = scheduleText;
  };

  handleShow = () => {
    this.setState({
      show: true,
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    return (
      <div className="App">
        <Title />
        <SelectEventForm onChange={this.handleChange.bind(this)} />
        <ScheduleText openModal={this.handleShow} />
        <ScheduleTimeline
          schedules={this.state.schedules}
          show={this.state.show}
          closeModal={this.handleClose.bind(this)}
          selectSchedule={this.selectSchedule.bind(this)}
        />
      </div>
    );
  }
}

export default App;
