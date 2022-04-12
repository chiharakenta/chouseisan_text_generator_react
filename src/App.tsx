import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

import { State } from './types/State';
import { Schedule } from './types/Schedule';
import { Time } from './types/Time';

import { times } from './constants/times';
class App extends Component {
  state: State = {
    schedules: null,
  };

  componentDidMount() {
    const today: Date = new Date();
    const daysToSunday: number = 7 - today.getDay();
    let schedules: Array<any> = [];
    const dayString: Array<string> = ['日', '月', '火', '水', '木', '金', '土'];
    for (let i = 0; i <= daysToSunday; i++) {
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
                    data-year={schedule.year}
                    data-month={schedule.month}
                    data-date={schedule.date}
                    data-day={schedule.day}
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
