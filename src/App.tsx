import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

import { State } from './types/State';
import { Schedule } from './types/Schedule';
import { Time } from './types/Time';
class App extends Component {
  state: State = {
    schedules: [],
  };

  componentDidMount() {
    const today: Date = new Date();
    const daysToSunday: number = 7 - today.getDay();
    let schedules: Array<any> = [];
    const dayString: Array<string> = ['日', '月', '火', '水', '木', '金', '土'];
    for (let i = 0; i <= daysToSunday; i++) {
      const times: Array<any> = [];
      for (let i: number = 0; i < 24; i++) {
        times.push({
          time: i,
          active: false,
          timestamp: today.getTime() + i,
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
  }

  selectSchedule(event: any) {
    let schedules = this.state.schedules?.slice();
    for (let i: number = 0; i < schedules?.length; i++) {
      for (let j: number = 0; j < schedules[i].times.length; j++) {
        if (schedules[i].times[j].timestamp == event.target.dataset.timestamp) {
          schedules[i].times[j].active = !schedules[i].times[j].active;
          this.setState({
            schedules: schedules,
          });
          return;
        }
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div className="d-flex">
          {this.state.schedules?.map((schedule: Schedule) => {
            return (
              <div className="schedule d-flex flex-column px-1 border-start border-end">
                <h5 className="date-text">
                  {schedule.month}/{schedule.date}({schedule.day})
                </h5>
                {schedule.times?.map((time: Time) => (
                  <Button
                    className="mx-1 mb-1"
                    variant="outline-primary"
                    size="sm"
                    active={time.active}
                    data-year={schedule.year}
                    data-month={schedule.month}
                    data-date={schedule.date}
                    data-day={schedule.day}
                    data-timestamp={time.timestamp}
                    onClick={this.selectSchedule.bind(this)}
                  >
                    {time.time}:00
                  </Button>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
